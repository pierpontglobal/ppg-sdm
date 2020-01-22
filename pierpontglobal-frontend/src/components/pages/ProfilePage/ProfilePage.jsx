import React from 'react';
import axios from 'axios';
import { Route, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { CircularProgress } from '@material-ui/core';
import AccountPanel from '../../AccountPanel/AccountPanel';
import { ApiServer } from '../../../Defaults';
import DealerCreator from './DealerCreator/DealerCreator';
import SettingSide from './SettingSide/SettingSide';
import SubscriptionSide from './SubscriptionSide/SubscriptionSide';
import PurchaseSide from './PurchaseSide/PurchaseSide';
import PendingSide from './PendingSide/PendingSide';
import FinancialSide from './FinancialSide/FinancialSide';
import TransactionsSide from './TransactionsSide/TransactionsSide';
import NotificationTypes from '../../../constants/NotificationTypes';
import IssueTypes from '../../../constants/IssueTypes';
import ApplicationRoutes from '../../../constants/Routes';
import './styles.css';
import withClientNotifier from '../../../hocs/withClientNotifier';

const Wrapper = styled.div`
  background-color: #dedede;
  width: 100%;
  height: 100%;
`;

const AccountPanelWrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 300px;
  left: 0;
  top: 0;
  padding-top: 55px;
  display: none;
  @media only screen and (min-width: 768px) {
    display: inherit;
  }
`;

const RouterWrapper = styled.div`
  margin-bottom: 50px;
  @media only screen and (min-width: 768px) {
    margin-left: 300px;
  }
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasDealer: false,
      hasActiveSubscription: false,
      cards: [],
      subscription: {},
      user: {},
      dealer: {},
      loading: true,
    };
  }

  componentDidMount = () => {
    this.getUserSettings();
  }

  componentWillReceiveProps = (newProps) => {
    console.log(newProps);
  }

  getUserSettings = () => {
    axios.get(`${ApiServer}/api/v1/user/settings`).then((data) => {
      this.setUserSettings(data.data);
    }, err => {
      console.log('User settings >>>');
      console.log(err);
    });
  }

  setUserSettings = (settings) => {
    const {
      user,
      dealer,
      card_sources,
      subcripcion_details } = settings;

    console.log(user, dealer, card_sources, subcripcion_details);

    this.setState({
      user: user,
      dealer: !!dealer ? {
        name: dealer.name,
        address: dealer.address1,
        number: dealer.phone_number,
        email: user.email,
      } : null,
      cards: card_sources,
      subscription: subcripcion_details,
      loading: false,
    }, () => {
      // Check for notifications
      if (!dealer || !card_sources || !subcripcion_details) {
        this.checkNotifications();
      }
    });
  }

  sendNotification = (notifications) => {
    axios.post(`${ApiServer}/api/v1/notification`, { notifications: notifications });
  }

  checkNotifications = () => {
    const { intl } = this.props;
    const { user, dealer, subscription, cards } = this.state;

    const messages = {
      accountIncomplete: intl.formatMessage({ id: 'profile.account-incomplete' }),
      subsText: intl.formatMessage({ id: 'profile.account-incomplete-subscription-text' }),
      cardsText: intl.formatMessage({ id: 'profile.account-incomplete-cards-text' }),
      dealerText: intl.formatMessage({ id: 'profile.account-incomplete-dealer-text' }),
    };

    const notificationDto = {
      title: messages.accountIncomplete,
      message: messages.subsText,
      payload: user,
      type: NotificationTypes.alert,
      issue_id: undefined,
    };

    let notifications = [notificationDto];

    if (!subscription) {
      const subscriptionNoti = { ...notificationDto };
      notifications.push(subscriptionNoti);
    } else if (!!subscription && !subscription.active) {
      const subscriptionNoti = { ...notificationDto };
      notifications.push(subscriptionNoti);
    }

    if (!cards) {
      const cardNoti = { ...notificationDto };
      cardNoti.message = messages.cardsText;
      cardNoti.issue_id = IssueTypes.CARD_INFORMATION_MISSING;
      notifications.push(cardNoti);
    }

    if (!dealer) {
      const dealerNoti = { ...notificationDto };
      dealerNoti.message = messages.cardsText;
      notifications.push(dealerNoti);
    }

    this.sendNotification(notifications);
  }

  render() {
    const {
      dealer,
      loading,
      subscription,
    } = this.state;

    const { cookies, user, openNotification } = this.props;

    return (
      loading ?
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
        : (
          <Wrapper>
            <DealerCreator show={!dealer || !subscription} hasDealer={!dealer} />
            <AccountPanelWrapper>
              <AccountPanel openNotification={openNotification} dealer={dealer} />
            </AccountPanelWrapper>
            <RouterWrapper>
              <Switch>
                <Route exact path={ApplicationRoutes.profilePage.default} render={() => (<SettingSide openNotification={openNotification} user={user} cookies={cookies} />)} />
                <Route path={ApplicationRoutes.profilePage.purchase} render={() => (<PurchaseSide cookies={cookies} />)} />
                <Route path={ApplicationRoutes.profilePage.pending} render={() => (<PendingSide cookies={cookies} />)} />
                <Route path={ApplicationRoutes.profilePage.financial} render={() => (<FinancialSide cookies={cookies} />)} />
                <Route
                  exact
                  path={ApplicationRoutes.profilePage.subscription}
                  render={() => (
                    <SubscriptionSide cookies={cookies} />
                  )}
                />
                <Route exact path={ApplicationRoutes.profilePage.transactions} render={() => (<TransactionsSide cookies={cookies} />)} />
              </Switch>
            </RouterWrapper>
          </Wrapper>
        )
    );
  }
}

ProfilePage.defaultProps = {
  cookies: {},
};

export default withRouter(injectIntl(withClientNotifier(ProfilePage)));
