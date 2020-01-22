import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const ResponsiveImageCentered = styled.img`
  margin: 0 auto;
  box-shadow: 0px 0xp 4px 2px rgb(0, 0, 0, 0.8);
  width: ${props => (props.imageWidth ? props.imageWidth : '40%')};
  float: left;
  margin-right: 1.5rem;
  @media only screen and (max-width: 768px) {
    width: 80%;
    float: none;
    margin: auto;
    display: block;
  }
`;

const ImageText = styled.div`
  ::after {
    clear: both;
  }
`;

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

const AddingCardTutorial = () => (
  <div>
    <FormattedMessage id="support.basics.nagivate-to-the" />
    <Button>
      <Link to="/user">
        <FormattedMessage id="support.basics.profile-page" />
      </Link>
    </Button>
    <FormattedMessage id="support.basics.got-to-payment-methods" />
    <ResponsiveImageCentered style={{ marginTop: '16px' }} imageWidth="55%" src="/images/supportPage/payment-methods-section.png" />
    <ImageText style={{ marginTop: '16px' }}>
      <p>
        <FormattedMessage id="support.basics.here-you-can-click" />
        {' '}
        <b>
          <FormattedMessage id="support.basics.add-payment-method" />
        </b>
        <FormattedMessage id="support.basics.popup-dialog-text" />
      </p>
      <br />
      <p>
        <FormattedMessage id="support.basics.add-card-paragraph" />
      </p>
    </ImageText>
  </div>
);

export default AddingCardTutorial;
