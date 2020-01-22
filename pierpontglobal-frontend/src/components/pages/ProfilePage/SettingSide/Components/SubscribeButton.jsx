import React from 'react';
import { injectIntl } from 'react-intl';
import Button from '@material-ui/core/Button';

const OneSignal = window.OneSignal || [];
const buttonSelector = '#my-notification-button';

function getSubscriptionState() {
  return Promise.all([
    OneSignal.isPushNotificationsEnabled(),
    OneSignal.isOptedOut(),
  ]).then((result) => {
    const isPushEnabled = result[0];
    const isOptedOut = result[1];

    return {
      isPushEnabled,
      isOptedOut,
    };
  });
}

function onManageWebPushSubscriptionButtonClicked(event) {
  getSubscriptionState().then((state) => {
    if (state.isPushEnabled) {
      /* Subscribed, opt them out */
      OneSignal.setSubscription(false);
    } else if (state.isOptedOut) {
      /* Opted out, opt them back in */
      OneSignal.setSubscription(true);
    } else {
      /* Unsubscribed, subscribe them */
      OneSignal.registerForPushNotifications();
    }
  });
  event.preventDefault();
}

function updateMangeWebPushSubscriptionButton(props) {
  const subscribeText = props.intl.formatMessage({ id: 'label.subscribe' });
  const unsubscribeText = props.intl.formatMessage({ id: 'label.unsubscribe' });

  getSubscriptionState().then((state) => {
    const buttonText = !state.isPushEnabled || state.isOptedOut ? subscribeText : unsubscribeText;

    const element = document.querySelector(buttonSelector);
    if (element === null) {
      return;
    }

    element.removeEventListener('click', onManageWebPushSubscriptionButtonClicked);
    element.addEventListener('click', onManageWebPushSubscriptionButtonClicked);
    element.textContent = buttonText;

    if (state.hideWhenSubscribed && state.isPushEnabled) {
      element.style.display = 'none';
    } else {
      element.style.display = '';
    }
  });
}

function SubscribeButton(props) {
  OneSignal.push(() => {
    // If we're on an unsupported browser, do nothing
    if (!OneSignal.isPushNotificationsSupported()) {
      console.log(OneSignal);
      return;
    }
    updateMangeWebPushSubscriptionButton(props);
    OneSignal.on('subscriptionChange', () => {
      updateMangeWebPushSubscriptionButton(props);
    });
  });

  return (
    <Button variant="contained" color="primary" id="my-notification-button">
      ...
    </Button>
  );
}

export default injectIntl(SubscribeButton);
