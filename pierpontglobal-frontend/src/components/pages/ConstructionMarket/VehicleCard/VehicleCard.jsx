import React from 'react';
import styled from 'styled-components';
import numeral from 'numeral';
import CartIconMui from '@material-ui/icons/AddShoppingCart';
import CartRemoveIconMui from '@material-ui/icons/RemoveShoppingCart';
import axios from 'axios';
import { ApiServer } from '../../../../Defaults';
import ApplicationRoutes from '../../../../constants/Routes';

const VehicleWrapper = styled.div`
  width: 23%;
  min-width: 300px; 
  height: auto;
  margin: 12px;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.06);
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 2fr 60px 160px 60px;
  background-color: #fff;
  position: relative;
  transition: all 0.3s;
  cursor: pointer;
  transition: all 0.16;

  &:hover {
    box-shadow: 0px 0px 5px 4px rgba(0,0,0,0.09);
  }

  @media only screen and (max-width: 768px) and (min-width: 480px) {
    grid-template-rows: 2fr 60px 160px;
    grid-template-columns: auto;
    width: 90%;
    margin: 0px 6px;
  }

  @media only screen and (max-width: 480px) {
    grid-template-rows: ${props => props.showDetail === 'closed' ? '2fr 40px 100px 60px' : '2fr 140px 100px 6px'};
    grid-template-columns: auto;
    width: 100%;
    margin: 8px 6px;
  }
`;

const VehicleImage = styled.div`
  width: 100%;
  height: 100%;
  display: inline-block;
  position: relative;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const IconWrapper = styled.div`
  position: absolute;
  top: 6px;
  right: 8px;
`;

const TitleBar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  flex-direction: column;
`;

const VehicleTitle = styled.div`
  & > span {
    font-size: 1.13rem;
    font-weight: 600;
  }
`;

const VehicleLocation = styled.div`
  & > span {
    font-size: 0.8rem;
    font-weight: 400;
    font-style: italic;
  }
`;

const Details = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const DetailGroup = styled.div`
  width: 97%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const GroupLabel = styled.div`
  & > span {
    font-size: 0.78rem;
    font-weight: 400;
  }
`;
const GroupValue = styled.div`
  margin-left: 8px;
  & > span {
    font-size: 0.72rem;
    font-weight: 200;
  }
`;
const VehicleBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #32619a;
`;

const VehiclePrice = styled.div`
  padding: 12px;
  & > span {
    color: white;
    font-size: 1.08rem;
    font-weight: 400;
  }
`;

const BuyButton = styled.button`
  border: none;
  padding: 8px;
  color: white;
  background-color: transparent;
  border-radius: 4px;
  margin: 4px;
  border: solid 1px rgba(255,255,255,0.85);
  transition: all 0.8s;
  &:hover {
    background-color: white;
    color: #32619a;
  }
`;
const CartIcon = styled.div`
  padding: 8px;
  & > svg {
    color: ${props => 'rgba(255,255,255,0.92)'};
    cursor: pointer;
    stroke-width: ${props => props.addedToCart ? '0px' : '2px'};
    -webkit-text-stroke-color: #32619a;
    -webkit-text-stroke-width: ${props => props.addedToCart ? '0px' : '1px'};
  }
`;

class VehicleCard extends React.Component {

  state = {
    addedToCart: !!this.props.vehicle.addedToCart ? true : false
  }

  addToCart = (vehicleId) => {
    // this.props.addtoCart(vehicleId);
    axios.post(`${ApiServer}/api/v2/heavy_vehicles/add?vehicle_id=${vehicleId}`).then(data => {
      const res = data.data;
      this.setState({
        addedToCart: true
      })
    })
  }

  removeFromCart = (vehicleId) => {
    // this.props.removeFromCart(vehicleId);
    axios.post(`${ApiServer}/api/v2/heavy_vehicles/remove?vehicle_id=${vehicleId}`).then(data => {
      const res = data.data;
      this.setState({
        addedToCart: false
      })
    })
  }

  seeDetails = (event) => {
    if (event.target.tagName === 'LI' || event.target.tagName === 'SPAN' || event.target.tagName === 'DIV' || event.target.tagName === 'IMG') {
      this.props.history.push(`${ApplicationRoutes.constructionPage}?vehicleId=${this.props.vehicle.id}`)
    } 
  }
  
  render() {
    const { vehicle } = this.props;
    const {addedToCart } = this.state;
    return(
      <VehicleWrapper showDetail={false} key={vehicle.serial} onClick={this.seeDetails}>
        <VehicleImage>
          <img alt={vehicle.title} src={vehicle.mainImage} />
        </VehicleImage>
        <TitleBar>
          <VehicleTitle>
            { vehicle.title }
          </VehicleTitle>
          <VehicleLocation>
            { vehicle.location }
          </VehicleLocation>
        </TitleBar>
        <Details>
          <DetailGroup>
            <GroupLabel>
              <span>Type: </span>
            </GroupLabel>
            <GroupValue>
              <span>{ vehicle.type }</span>
            </GroupValue>
          </DetailGroup>
          <DetailGroup>
            <GroupLabel>
              <span>Category: </span>
            </GroupLabel>
            <GroupValue>
              <span>{ vehicle.category }</span>
            </GroupValue>
          </DetailGroup>
          <DetailGroup>
            <GroupLabel>
              <span>Manufacturar: </span>
            </GroupLabel>
            <GroupValue>
              <span>{ vehicle.manufacturer }</span>
            </GroupValue>
          </DetailGroup>
          <DetailGroup>
            <GroupLabel>
              <span>Description: </span>
            </GroupLabel>
            <GroupValue>
              <span>{ vehicle.description }</span>
            </GroupValue>
          </DetailGroup>
          <DetailGroup>
            <GroupLabel>
              <span>Serial: </span>
            </GroupLabel>
            <GroupValue>
              <span>{ vehicle.serial }</span>
            </GroupValue>
          </DetailGroup>
        </Details>
        <VehicleBottom>
          <VehiclePrice>
            <span>{ `US$ ${numeral(vehicle.price).format("0,0")}` }</span>
          </VehiclePrice>
          {
            addedToCart ? (
              <CartIcon addedToCart={addedToCart} onClick={() => this.removeFromCart(vehicle.id)}>
                <CartRemoveIconMui />
              </CartIcon>
            ) : (
              <CartIcon addedToCart={addedToCart} onClick={() => this.addToCart(vehicle.id)}>
                <CartIconMui />
              </CartIcon>)
          }
          {/* <BuyButton onClick={() => this.props.handleClick(vehicle.id)}>
            See detail
          </BuyButton> */}
        </VehicleBottom>
      </VehicleWrapper>
    );
  }
}

export default VehicleCard;