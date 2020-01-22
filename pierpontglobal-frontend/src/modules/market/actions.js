import ActionTypes from './actionTypes';
import axios from 'axios';

const addCar = car => ({
  type: ActionTypes.ADD_CAR,
  payload: car
});

const modifyCar = car => ({
  type: ActionTypes.MODIFY_CAR,
  payload: car
});

const removeCar = vin => ({
  type: ActionTypes.REMOVE_CAR,
  payload: vin
});

const fetchBookmarked = (ApiServer) => {
  return function(dispatch) {
    dispatch({
      type: ActionTypes.BOOKMARKED_REQUESTED,
    });

    return axios.get(`${ApiServer}/api/v1/user/saved_cars`)
      .then(
        data => {
          dispatch({
            type: ActionTypes.BOOKMARKED_RECEIVED,
            payload: data.data.cars
          });
          return data.data;
        },
        error => console.log(error.response)
      )
  }
}

const fetchCars = (ApiServer, str, page, pageSize) => {

  return function(dispatch) {
    dispatch({
      type: ActionTypes.CARS_REQUESTED,
      payload: {}
    });
    
    return axios.get(`${ApiServer}/api/v1/car/query?${str}&limit=${page * pageSize}&offset=0`)
      .then(
        data => {
          dispatch({
            type: ActionTypes.CARS_RECEIVED,
            payload: data.data.cars
          });
          return data.data;
        },
        error => console.log(error.response)
      )
  }
};

export default {
  addCar,
  modifyCar,
  removeCar,
  fetchCars,
  fetchBookmarked,
};