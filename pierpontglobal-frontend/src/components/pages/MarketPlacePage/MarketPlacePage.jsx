import React from 'react';
import axios from 'axios';
import { ActionCableProvider, ActionCableConsumer } from 'react-actioncable-provider';
import ActionCable from 'actioncable';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import { CircularProgress } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import FilterListIcon from '@material-ui/icons/FilterList';
import { IconButton } from '@material-ui/core';
import { connect } from 'react-redux';

import USER_ACTIONS from '../../../modules/user/action';
import MARKET_ACTIONS from '../../../modules/market/actions';
import SETTINGS_ACTIONS from '../../../modules/settings/actions';
import FilterPanel from '../../FilterPanel/FilterPanel';
import SortBar from '../../SortBar/SortBar';
import CarCard from '../../CarCard/CarCard';
import { ApiServer } from '../../../Defaults';
import './styles.css';
import PPGModal from '../../ppg-modal/PPGModal';

const qs = require('query-string');
const SearchBarHeight = 120;

const Wrapper = styled.div`
  width: ${props => props.useNew ? '100vw' : '80vw'};
  height: 100%;
  display: grid;
  grid-template-columns: 280px auto;
  grid-column-gap: 24px;
  grid-template-rows: 80px auto;
  grid-template-areas:
    "sidebar searchbar"
    "sidebar cars";
  margin: ${props => props.useNew ? '' : '0 auto'};
  overflow: hidden;

  @media only screen and (max-width: 1024px) and (min-width: 768px) {
    grid-template-columns: 200px 5fr;
  }

  @media only screen and (max-width: 768px) and (min-width: 0px) {
    grid-template-columns: 165px 5fr;
  }

  @media only screen and (max-width: 480px) {
    margin: 0px;
    width: 100vw;
    grid-template-columns: auto;
    grid-template-rows: 80px 5fr;
    grid-template-areas:
      "searchbar"
      "cars";
  }
`;

const SidePanel = styled.div`
  grid-area: sidebar;
  width: 100%;
  display: flex;
  overflow: auto;
  height: 100%;
  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

const CarSection = styled.div`
  grid-area: cars;
  height: ${`calc(100vh - ${SearchBarHeight + 16}px)`};
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  min-height: ${`calc(100vh - ${SearchBarHeight + 16}px)`};
  max-height: ${`calc(100vh - ${SearchBarHeight + 16}px)`};
  overflow-y: auto;
`;

const CarsWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const SearchBarWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;

  @media only screen and (max-width: 768px) {
    justify-content: space-between;
  }
`;

const SearchBarBox = styled.div`
  width: ${props => props.useNew ? '50%' : '90%'};
  @media only screen and (max-width: 768px) {
    width: 70%;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 24px);
`;

const NotFoundWrapper = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  justify-content: center;
`;

const FilterIcon = styled.div`
  display: none;
  @media only screen and (max-width: 600px) {
    display: flex;
    justify-content: flex-end;
  }
`;

async function requestPrice(vin) {
  await axios.patch(`${ApiServer}/api/v1/car/price-request`, { vin });
}

class MarketPlacePage extends React.Component {
  constructor(props) {
    super(props);

    this.cable = null;

    this.params = qs.parse(window.location.search, { ignoreQueryPrefix: true });

    this.state = {
      cars: [],
      availableArguments: [],
      loaded: false,
      page: 1,
      carsSectionHeight: window.innerHeight,
      size: 0,
      openModalFilter: false,
      showOtherOptionsInModalFilter: false,
      otherFiltersOptions: null,
    };

    this.getCars = this.getCars.bind(this);
    this.handleReceived = this.handleReceived.bind(this);

    this.carsSection = React.createRef();
  }

  componentWillMount = () => {
    this.shouldUseNewDesing();
  }

  componentDidMount() {
    this.props.onRef(this);
    this.getCars();
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  shouldUseNewDesing = () => {
    const { cookies, changeMarketDesign } = this.props;
    const itShould = cookies.get('switch_marketplace', { path: '/' });
    if (!!itShould && itShould === "on") {
      changeMarketDesign('new');
    } else {
      changeMarketDesign('old');
    }
  }

  handleBookmark = (carVin, bookmarked) => {
    const { addSavedCar, removeSavedCar } = this.props;
    if (bookmarked) {
      removeSavedCar(carVin).then(data => {
        this.toggleBookmarkedCar(carVin);
      });
    } else {
      addSavedCar(carVin).then(data => {
        this.toggleBookmarkedCar(carVin);
      });
    }
  }

  toggleBookmarkedCar = (carVin) => {
    this.getCars();
    let cars = [...this.state.cars];
    console.log(cars, carVin);
    cars.forEach(car => {
      if (car.props.car.vin === carVin) {
        car.props.car.bookmarked = !car.props.car.bookmarked
      }
    });
    this.setState({
      cars
    });
  }

  isCarAlreadySaved = (car, bookmarkedCars) => {
    let result = false;
    if (!!bookmarkedCars) {
      bookmarkedCars.forEach(bookmarkedCar => {
        if (car.car_information.vin === bookmarkedCar.vin) {
          result = true;
          return;
        };
      });
    }
    return result;
  }

  async getCars() {
    const { fetch, savedCars, useNewDesign } = this.props;
    const { page, size } = this.state;

    let str = '';

    Object.keys(this.params).forEach((key) => {
      if ((this.params[key] !== '' && this.params[key] !== null) && key !== '') {
        str += `&${key}=${encodeURIComponent(this.params[key])}`;
      }
    });
    str = str.substr(1, str.length);

    const response = await fetch(ApiServer, str, page, 20);

    const carsArray = !!response ? response.cars : [];
    const carsGroup = [];

    for (let i = 0; i < carsArray.length; i += 1) {
      const car = carsArray[i];
      const images = [];
      const imagesObjs = car.car_information.images;

      for (let j = 0; j < imagesObjs.length; j += 1) {
        const url = imagesObjs[j].f1;
        if (url === null) {
          images.push('/not-an-image.jk');
        } else {
          images[imagesObjs[j].f2] = `${url}?width=400&height=400&position=${imagesObjs[j].f2}`;
        }
      }

      // Determine if the cars is already saved for the current user
      const bookmarked = this.isCarAlreadySaved(carsArray[i], savedCars);

      const carObject = {
        wholePrice: car.sale_information.whole_price,
        crUrl: car.car_information.cr_url,
        year: car.car_information.year,
        make: car.car_information.car_maker,
        model: car.car_information.car_model,
        trimLevel: car.car_information.trim,
        odometer: `${car.car_information.odometer} mi`,
        fuelType: car.car_information.car_fuel,
        engine: car.car_information.engine,
        displacement: car.car_information.displacement,
        transmission: car.car_information.transmission ? 'Automatic' : 'Manual',
        interiorColor: car.car_information.color_name_interior,
        exteriorColor: car.car_information.color_name_exterior,
        vin: car.car_information.vin,
        cr: car.car_information.cr,
        bodyStyle: car.car_information.car_body_style ? car.car_information.car_body_style : 'Not available',
        doors: car.car_information.doors ? car.car_information.doors : 'Not available',
        vehicleType: car.car_information.car_type_code ? car.car_information.car_type_code : 'Not available',
        price: car,
        saleDate: Date.parse(car.sale_information.auction_start_date),
        bookmarked: bookmarked,
        images,
        title: () => `${car.year} ${car.make} ${car.model} ${car.trimLevel}`,
      };

      carsGroup.push(
        <CarCard useNewDesign={useNewDesign} handleBookmark={this.handleBookmark} caller={str} position={i} key={carObject.vin} car={carObject} requestFunction={requestPrice} />,
      );
    }

    this.setState((prevState) => ({
      cars: carsGroup,
      page: page + 1,
      availableArguments: !!response ? response.available_arguments : [],
      loaded: true,
      carsSectionHeight: this.carsSection.current.offsetHeight,
      size: !!response ? response.size : 0,
    }), () => {
      if (this.state.size !== size) {
        this.carsSection.current.scrollTop = 0;
      }
    });
  }

  showFilterPanel = () => {
    this.setState({
      openModalFilter: true,
    });
  }

  onCloseModal = () => {
    this.setState({
      openModalFilter: false,
    });
  }

  onFilterChange = (/* params */) => {
    // TODO: Handle on filter change
  }

  seeAllOptions = (options) => {
    this.setState({
      showOtherOptionsInModalFilter: true,
      otherFiltersOptions: options,
    });
  }

  quitOptionsFilters = () => {
    this.setState({
      showOtherOptionsInModalFilter: false,
      otherFiltersOptions: null,
    });
  }

  handleReceived(message) {
    const { cars } = this.state;
    const { useNewDesign } = this.state;
    const response = JSON.parse(message);
    const carElements = [];
    for (let j = 0; j < cars.length; j += 1) {
      const { car } = cars[j].props;
      if (car.vin === response.vin) {
        car.wholePrice = response.mmr;
      }
      carElements.push(<CarCard useNewDesign={useNewDesign} handleBookmark={this.handleBookmark} key={car.vin} car={car} requestFunction={requestPrice} />);
    }
    this.setState({ cars: carElements, loaded: true });
  }

  render() {
    const {
      loaded,
      cars,
      openModalFilter,
      showOtherOptionsInModalFilter,
      otherFiltersOptions,
    } = this.state;
    const { useNewDesign } = this.props;

    this.cable = ActionCable.createConsumer(`${ApiServer}/cable`);

    return (
      <>
        <ActionCableProvider cable={this.cable}>
          <ActionCableConsumer
            channel="PriceQueryChannel"
            onReceived={this.handleReceived}
          />
          <Wrapper useNew={useNewDesign}>
            <SidePanel>
              <MediaQuery minDeviceWidth={600}>
                <FilterPanel
                  getCars={this.getCars}
                  availableArguments={this.state.availableArguments}
                  params={this.params}
                  onSeeAll={this.seeAllOptions}
                />
              </MediaQuery>
            </SidePanel>
            <MainContent useNew={useNewDesign}>
              <SearchBarWrapper>
                <SearchBarBox useNew={useNewDesign}>
                  <SortBar header={this.params.q} />
                </SearchBarBox>
                <FilterIcon>
                  <IconButton color="primary" onClick={this.showFilterPanel}>
                    <FilterListIcon />
                    <span style={{ fontSize: '0.75em' }}>
                      <FormattedMessage id="label.filters" />
                    </span>
                  </IconButton>
                </FilterIcon>
              </SearchBarWrapper>
              <CarSection ref={this.carsSection} useNew={useNewDesign}>
                {
                  loaded ? cars.length <= 0 ? (
                    <NotFoundWrapper>
                      <FormattedMessage id="marketplace.not-found" />
                    </NotFoundWrapper>
                  ) : (
                      <InfiniteScroll
                        dataLength={cars.length}
                        next={this.getCars}
                        hasMore
                        loader={(
                          <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            paddingTop: '10px',
                            height: '80px',
                            alignContent: 'center',
                          }}
                          >
                            <CircularProgress />
                          </div>
                        )}
                        height={`calc(100vh - 16px)px`}
                        endMessage={(
                          <p style={{ textAlign: 'center' }}>
                            <b><FormattedMessage id="marketplace.end-message" /></b>
                          </p>
                        )}
                      >
                        <CarsWrapper useNew={useNewDesign}>
                          {cars}
                        </CarsWrapper>
                      </InfiniteScroll>
                    ) : (
                      <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        paddingTop: '24px',
                        height: '80px',
                        alignContent: 'center',
                        marginTop: '2px',
                      }}
                      >
                        <CircularProgress />
                      </div>
                    )
                }
              </CarSection>
            </MainContent>
            <PPGModal
              setOpen={openModalFilter}
              handleClose={() => this.onCloseModal('openModalFilter')}
              width="80%"
              height="80%"
              setPadding={false}
              onBackAction={(otherFiltersOptions) ? this.quitOptionsFilters : undefined}
            >
              {/* Repeating this component here is not a performance issue. This child component,
                of the PPGModal is only rendered when the modal is open.  */}
              {!showOtherOptionsInModalFilter ? (
                <FilterPanel
                  getCars={this.getCars}
                  availableArguments={this.state.availableArguments}
                  params={this.params}
                  handleFilterChange={this.onFilterChange}
                  onSeeAll={this.seeAllOptions}
                />
              ) : (
                  <div style={{ padding: '16px', height: '100%', overflowX: 'scroll' }}>
                    <input
                      className="border-0"
                      style={{
                        width: '300px',
                        padding: '10px',
                        marginBottom: '20px',
                        borderRadius: '5px',
                        boxShadow: '0rem 0rem 1rem rgba(0, 0, 0, 0.15)',
                      }}
                      placeholder="  Type search term"
                    />
                    {otherFiltersOptions}
                  </div>
                )}
            </PPGModal>
          </Wrapper>
        </ActionCableProvider>
      </>
    );
  }
}

// Redux Config
const mapStateToProps = state => ({
  cars: state.marketReducer.cars,
  savedCars: state.userReducer.savedCars,
  useNewDesign: state.settingsReducer.useNewDesign,
});
const mapDispatchToProps = dispatch => ({
  fetch: (ApiServer, str, page, pageSize) => dispatch(MARKET_ACTIONS.fetchCars(ApiServer, str, page, pageSize)),
  fetchBookmarked: ApiServer => dispatch(MARKET_ACTIONS.fetchBookmarked(ApiServer)),
  add: car => dispatch(MARKET_ACTIONS.addCar(car)),
  remove: vin => dispatch(MARKET_ACTIONS.removeCar(vin)),
  update: car => dispatch(MARKET_ACTIONS.modifyCar(car)),
  addSavedCar: vin => dispatch(USER_ACTIONS.addSavedCar(vin)),
  removeSavedCar: vin => dispatch(USER_ACTIONS.removeSavedCar(vin)),
  changeMarketDesign: toChange => dispatch(SETTINGS_ACTIONS.changeMarketDesign(toChange))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarketPlacePage);
