import ACTIONS from './actionTypes';
import _ from 'lodash';
import MarketInitialState from './initialState';

const marketReducer = (state = MarketInitialState, action) => {

  let newState = _.cloneDeep(state);

  switch(action.type) {

    case ACTIONS.ADD_CAR:
      newState.cars.push(action.payload);
      return newState;

    case ACTIONS.REMOVE_CAR:
      newState.cars = newState.cars.filter(x => x.props.car.vin !== action.payload);
      return newState;

    case ACTIONS.MODIFY_CAR:
      let idx = newState.cars.indexOf(action.payload);
      if (idx !== -1) {
        newState.cars[idx] = action.payload;
        return newState;

      } else {
        return state;
      }

    case ACTIONS.CARS_REQUESTED:
      newState.loading = true;
      return newState;

    case ACTIONS.CARS_RECEIVED:
      newState.loading = false;
      newState.cars = [...action.payload];
      return newState;

    case ACTIONS.CARS_ERROR:
      newState.loading = false;
      return newState;

    case ACTIONS.BOOKMARKED_REQUESTED:
    case ACTIONS.BOOKMARKED_ERROR:
      return state;

    case ACTIONS.BOOKMARKED_RECEIVED:
      newState.bookmarkedCars = action.bookmarkedCars;
      return newState;

    case ACTIONS.FETCH_CARS:
      newState.cars = action.payload.cars;
      newState.bookmarkedCars = action.payload.bookmarkedCars;
      return newState;

    default:
      return state;
  }

}

export default marketReducer;