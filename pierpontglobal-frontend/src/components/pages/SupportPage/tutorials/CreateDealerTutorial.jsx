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

function CreateDealerTutorial() {
  return (
    <div>
      <p>
        <FormattedMessage id="support.create-dealer.text-1" />
      </p>
      <div>
        <ResponsiveImageCentered alt="Register dealer image | Pierpont Global, Incc" src="/images/supportpage/register-form.png" />
        <ImageText style={{ margin: '16px' }}>
          <p>
            <FormattedMessage id="support.create-dealer.text-2" />
            <br />
            <b>
              <FormattedMessage id="support.create-dealer.note" />
            </b>
            {' '}
            <FormattedMessage id="support.create-dealer.text-3" />
            {' '}
            <i>US$1.00</i>
            {' '}
            <FormattedMessage id="support.create-dealer.text-4" />
            <br />
            <br />
            <FormattedMessage id="support.create-dealer.text-5" />
            <Button>
              <Link to="/marketplace">
                <FormattedMessage id="support.create-dealer.marketplace-page" />
              </Link>
            </Button>
            {' '}
            <FormattedMessage id="support.create-dealer.text-6" />
          </p>
        </ImageText>
      </div>
    </div>
  );
}

export default CreateDealerTutorial;
