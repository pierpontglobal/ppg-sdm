import React from 'react';
import styled from 'styled-components';
import { AppNavHeight } from '../../../constants/ApplicationSettings';
import { CircularProgress, Button } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import ConstructionFilter from './ConstructionFilter/ConstructionFilter';
import VehicleCard from './VehicleCard/VehicleCard';
import { withRouter } from 'react-router-dom';
import ConstructionMarketDetail from './ConstructionMarketDetail/ConstructionMarketDetail';
import ApplicationRoutes from '../../../constants/Routes';
import axios from 'axios';
import { ApiServer } from '../../../Defaults';
import numeral from 'numeral';

const Wrapper = styled.div`
  width: 100%;
  height: ${props => `calc(100vh - ${AppNavHeight}px)`};
  display: grid;
  grid-template-rows: 80px auto;
  grid-template-columns: 300px auto;
  grid-template-areas:
  "sidebar mainTitle"
  "sidebar main";
  margin-top: 24px;

  @media only screen and (max-width: 480px) {
    grid-template-columns: auto;
    grid-auto-rows: 1fr auto;
    grid-template-areas:
    "searchMobile"
    "main";
  }
`;

const SearchBarMobile = styled.div`
  grid-area: searchMobile;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (min-width: 481px) {
    display: none;
  }
`;

const Sidebar = styled.div`
  grid-area: sidebar;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;
  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

const MainContent = styled.div`
  grid-area: main;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: auto;
`;

const MainTitle = styled.div`
  grid-area: mainTitle;
  width: 100%;
  height: 100%;
  padding: 16px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 12px;
  & h1 {
    font-size: 1.72rem;
    font-weight: 400;
  }
  & > span { 
    font-size: 0.85rem;
    font-weight: 200;
    padding: 12px;
  }
`;

const VehiclesWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  overflow: auto;
  max-height: 100%;

`;

const FilterList = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  padding-right: 16px;
`;

const SidebarTitle = styled.div`
  padding: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    font-size: 1.24rem;
    font-weight: 600;
  }
`;

const SearchBtn = styled.div`
  padding: 8px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding: 8px;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class ConstructionMarket extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      pageSize: 25,
      page: 0,
      totalVehicles: 0,
      vehicles: [],
      searchText: "",
      userCanSeePage: true,
      types: [],
      total_types: 0,
      type_page: 1,
      categories: [],
      total_categories: 0,
      category_page: 1,
    }
  }

  componentWillMount = async () => {
    this.shouldRenderDetail(window.location.search);
    this.setState({
      isLoading: true
    }, () => {
      this.getVehicles();
    })
  }

  componentWillReceiveProps = (newProps) => {
    this.shouldRenderDetail(newProps.location.search);
  }

  componentDidMount = () => {
    this.props.onRef(this)
    this.getOptions();
  }

  getOptions = () => {
    axios.get(`${ApiServer}/api/v2/heavy_vehicles/types?page=${this.state.type_page}&limit=20`).then(data => {
      const res = data.data;
      this.setState({
        types: res.requested_types,
        total_types: res.total_types
      })
    })
  }

  fetchMoreTypes = () => {
    const page = this.state.type_page + 1;
    axios.get(`${ApiServer}/api/v2/heavy_vehicles/types?page=${page}&limit=20`).then(data => {
      const res = data.data;
      this.setState({
        types: res.requested_types,
        total_types: res.total_types,
        type_page: page
      })
    })
  }

  hasRole = (role) => {
    const userRole = this.getRole(role);
    this.setState({
      userCanSeePage: !!userRole ? true : false
    })
  }

  getRole = (role) => {
    const { user } = this.props;
    return user.roles.find(x => x.toLowerCase() === role.toLowerCase());
  }

  shouldRenderDetail = (search) => {
    const urlParams = new URLSearchParams(search);
    this.vehicleId = urlParams.get('vehicleId');
  }

  searchVehicles = (search) => {
    const { pageSize, searchText, type, category } = this.state;
    const page = 1;
    
    const type_id = (!!type) ? type : -1;
    const category_id = !!category ? category : -1;

    axios.get(`${ApiServer}/api/v2/heavy_vehicles?page=${page}&page_size=${pageSize}&search_text=${searchText}&type_id=${type_id}&category_id=${category_id}`)
    .then(data => {
      const res = data.data;
      const toAppend = res.vehicles.map(v => {
        return {
          title: v.title,
          serial: v.serial,
          location: v.location,
          type: this.cutStringTo(v.type.name, 16),
          category: this.cutStringTo(v.category.name, 16),
          manufacturer: v.manufacturer.name,
          description: this.cutStringTo(v.description, 16),
          equipmentId: v.equipment_id,
          mainImage: v.main_image,
          price: v.price,
          id: v.id,
          addedToCart: v.added_to_cart,
        }
      })
      this.setState({
        vehicles: [...toAppend],
        totalVehicles: res.total_vehicles,
        page: 1,
      })
    })
  }

  getVehicles = () => {
    const { pageSize, searchText, type, category} = this.state;
    const page = this.state.page + 1;
    
    const type_id = (!!type) ? type : -1;
    const category_id = !!category ? category : -1;

    axios.get(`${ApiServer}/api/v2/heavy_vehicles?page=${page}&page_size=${pageSize}&search_text=${searchText}&type_id=${type_id}&category_id=${category_id}`)
    .then(data => {
      const res = data.data;
      const toAppend = res.vehicles.map(v => {
        return {
          title: v.title,
          serial: v.serial,
          location: v.location,
          type: this.cutStringTo(v.type.name, 16),
          category: this.cutStringTo(v.category.name, 16),
          manufacturer: v.manufacturer.name,
          description: this.cutStringTo(v.description, 16),
          equipmentId: v.equipment_id,
          mainImage: v.main_image,
          price: v.price,
          id: v.id,
          addedToCart: v.added_to_cart,
        }
      })
      this.setState({
        vehicles: [...this.state.vehicles, ...toAppend],
        totalVehicles: res.total_vehicles,
        isLoading: false,
        page
      })
    })
  }

  handleFilterChange = (change) => {
    let filterId = change.id;
    if (!!change.id.name) filterId = change.id.name;
    this.setState({
      [filterId]: change.value
    }, () => {
      console.log(this.state);
    })
  }

  handleTypeChange = (change) => {
    let filterId = change.id;
    let filterValue = change.value;
    if (!!change.id.name) filterId = change.id.name;
    this.setState({
      [filterId]: change.value
    }, () => {
      this.fetchCategories(filterValue)
    })
  }

  fetchCategories = (filterId) => {
    axios.get(`${ApiServer}/api/v2/heavy_vehicles/categories?filter_id=${parseInt(filterId)}`).then(data => {
      const res = data.data;
      this.setState({
        categories: res.requested_categories || [],
        total_categories: res.total_categories
      })
    })
  }

  handleClick = (vehicleId) => {
    this.props.history.push(`${ApplicationRoutes.constructionPage}?vehicleId=${vehicleId}`);
  }
  
  search = (e) => {
    if (!!e.key && e.key === 'Enter') {
      const { searchText } = this.state;
      if (!!searchText) {
        this.setState({
          vehicles: [],
          page: 0
        }, () => {
          this.getVehicles();
        })
      }
    }
  }

  updateVehicle = (vehicle) => {
    let vehicles = [...this.state.vehicles];
    vehicles.forEach(v => {
      if (v.id === vehicle.id) {
        v.addedToCart = vehicle.addedToCart;
        // Add other attributes edited from detail to reflect changes in market here....
      }
    })
    this.setState({
      vehicles
    })
  }

  willGoBack = (data) => {
    let vehicle = data.vehicle;
    this.updateVehicle(vehicle);
  }

  applyFilters = () => {
    this.searchVehicles();
  }

  clearFilters = () => {
    this.setState({
      type: -1,
      category: -1,
      searchText: '',
      page: 1,
    }, () => {
      if (!!this.typeFilterRef) {
        this.typeFilterRef.clean();
      }
      if (!!this.categoryFilterRef) {
        this.categoryFilterRef.clean();
      }
      if (!!this.textFilterRef) {
        this.textFilterRef.clean();
      }
      this.searchVehicles();
    })
  }

  cutStringTo = (value, length) => {
    return value.substring(0, length);
  }

  viewCart = () => {
    this.props.history.push(ApplicationRoutes.constructionCartPage);
  }

  render() {
    const { vehicles, isLoading, totalVehicles, userCanSeePage, types, total_types, categories, total_categories } = this.state;
    if (!userCanSeePage) {
      this.props.history.push(ApplicationRoutes.marketplace);
    }
    if (!!this.vehicleId) {
      return (
        <ConstructionMarketDetail willGoBack={this.willGoBack} updateVehicle={this.updateVehicle} getUser={this.props.getUser} user={this.props.user} history={this.props.history} vehicleId={this.vehicleId} />
      );
    }
    return(
      <Wrapper>
        <Sidebar>
          <SidebarTitle>
            <span>Filters</span>
          </SidebarTitle>
          <FilterList>
            <ConstructionFilter onRef={ref => (this.textFilterRef = ref)} name="searchText" displayName="Search" type="input" handleChange={this.handleFilterChange} />
            <ConstructionFilter onRef={ref => (this.typeFilterRef = ref)} name="type" displayName="Type" type="select" options={types.map(t => ({name: this.cutStringTo(t.name, 24), value: t.id}))} handleChange={this.handleTypeChange} />
            <ConstructionFilter onRef={ref => (this.categoryFilterRef = ref)} name="category" displayName="Category" type="select" options={categories.map(c => ({name: this.cutStringTo(c.name, 24), value: c.id}))} handleChange={this.handleFilterChange} />
          </FilterList>
          <SearchBtn>
            <Button color="primary"  onClick={() => this.clearFilters()}>Clear</Button>
            <Button color="secondary" variant="contained" onClick={() => this.applyFilters()}>Apply</Button>
          </SearchBtn>
        </Sidebar>
        <SearchBarMobile>
          Search mobile...
        </SearchBarMobile>
        <MainTitle>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h1 style={{ marginBottom: '0px' }}>Construction vehicles</h1>
              <span>{ numeral(totalVehicles).format("0,0") } vehicles found</span>
            </div>
            <div style={{ marginLeft: '64px' }}>
              <Button onClick={this.viewCart}>View cart</Button>
            </div>
          </div>
        </MainTitle>
        <MainContent ref={(ref) => this.scrollParentRef = ref}>
            {
              isLoading ? <LoadingWrapper><CircularProgress /></LoadingWrapper> : (
                <InfiniteScroll
                  style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}
                  pageStart={0}
                  loadMore={this.getVehicles}
                  hasMore={totalVehicles > vehicles.length}
                  useWindow={false}
                  getScrollParent={() => this.scrollParentRef}
                  threshold={100}
                  loader={
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
                  }
                >
                    {
                      vehicles.map(vehicle => (
                        <VehicleCard history={this.props.history} handleClick={this.handleClick} vehicle={vehicle} />
                      ))
                    }
                </InfiniteScroll>
              )
            }
        </MainContent>
      </Wrapper>
    );
  }
}

export default withRouter(withRouter(ConstructionMarket));