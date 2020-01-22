import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NextArrowIcon from '@material-ui/icons/NavigateNext';
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

const StepsWrapper = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    max-height: 280px;
    overflow-y: auto;
  }
`;

const Step = styled.span`
  padding: 8px;
  border-radius: 8px;
  background-color: #3e78c0;
  color: white;
`;

const NextArrow = styled(NextArrowIcon)`
  @media only screen and (max-width: 768px) {
    transform: rotate(90deg);
  }
`;

function SignUpTutorial() {
  return (
    <div>
      <StepsWrapper>
        <Step>
          <FormattedMessage id="support.basics.sign-up.home-page" />
        </Step>
        <NextArrow />
        <Step>
          <FormattedMessage id="support.basics.sign-up.fill-out-form" />
        </Step>
        <NextArrow />
        <Step>
          <FormattedMessage id="support.basics.sign-up.click-confirmation" />
        </Step>
        <NextArrow />
        <Step>
          <FormattedMessage id="support.basics.sign-up.complete-information" />
        </Step>
        <NextArrow />
        <Step>
          <FormattedMessage id="support.basics.sign-up.select-username-password" />
        </Step>
      </StepsWrapper>
      <p style={{ marginTop: '16px' }}>
        <FormattedMessage id="support.basics.sign-up.text-1" />
      </p>
      <p>
        <FormattedMessage id="support.basics.sign-up.text-2" />
        <Button>
          <Link to="contact-us">
            <FormattedMessage id="support.basics.sign-up.text-2.contact-us" />
          </Link>
        </Button>
      </p>
    </div>
  );
}

export default SignUpTutorial;
