import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const Button = styled.button`
  padding: 4px;
  background-color: transparent;
  color: #3e78c0;
  font-weight: 600;
  border-radius: 8px;
  font-style: italic;
  border: none;
  box-shadow: none;
  &:hover {
    text-decoration: underline;
    animation: 0.5s;
  }
`;

function SubscribeTutorial() {
  return (
    <div>
      <FormattedMessage id="support.bids.navigate-to-the" />
      <Button>
        <Link to="/user">
          <FormattedMessage id="support.bids.profile-page" />
        </Link>
      </Button>
      <FormattedMessage id="support.bids.subscribe-text-1" />
      <br />
      <br />
      <FormattedMessage id="support.bids.subscribe.text-2" />
      {' '}
      <b>
        <FormattedMessage id="support.bids.subscribe-piush-notificacions" />
      </b>
      .
    </div>
  );
}

export default SubscribeTutorial;
