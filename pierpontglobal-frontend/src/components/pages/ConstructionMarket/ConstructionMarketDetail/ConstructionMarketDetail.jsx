import React from 'react';
import styled from 'styled-components';
import { AppNavHeight } from '../../../../constants/ApplicationSettings';
import { CircularProgress, Button, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import BackIconMui from '@material-ui/icons/KeyboardArrowLeft';
import ImageGallery from 'react-image-gallery';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LocationIconMui from '@material-ui/icons/LocationOn';
import TagIconMui from '@material-ui/icons/MergeType';
import PrintIconMui from '@material-ui/icons/Print';
import EmailIconMui from '@material-ui/icons/Email';
import numeral from 'numeral';
import CheckIconMui from '@material-ui/icons/CheckCircleOutline';
import axios from 'axios';
import { ApiServer } from '../../../../Defaults';
import CartIconMui from '@material-ui/icons/AddShoppingCart';
import CartRemoveIconMui from '@material-ui/icons/RemoveShoppingCart';
import { withRouter } from 'react-router-dom';
import ApplicationRoutes from '../../../../constants/Routes';
import ReactToPrint from 'react-to-print';
import "./ConstructionMarketDetail.css";

const PageWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 85%;
  display: grid;
  margin-top: 36px;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 125px 60px auto;
  position: relative;
  grid-template-areas: 
    "sidebar header"
    "sidebar location"
    "sidebar carousel";
  grid-column-gap: 32px;
`;

const Sidebar = styled.div`
  grid-area: sidebar;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SidebarSection = styled.div`
  width: 100%;
  padding: 8px;
  background-color: rgb(250, 250, 250);
  box-shadow: rgba(0, 0, 0, 0.18) 0px 1px 2px 0px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const Carousel = styled.div`
  grid-area: carousel;
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow: scroll;
`;

const Header = styled.div`
  grid-area: header;
  width: 100%;
  height: 100%;
  background-color: rgb(62, 120, 192);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LocationBar = styled.div`
  grid-area: location;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;



/// ---------



const VehicleDetailBox = styled.div`
  grid-area: details;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 42px;
`;

const InfoSidebar = styled.div`
  grid-area: sidebar;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  border-radius: 5px;
  border: 1px solid #dde0e2;
  padding: 16px;
  margin-top: 42px;
`;

const RelatedVehicles = styled.div`
  grid-area: related;
  width: 100%;
  height: 100%;
  display: flex;
  max-width: 100%;
  overflow: auto;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: ${props => `calc(100vh - ${AppNavHeight}px)`};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  width: 100%;
  padding: 16px;
  & > span {
    font-size: 1.32rem;
    font-weight: 600;
  }
`;

const Location = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const LocationIcon = styled.div`
  & > svg {
    color: #32619a;
  }
`;
const LocationText = styled.div`
  & > span {
    font-weight: 200;
    font-size: 1.08rem;
  }
`;

const Price = styled.div`
  width: 100%;
  padding: 12px;
  & > span {
    font-size: 1.18rem;
    font-weight: 200;
  }
`;

const Tags = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px;
`;
const Tag = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const TagIcon = styled.div`
  & > svg {
    color: #32619a;
  }
`;
const TagText = styled.div`
  & > span {
    font-weight: 200;
    font-size: 1.08rem;
  }
`;

const ActionIcons = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 12px;
`;
const ActionIcon = styled.div`
  padding: 0px 8px;
  & > svg {
    color: ${props => props.primary ? '#32619' : 'rgb(0, 0, 0, 0.7)'};
    cursor: pointer;
  }
`;

const DetailTabs = styled.div`
  width: 100%;

`;

const TabContainer = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const SidebarTitle = styled.div`
  width: 100%;
  padding: 24px;
  text-align: center;
  & > span {
    font-weight: 600;
    font-size: 1.16rem;
  }
`;
const ClientInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ClientName = styled.div`
  width: 100%;
  padding: 16px;
  text-align: center;
  & > span {
    font-size: 1.12rem;
    font-weight: 200;
  }
`;
const RequestWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const RequestBtn = styled.button`
  padding: 16px;
  background: white;
  border-radius: 8px;
  border-radius: 4px;
  font-size: 1.09rem;
  color: rgb(62,120,192);
  cursor: pointer;
`;
const CheckIcon = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 18px;
  & > svg {
    color: #20c967;
  }
`;
const ClientPhone = styled.div`
  padding: 8px;
  width: 100%;
  text-align: center;
  & > span {
    color: darkblue;
  }
`;
const ClientEmail = styled.div`
  padding: 8px;
  width: 100%;
  text-align: center;
  & > span {
    color: darkblue;
  }
`;

const TabContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const TabcontentLabel = styled.div`
  margin-right: 8px;
  padding: 4px;
  & > span {
    font-weight: 600;
  }
`;

const BackWrapper = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: flex-start;
`;
const BackIcon = styled.div`
  & > svg {
    color: rgb(0, 0, 0, 0.6);
    transition: all 0.2s;
    cursor: pointer;
    font-size: 2.12rem;
  }
  & > svg:hover {
    color: rgb(0, 0, 0, 0.9);
  }
`;
const QuantityWrapper = styled.div`
  width: 100%;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CartIcon = styled.div`
  & > svg {
    color: white;
    cursor: pointer;
  }
`;
const SpecList = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
`;
const Spec = styled.div`
  width: 100%;
  padding: 4px;
  display: flex;
  justify-content: flex-start;
`;

class ConstructionMarketDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle: undefined,
      detailTabValue: 0,
      requestingVehicle: false,
      requested: false,
      requestSuccess: false,
      quantity: 1,
      client: {
        ...this.props.user,
        company: '',
        comments: '',
      },
    }
    this.clientDefined = false;
  }

  componentWillMount = async () => {
    // Get vehicle
    const { vehicleId } = this.props;
    axios.get(`${ApiServer}/api/v2/heavy_vehicles/single?vehicle_id=${vehicleId}`).then(data => {
      const v = data.data.vehicle;
      this.setState({
        vehicle: {
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
          class_code: v.class_code,
          images: v.images
        },
        requested: !!v.requested ? true : false,
        requestSuccess: !!v.requested ? true : false,
      })
    })
  }

  cutStringTo = (value, length) => {
    return value.substring(0, length);
  }

  componentWillUnmount = () => {
    this.setState({
      vehicle: undefined,
    })
  }

  handleChange = (e) => {
    this.setState({
      client: {
        ...this.state.client,
        [e.target.id]: e.target.value
      }
    })
  }

  handleQuantityChange = (e) => {
    this.setState({
      quantity: e.target.value
    })
  }

  sendForm = () => {
    console.log('Vehicle request >>>>>', this.state);
  }

  defineClient = () => {
    this.clientDefined = true;
    const { user } = this.props;
    this.setState({
      client: {
        ...user
      }
    })
  }

  goBack = () => {
    this.props.willGoBack({vehicle: this.state.vehicle});
    this.props.history.goBack();
  }

  handleTabsChange = (e, newValue) => {
    this.setState({
      detailTabValue: newValue
    })
  }

  requestVehicle = () => {
    this.setState({
      requestingVehicle: true,
    }, () => {
      const { vehicle, quantity } = this.state;
      axios.post(`${ApiServer}/api/v2/heavy_vehicles/request?vehicle_id=${vehicle.id}&quantity=${quantity}`)
      .then(data => {
        const res = data.data;
        this.setState({
          requestingVehicle: false,
          requestSuccess: true,
          requested: true
        })
      });
    })
  }

  addToCart = (vehicleId) => {
    axios.post(`${ApiServer}/api/v2/heavy_vehicles/add?vehicle_id=${vehicleId}`).then(data => {
      const res = data.data;
      this.setState({
        vehicle: {
          ...this.state.vehicle,
          addedToCart: true
        }
      }, () => {
        this.props.updateVehicle(this.state.vehicle)
      })
    })
  }

  removeFromCart = (vehicleId) => {
    axios.post(`${ApiServer}/api/v2/heavy_vehicles/remove?vehicle_id=${vehicleId}`).then(data => {
      const res = data.data;
      this.setState({
        vehicle: {
          ...this.state.vehicle,
          addedToCart: false
        }
      }, () => {
        this.props.updateVehicle(this.state.vehicle)
      })
    })
  }

  sendEmail = () => {
    const { vehicle } = this.state;
    const emailTo = "support@pierpontglobal.com";
    const ceo = "steve@pierpontglobal.com";
    const cto = "hector@pierpontglobal.com";
    const emailSub = "Heavy vehicle request";
    const emailBody = `Hi, I would like to request vehicle: ${vehicle.title}, from: ${vehicle.location} with id: ${vehicle.id} and serial: ${vehicle.serial}`;
    window.location.href = "mailto:"+emailTo+'?cc='+ceo+';'+cto+'&subject='+emailSub+'&body='+emailBody;
  }

  render() {
    const { vehicle, client, detailTabValue, requestingVehicle, requestSuccess, requested, quantity} = this.state;
    const { user } = this.props;
    if (!!user.email && !this.clientDefined) {
      this.defineClient();
    }
    let images = [
      {
        original: !!vehicle ? vehicle.mainImage : '',
        thumbnail: !!vehicle ? vehicle.mainImage : '',
      }
    ]
    if (!!vehicle && !!vehicle.images && vehicle.images.length > 0) {
      let other_images = vehicle.images.map(imgObj => imgObj.image)
      other_images.forEach(img => {
        images.push({
          original: img,
          thumbnail: img,
        })
      })
    }

    return(
      <PageWrapper>
        {
          vehicle === undefined ? <LoadingWrapper><CircularProgress /></LoadingWrapper> : (
            <Wrapper ref={el => (this.componentRef = el)}>
              <Sidebar>
                <SidebarSection style={{ marginBottom: '12px' }}>
                  <Title>
                    <span>
                      { vehicle.title }
                    </span>
                  </Title>
                  <div style={{ marginTop: '16px', padding: '8px', display: 'flex' }}>
                    <span style={{ fontWeight: '600', marginRight: '8px' }}>Type</span>
                    <span>{ vehicle.type }</span>
                  </div>
                  <div style={{ marginTop: '16px', padding: '8px', display: 'flex' }}>
                    <span style={{ fontWeight: '600', marginRight: '8px' }}>Category</span>
                    <span>{ vehicle.category }</span>
                  </div>
                </SidebarSection>
                <SidebarSection>
                  <Title>
                    <span>
                      Specifications
                    </span>
                  </Title>
                  <SpecList>
                    <Spec>
                      <div>
                        <span style={{ fontWeight: '600', marginRight: '8px' }}>
                          Equipment id
                        </span>
                      </div>
                      <div>
                        { vehicle.equipmentId }
                      </div>
                    </Spec>
                    <Spec>
                      <div>
                        <span style={{ fontWeight: '600', marginRight: '8px' }}>
                          Manufacturer
                        </span>
                      </div>
                      <div>
                        { vehicle.manufacturer }
                      </div>
                    </Spec>
                    <Spec>
                      <div>
                        <span style={{ fontWeight: '600', marginRight: '8px' }}>
                          Equipment id
                        </span>
                      </div>
                      <div>
                        { vehicle.equipmentId }
                      </div>
                    </Spec>
                    <Spec>
                      <div>
                        <span style={{ fontWeight: '600', marginRight: '8px' }}>
                          Class code
                        </span>
                      </div>
                      <div>
                        { vehicle.class_code }
                      </div>
                    </Spec>
                  </SpecList>
                </SidebarSection>
              </Sidebar>
              <Header>
                <div>
                  <Price style={{ marginLeft: '16px' }}>
                    <span style={{ color: 'white', fontSize: '1.12rem' }}>Whole price</span><br />
                    <span style={{ color: 'white', fontSize: '1.32rem', fontWeight: '600' }}>{ `RD$ ${numeral(vehicle.price).format("0,00")}` }</span>
                  </Price>
                </div>
                <div style={{ padding: '16px' }}>
                {
                  !!client ? (
                    <ClientInfo>
                      {/* <ClientName>
                        <span>
                          { client.name }
                        </span>
                      </ClientName> */}
                      {/* {
                        !requested ? (
                          <QuantityWrapper>
                            <TextField
                              id="quantity"
                              label="Quantity"
                              fullWidth
                              defaultValue={quantity}
                              onChange={this.handleQuantityChange}
                              margin="normal"
                              type="number"
                              variant="filled"
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </QuantityWrapper>
                        ) : null
                      } */}
                      <RequestWrapper>
                        {
                          requestingVehicle ? <CircularProgress /> : requested ? (
                            requestSuccess ? <CheckIcon><CheckIconMui /> <span style={{ color: 'white' }}>Vehicle requested</span></CheckIcon> : <span style={{ color: 'white' }}>Failere in requesitng...</span>
                          ) : ( <RequestBtn onClick={() => this.requestVehicle()}>
                                Request vehicle
                              </RequestBtn>)
                        }
                      </RequestWrapper>
                     
                      {/* <ClientPhone>
                        { client.phone }
                      </ClientPhone>
                      <ClientEmail>
                        { client.email }
                      </ClientEmail> */}
                    </ClientInfo>
                  ) :  null
                }
                </div>
              </Header>
              <LocationBar>
                <div>
                  <Location>
                    <LocationIcon>
                      <LocationIconMui />
                    </LocationIcon>
                    <LocationText>
                      <span>
                        { vehicle.location }
                      </span>
                    </LocationText>
                  </Location>
                </div>
                <div>
                  <ActionIcons>
                    <ActionIcon onClick={this.sendEmail}>
                      <EmailIconMui />
                    </ActionIcon>
                    <ReactToPrint
                      trigger={() => (
                        <ActionIcon>
                          <PrintIconMui />
                        </ActionIcon>
                      )}
                      content={() => this.componentRef}
                    />
                    {
                      vehicle.addedToCart ? (
                        <ActionIcon primary onClick={() => this.removeFromCart(vehicle.id)}>
                          <CartRemoveIconMui />
                        </ActionIcon>
                      ) : (
                        <ActionIcon primary onClick={() => this.addToCart(vehicle.id)}>
                          <CartIconMui />
                        </ActionIcon>
                      )
                    }
                  </ActionIcons>
                </div>
              </LocationBar>
              <Carousel>
                {/* <BackWrapper>
                  <BackIcon onClick={() => this.goBack()}>
                    <BackIconMui /> Go back
                  </BackIcon>
                </BackWrapper> */}
                <ImageGallery items={images} showPlayButton={false} />
              </Carousel>
            </Wrapper>
            // <Wrapper ref={el => (this.componentRef = el)}>
              // <CarouselBox>
              //   <BackWrapper>
              //     <BackIcon onClick={() => this.goBack()}>
              //       <BackIconMui /> Go back
              //     </BackIcon>
              //   </BackWrapper>
              //   <ImageGallery items={images} />
              // </CarouselBox>
            //   <VehicleDetailBox>
            //     <Title>
            //       <span>
            //         { vehicle.title }
            //       </span>
            //     </Title>
            //     <Location>
            //       <LocationIcon>
            //         <LocationIconMui />
            //       </LocationIcon>
            //       <LocationText>
            //         <span>
            //           { vehicle.location }
            //         </span>
            //       </LocationText>
            //     </Location>
            //     <Price>
            //       <span>
            //         { `US$ ${numeral(vehicle.price).format("0,0")}` }
            //       </span>
            //     </Price>
            //     <Tags>
            //       <Tag>
            //         <TagIcon>
            //           <TagIconMui />
            //         </TagIcon>
            //         <TagText>
            //           <span>
            //             Low interest financing
            //           </span>
            //         </TagText>
            //       </Tag>
            //       <Tag>
            //         <TagIcon>
            //           <TagIconMui />
            //         </TagIcon>
            //         <TagText>
            //           <span>
            //             Special dial
            //           </span>
            //         </TagText>
            //       </Tag>
            //     </Tags>
                // <ActionIcons>
                //   <ActionIcon onClick={this.sendEmail}>
                //     <EmailIconMui />
                //   </ActionIcon>
                //   <ReactToPrint
                //     trigger={() => (
                //       <ActionIcon>
                //         <PrintIconMui />
                //       </ActionIcon>
                //     )}
                //     content={() => this.componentRef}
                //   />
                //   {
                //     vehicle.addedToCart ? (
                //       <ActionIcon primary onClick={() => this.removeFromCart(vehicle.id)}>
                //         <CartRemoveIconMui />
                //       </ActionIcon>
                //     ) : (
                //       <ActionIcon primary onClick={() => this.addToCart(vehicle.id)}>
                //         <CartIconMui />
                //       </ActionIcon>
                //     )
                //   }
                // </ActionIcons>
            //     <DetailTabs>
            //       <Tabs
            //         value={detailTabValue}
            //         onChange={this.handleTabsChange}
            //         indicatorColor="primary"
            //         textColor="primary"
            //         centered
            //       >
            //         <Tab id="details" label="Details" />
            //         <Tab id="description" label="Description" />
            //       </Tabs>
            //       { detailTabValue === 0 && <TabContainer>
            //         <TabContent>
            //           <TabcontentLabel>
            //             <span>Serial</span>
            //           </TabcontentLabel>
            //           <div>
            //             <span>
            //               { vehicle.serial }
            //             </span>
            //           </div>
            //         </TabContent>
            //         <TabContent>
            //           <TabcontentLabel>
            //             <span>Equipment id</span>
            //           </TabcontentLabel>
            //           <div>
            //             <span>
            //               { vehicle.equipmentId }
            //             </span>
            //           </div>
            //         </TabContent>
            //         <TabContent>
            //           <TabcontentLabel>
            //             <span>Sub category</span>
            //           </TabcontentLabel>
            //           <div>
            //             <span>
            //               { vehicle.subCategory }
            //             </span>
            //           </div>
            //         </TabContent>
            //       </TabContainer> }
            //       { detailTabValue === 1 && <TabContainer>
            //         <TabContent>
            //           <TabcontentLabel>
            //             <span>Description</span>
            //           </TabcontentLabel>
            //           <div>
            //             <span>
            //               { vehicle.description }
            //             </span>
            //           </div>
            //         </TabContent>
            //         <TabContent>
            //           <TabcontentLabel>
            //             <span>Equipment type</span>
            //           </TabcontentLabel>
            //           <div>
            //             <span>
            //               { vehicle.type }
            //             </span>
            //           </div>
            //         </TabContent>
            //         <TabContent>
            //           <TabcontentLabel>
            //             <span>Category</span>
            //           </TabcontentLabel>
            //           <div>
            //             <span>
            //               { vehicle.category }
            //             </span>
            //           </div>
            //         </TabContent>
            //       </TabContainer> }
            //     </DetailTabs>
            //   </VehicleDetailBox>
            //   <InfoSidebar>
            //     <SidebarTitle>
            //       <span>
            //         Equipment Sales Rep
            //       </span>
            //     </SidebarTitle>
            //     {
            //       !!client ? (
            //         <ClientInfo>
            //           <ClientName>
            //             <span>
            //               { client.name }
            //             </span>
            //           </ClientName>
            //           {
            //             !requested ? (
            //               <QuantityWrapper>
            //                 <TextField
            //                   id="quantity"
            //                   label="Quantity"
            //                   fullWidth
            //                   defaultValue={quantity}
            //                   onChange={this.handleQuantityChange}
            //                   margin="normal"
            //                   type="number"
            //                   variant="filled"
            //                   InputLabelProps={{
            //                     shrink: true,
            //                   }}
            //                 />
            //               </QuantityWrapper>
            //             ) : null
            //           }
            //           <RequestWrapper>
            //             {
            //               requestingVehicle ? <CircularProgress /> : requested ? (
            //                 requestSuccess ? <CheckIcon><CheckIconMui /> Vehicle requested</CheckIcon> : 'failere in requesitng...'
            //               ) : ( <RequestBtn onClick={() => this.requestVehicle()}>
            //                     Request vehicle
            //                   </RequestBtn>)
            //             }
            //           </RequestWrapper>
                     
            //           <ClientPhone>
            //             { client.phone }
            //           </ClientPhone>
            //           <ClientEmail>
            //             { client.email }
            //           </ClientEmail>
            //         </ClientInfo>
            //       ) :  null
            //     }
            //   </InfoSidebar>
            //   <RelatedVehicles>

            //   </RelatedVehicles>
            // </Wrapper>
          )
        }
      </PageWrapper>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user
});
export default connect(mapStateToProps, null)(withRouter(ConstructionMarketDetail));
