import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import CloseMuiIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import ApplicationRoutes from '../../../constants/Routes';
import USER_ACTIONS from '../../../modules/user/action';

const CarDisplayWrapper = styled.div`
  width: 100%;
  min-height: 80px;
  max-height: 80px;
  overflow: hidden;
  background-color: white;
  display: grid;
  grid-template-columns: 30% 70%;
  opacity: 0;
  box-shadow: 0px 0px 3px 2px rgb(0, 0, 0, 0.05);
  animation: 0.55s slide-in ease-in-out ${props => props.delay ? props.delay : '0s'};
  animation-fill-mode: forwards;
  margin-bottom: 16px;
  cursor: pointer;
  
  @keyframes slide-in {
    0% {
      opacity: 0;
      transform: translateX(80px);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }
`;

const CarImage = styled.div`
  width: 100%;
  height: 100%;
  & > img {
    width: 100%;
    height: 80px;
    background-position: cover;
  }
`;

const CarInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CarTitle = styled.div`
  width: 100%;
  text-align: left;
  padding-left: 8px;
  & > span {
    font-weight: 600;
    color: #303030;
    & > span {
      font-weight: 200;
    }
  }
`;

const CloseIcon = styled(CloseMuiIcon)`
  color: #303030;
`;

const CloseIconWrapper = styled.div`
  position: absolute;
  right: 2px;
  top: 2px;
  cursor: pointer;
  z-index: 100;
`;

class CarDisplay extends Component {

  goToCarDetail = (node, vin) => {
    if (node.target.tagName !== 'path' && node.target.tagName !== 'svg') {
      this.props.handleClose();
      this.props.history.push(`${ApplicationRoutes.carPage}?vin=${vin}`);
    }
  }

  removeSavedCar = (carVin) => {
    const { removeSavedCar } = this.props;
    removeSavedCar(carVin).then(data => {
      this.props.updateCarList(carVin);
    });
  }

  render() {
    const { delay, car, } = this.props;
    return (
      <CarDisplayWrapper delay={delay} onClick={(node) => this.goToCarDetail(node, car.vin)}>
        <CarImage>
          <img src={car.photo} alt={`Pierpont global | ${car.car_model} ${car.car_maker} ${car.year} ${car.engine}`} />
        </CarImage>
        <CarInfo>
          <CloseIconWrapper id="close-button" onClick={() => this.removeSavedCar(car.vin)}>
            <CloseIcon />
          </CloseIconWrapper>
          <CarTitle>
            <span>{car.car_maker} - <span>{car.car_model}</span></span>
          </CarTitle>
          <div style={{ paddingLeft: '8px' }}>
            <div>
              <span style={{ color: '#303030' }}>{car.year} | {car.engine}</span>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#000000' }}><b>VIN: </b>{car.vin}</span>
            </div>
          </div>
        </CarInfo>
      </CarDisplayWrapper>
    );
  }
}


// Redux configuration
const mapDispatchToProps = dispatch => ({
  removeSavedCar: (vin) => dispatch(USER_ACTIONS.removeSavedCar(vin)),
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter(CarDisplay));

