import ACTIONS from './actionTypes';
import settingsInitialState from './initialState';
import _ from 'lodash';

const settingsReducer = (state = settingsInitialState, action) => {

  let newState = _.cloneDeep(state);

  switch(action.type) {
    case ACTIONS.CHANGE_MARKET_LAYOUT:
      newState.useNewDesign = (action.payload === 'new') ? true : false;
      return newState;
  
    case ACTIONS.CHANGE_PUSH_NOTIFICATIONS:
      newState.pushNotifications = action.payload;
      return newState;

    case ACTIONS.SET_LANGUAGE:
      newState.language = action.payload;
      return newState;

    case ACTIONS.SET_LANGUAGES:
      newState.languages = action.payload;
      return newState;

    default:
      return state;
  }
}

export default settingsReducer;



