import React from 'react';
import { withCookies } from 'react-cookie';
import './styles.css';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import NotificatinBadge from '../AppNav/notification-badge/NotificatinBadge';

const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

class AccountManager extends React.Component {
  // Constructor
  constructor(props) {
    super(props);

    this.getDisplayable = this.getDisplayable.bind(this);
  }

  // TODO: Verify token validation and re logging if necessary
  getDisplayable() {
    const { cookies } = this.props;

    const token = cookies.get('token', { path: '/' });

    if (token) {
      return (
        <UserInfoWrapper>
          <NotificatinBadge />
          <button
            type="button"
            onClick={() => { this.props.history.push('/user'); }}
            className="sign_in_button"
          >
            <i className="far fa-user" id="inner-sign-in-icon" />
            <FormattedMessage id="label.profile" />
          </button>
        </UserInfoWrapper>
      );
    }

    return (
      <button
        type="button"
        className="sign_in_button"
        onClick={this.props.showSignIn}
      >
        <i className="far fa-user" id="inner-sign-in-icon" />
        <FormattedMessage id="label.sign-in" />
      </button>
    );
  }

  render() {
    return (this.getDisplayable());
  }
}

export default withCookies(AccountManager);
