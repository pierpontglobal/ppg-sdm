import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import userReducer from './user/reducer';
import settingsReducer from './settings/reducer';
import marketReducer from './market/reducer';

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
  userReducer,
  settingsReducer,
  marketReducer
});

const composeEnhancers = composeWithDevTools({
  trace: true, 
  traceLimit: 25 
}); 

const configureStore = (initialState) => {
  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  ));
  return store;
}

export default configureStore;
