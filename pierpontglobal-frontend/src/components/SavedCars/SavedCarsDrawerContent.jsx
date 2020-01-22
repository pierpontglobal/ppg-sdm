import React, { Component } from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import ArrowMuiIcon from '@material-ui/icons/NavigateNext';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from 'react-redux';
import CarDisplay from './CarDisplay/CarDisplay';
import ApplicationRoutes from '../../constants/Routes';

const Wrapper = styled.div`
  max-width: 400px;
  min-width: 400px;
  height: 100%;
  background: rgb(236,236,236);
  background: linear-gradient(346deg, rgba(236,236,236,1) 0%, rgba(255,255,255,1) 100%);
  position: relative;
  z-index: 4000;
  @media only screen and (max-width: 480px) {
    max-width: 100vw;
    min-width: 100vw;
  }
`;

const Title = styled.div`
  margin-top: 24px;
  margin-bottom: 16px;
  text-align: center;
  & > span {
    color: #303030;
    font-size: 1.35rem;
    font-weight: 400;
  }
`;

const HideButton = styled(IconButton)`
  position: absolute;
  top: 0px;
  left: 0px;
`;

const ArrowIcon = styled(ArrowMuiIcon)`
  color: #303030;
`;

const CarList = styled.div`
  width: 100%;
  max-height: calc(100vh - 300px);
  margin-top: 54px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: scroll;
  @media only screen and (max-width: 768px) and (min-width: 500px) {
    max-height: calc(100vh - 220px);
  }
  @media only screen and (max-width: 500px) and (min-width: 300px) {
    max-height: calc(100vh - 120px);
  }
  @media only screen and (max-width: 300px) {
    max-height: calc(100vh - 80px);
  }
`;

const EmptyListMessage = styled.div`
  width: 100%;
  margin-top: 32px;
  text-align: center;
  position: relative;
  & > span {
    color: #303030;
    opacity: 0;
    position: absolute;
    left: -20px;
    font-size: 1.05rem;
    animation: 0.8s appears ease-in-out;
    animation-fill-mode: forwards;
  }

  @keyframes appears {
    0% {
      opacity: 0;
      left: -20px;
    }
    60% {
      left: 20px;
    }
    100% {
      opacity: 1;
      right: 0px;
      left: 0px;
    }
  }
`

class SavedCarsDrawerContent extends Component {
  state = {
    cars: [],
    loading: true,
  }

  componentDidMount = () => {
    this.setState({
      cars: this.props.savedCars,
      loading: false,
    });
  }

  updateCarList = (carVin) => {
    let cars = this.state.cars.filter(x => x.vin !== carVin);
    this.setState({
      cars: cars
    }, () => {
      // Propage removed car to marketplace
      if (window.location.href.includes(ApplicationRoutes.marketplace)) {
        this.props.updateCarsList(carVin);
      }
    });
  }

  render() {
    const { loading } = this.state;
    const { savedCars } = this.props;
    return (
      <>
        <Wrapper>
          <HideButton onClick={this.props.handleClose}>
            <ArrowIcon />
          </HideButton>
          <Title>
            <span>My saved cars</span>
          </Title>
          {
            loading ? <LinearProgress /> : savedCars.length === 0 ? <EmptyListMessage><span>No saved cars yet.</span></EmptyListMessage> : (
              (
                <CarList>
                  {
                    savedCars.map((car, index) => (
                      <CarDisplay car={car} delay={`${index * 0.17}s`} handleClose={this.props.handleClose} updateCarList={this.updateCarList} />
                    ))
                  }
                </CarList>
              ))
          }
        </Wrapper>
      </>
    );
  }
}


// Redux configuration
const maptStateToProps = state => ({
  savedCars: state.userReducer.savedCars || []
});

export default connect(
  maptStateToProps
)(SavedCarsDrawerContent);
