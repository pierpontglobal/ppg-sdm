import ACTIONS from './actionTypes';
import userInitialState from './initialState';
import _ from 'lodash';

const userReducer = (state = userInitialState, action) => {

  let newState = _.cloneDeep(state);

  switch(action.type) {
    case ACTIONS.CREATE_USER:
    case ACTIONS.MODIFY_USER:
      let user = action.payload;
      newState.user = {
        ...newState.user,
        ...user // Override previous matched info
      };
      return newState;

    case ACTIONS.REMOVE_USER:
      newState.user = {};
      return newState;

    case ACTIONS.SAVED_CARS_REQUESTED:
      newState.fetchingSavedCars = true;
      return newState;

    case ACTIONS.SAVED_CARS_RECEIVED:
      newState.fetchingSavedCars = false;
      newState.savedCars = action.payload;
      return newState;

    case ACTIONS.REMOVE_SAVED_CAR_REQUESTED:
      newState.fetchingSavedCars = true;
      return newState;

    case ACTIONS.REMOVE_SAVED_CAR_RECEIVED:
      newState.fetchingSavedCars = false;
      newState.savedCars = newState.savedCars.filter(x => x.vin !== action.payload);
      return newState;

    case ACTIONS.ADD_SAVED_CAR_REQUESTED:
      newState.fetchingSavedCars = true;
      return newState;

    case ACTIONS.ADD_SAVED_CAR_RECEIVED:
      newState.fetchingSavedCars = false;
      newState.savedCars = [...newState.savedCars, action.payload];
      return newState;

    case ACTIONS.DEALER_LOGO_CHANGE_ERROR:
      newState.user.dealer.changingPhoto = false;
      return newState;

    case ACTIONS.DEALER_LOGO_CHANGE:
      newState.user.dealer.changingPhoto = true;
      return newState;

    case ACTIONS.DEALER_LOGO_CHANGE_SUCCESS:
      newState.user.dealer.changingPhoto = false;
      newState.user.dealer.logo = action.payload;
      return newState;

    case ACTIONS.USER_IMAGE_CHANGE_ERROR:
      newState.user.isSavingInfo = false;
      return newState;

    case ACTIONS.USER_IMAGE_CHANGE:
      newState.user.isSavingInfo = true;
      return newState;

    case ACTIONS.USER_IMAGE_CHANGE_SUCCESS:
      newState.user.isSavingInfo = false;
      newState.user.photo = action.payload;
      return newState;

    default:
      return state;
  }
}

export default userReducer;



