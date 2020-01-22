import ActionTypes from './actionTypes';

const setLanguage = lang => ({
  type: ActionTypes.SET_LANGUAGE,
  payload: lang
});

const setLanguages = langs => ({
  type: ActionTypes.SET_LANGUAGES,
  payload: langs
})

const changeMarketDesign = toChange => ({
  type: ActionTypes.CHANGE_MARKET_LAYOUT,
  payload: toChange
});

const modifyPushNotifications = receivePushNotifications => ({
  type: ActionTypes.CHANGE_PUSH_NOTIFICATIONS,
  payload: receivePushNotifications
});

export default {
  setLanguage,
  setLanguages,
  changeMarketDesign,
  modifyPushNotifications
}