/**
 * @desc Rebuild Contact page using clean and modern design
 * @author Daniel Peña
 */
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import ArrowIconMui from '@material-ui/icons/KeyboardArrowLeft';
import FullscreenIconMui from '@material-ui/icons/Fullscreen';
import FullscreenExitIconMui from '@material-ui/icons/FullscreenExit';
import { injectIntl, FormattedMessage } from 'react-intl';

import { AppNavHeight } from '../../../constants/ApplicationSettings';
import MemberCard from './MemberCard/MemberCard';
import ContactForm from './ContactForm/ContactForm';

const exitForm = keyframes`
  to {
    opacity: 0;
    transform: translateY(400px);
  }
`;

const enterForm = keyframes`
  from {
    opacity: 0;
    transform: translateY(400px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const fullTopBackground = keyframes`
  to {
    height: 100%;
    position: static;
    background-color: black;
  }
`;

const fullBottomBackground = keyframes`
  99% {
    height: 0px;
    width: 0px;
  }
  100% {
    display: none;
  }
`;

const normalBottomBackground = keyframes`
  99% {
    height: 40%;
  }
  100% {
    display: block;
  }
`;

const normalTopBackground = keyframes`
  to {
    height: 60%;
    position: relative;
  }
`;

const fullMapWrapper = keyframes`
  to {
    opacity: 1;
  }
`;

const normalMapWrapper = keyframes`
  to {
    opacity: 0.3;
  }
`;

const showLeftFormContent = keyframes`
  from {
    opacity: 0;
  }
  to {
    width: 100%;
    opacity: 1;
  }
`;

const hideLeftFormContent = keyframes`
  99% {
    width: 5%;
    opacity: 0.2;
  }
  100% {
    width: 0%;
    opacity: 0;
    display: none;
  }
`;

const normalRightFormContent = keyframes`
  to {
    width: 100%;
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: ${`calc(100% - ${AppNavHeight}px)`};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const TopBackground = styled.div`
  width: 100%;
  height: 60%;
  background-color: black;
  position: relative;

  animation: ${props => props.isFullscreen ? css`${fullTopBackground} 0.3s ease-in-out 0s` : css`${normalTopBackground} 0.3s ease-in-out 0s`};
  animation-fill-mode: forwards;
`;

const BottomBackground = styled.div`
  width: 100%;
  height: 40%;
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  animation: ${props => props.isFullscreen ? css`${fullBottomBackground} 0.3s ease-in-out 0s` : css`${normalBottomBackground} 0.3s ease-in-out 0s`};
  animation-fill-mode: forwards;

  & > svg {
    position: absolute;
    top: -50%;
    left: 0;
    z-index: 500;
    & > path {
      fill: rgb(0, 0, 0, 0.02);
    }
  }
`;

const FromWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px 0px rgb(0, 0, 0, 0.15);
  top: -70%;
  width: 55%;
  position: absolute;
  z-index: 800;

  animation: ${props => props.isFullscreen ? css`${exitForm} 0.3s ease-in-out 0s` : css`${enterForm} 0.3s ease-in-out 0s`};
  animation-fill-mode: forwards;

  @media only screen and (max-width: 768px) {
    width: 95%;
    top: -70%;
  }
`;

const FormContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: ${props => props.showAllMembers ? 'auto' : '3fr 1fr'};
  grid-template-rows: auto;

  @media only screen and (max-width: 768px) {
    grid-template-columns: auto;
    grid-template-rows: auto;
  }
`;

const HeaderContent = styled.div`
  height: auto;
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 90;
  position: absolute;
  background: transparent;
  top: 25%;

  @media only screen and (max-width: 768px) {
    top: 2%;
  }
`;

const PageTitle = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    font-size: 2.45rem;
    color: white;
    font-weight: 400;
  }

  @media only screen and (max-width: 768px) {
    & > span {
    font-size: 2.0rem;
    }
  }
`;

const PageDescripcion = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  & > span {
    font-size: 1.45rem;
    color: #fefefe;
    font-weight: 100;
  }

  @media only screen and (max-width: 768px) {
    & > span {
    font-size: 1.15rem;
    }
  }
`;

const FormLeftWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: ${props => props.showAllMembers ? 'none' : 'grid'};
  grid-template-rows: 1fr 3fr;
  grid-template-columns: auto;
  position: relative;

  animation: ${props => props.showAllMembers ? css`${hideLeftFormContent} 0.3s ease-in-out 0s` : css`${showLeftFormContent} 0.3s ease-in-out 0s`};
  animation-fill-mode: forwards;
`;

const FormTitle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 16px;
  & > span {
    font-weight: 600;
    font-size: 1.25rem;
  }
`;

const FormRightWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${props => props.showAllMembers ? 'row' : 'column'};
  flex-wrap: wrap;
  padding: ${props => props.showAllMembers ? '42px' : '0px'};
  max-width: ${props => props.showAllMembers ? '100%' : ''};
  position: relative;

  animation: ${props => props.showAllMembers ? css`${showLeftFormContent} 0.3s ease-in-out 0s` : css`${normalRightFormContent} 0.3s ease-in-out 0s`};
  animation-fill-mode: forwards;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const FooterText = styled.div`
  position: absolute;
  bottom: 8px;
  left: 0;
  width: 100%;
  text-align: center;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  & > iframe {
    width: 100%;
    height: 100%;
    border: none;
    z-index: 200;
    animation: ${props => props.isFullscreen ? css`${fullMapWrapper} 0.3s ease-in-out 0.3s` : css`${normalMapWrapper} 0.3s ease-in-out 0.3s`};
    animation-fill-mode: forwards;
  }
`;

const ContactFormWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 16px;
  justify-content: center;
  align-items: center;
`;

const ShowHideWrapper = styled.div`
  position: absolute;
  left: -12px;
  top: calc(50% - 8px);
  border-radius: 50%;
  background-color: black;
  cursor: pointer;
  transition: all 0.4s;
  transform: ${props => props.showAllMembers ? 'rotate(-180deg)' : 'none'};

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ShowHideIcon = styled(ArrowIconMui)`
  color: white;
`;

const FullscreenIcon = styled(FullscreenIconMui)`
  color: #fefefe;
  font-size: 1.6rem;
  transition: all 0.3s;
`;

const FullscreenExitIcon = styled(FullscreenExitIconMui)`
  color: #fefefe;
  font-size: 1.6rem;
  transition: all 0.3s;
`;

const FullscreenIconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: ${props => props.isFullscreen ? '64px' : '16px'};
  z-index: 800;
  background-color: black;
  border-radius: 50%;
  cursor: pointer;
  padding: 8px;
  transition:a ll 0.3s;
  &:hover ${FullscreenIcon} {
    font-size: 2.0rem;
  }
  @media only screen and (max-width: 768px) {
    top: ${props => props.isFullscreen ? '64px' : '16px'};
    right: 8px;
  }
`;

const steve = {
  name: 'Steve Solomon',
  phone: '(999) 999-9999',
  email: 'steve@pierpontglobal.com',
  photo: '/images/whatsapp/steve/steve.png',
  role: 'CEO / Sales support',
}

const hector = {
  name: 'Hector Acosta',
  phone: '(999) 999-9999',
  email: 'hector@pierpontglobal.com',
  photo: '/images/whatsapp/hector/hector.png',
  role: 'CTO / Software engineer',
}

const daniel = {
  name: 'Daniel Peña',
  phone: '(999) 999-9999',
  email: 'daniel@pierpontglobal.com',
  role: 'Software Engineer',
  photo: '/images/whatsapp/daniel/daniel.png',
}

const juan = {
  name: 'Juan Villagrana',
  phone: '(999) 999-9999',
  email: 'juan@pierpontglobal.com',
  role: 'CEO / Customer service',
  photo: '/images/whatsapp/juan/juan.png',
}

const emily = {
  name: 'Emily Rubens',
  phone: '(999) 999-9999',
  email: 'emily@pierpontglobal.com',
  role: 'Operations manager',
}

const luca = {
  name: 'Luca Toledo',
  phone: '(999) 999-9999',
  email: 'luca@pierpontglobal.com',
  role: 'Sale representative',
}

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      message: '',
      isFullscreen: false,
      showAllMembers: false,
    }
  }

  toggleFullscreen = () => {
    this.setState((prevState) => ({
      isFullscreen: !prevState.isFullscreen,
    }));
  }

  getFirstWord = (text) => {
    if (!!text) {
      let firstWord = text.split(' ')[0];
      return firstWord;
    }
    return text;
  }

  showAllMembersInForm = () => {
    this.setState((prevState) => ({
      showAllMembers: !prevState.showAllMembers,
    }));
  }

  render() {
    const { isFullscreen, showAllMembers } = this.state;
    const { user, intl } = this.props;
    return (
      <Wrapper>
        <TopBackground isFullscreen={isFullscreen}>
          <MapWrapper isFullscreen={isFullscreen}>
            <iframe title="Mobile map - miami florida" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.8792765692288!2d-80.19274648464578!3d25.774550783630893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b69c2ad348bb%3A0x7b8117c2e431f3a7!2s199+E+Flagler+St%2C+Miami%2C+FL+33131%2C+USA!5e0!3m2!1sen!2sdo!4v1556557890802!5m2!1sen!2sdo" frameBorder="0" allowFullScreen />
          </MapWrapper>
          <HeaderContent>
            <PageTitle>
              <FormattedMessage id="contact-page.title" values={{ subject: (!!user.name) ? this.getFirstWord(user.name) : intl.formatMessage({ id: 'contact-page.title.there' }) }} />
            </PageTitle>
            <PageDescripcion>
              <FormattedMessage id="contact-page.description" />
            </PageDescripcion>
          </HeaderContent>
          <FullscreenIconWrapper isFullscreen={isFullscreen} onClick={this.toggleFullscreen}>
            {
              isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />
            }
          </FullscreenIconWrapper>
        </TopBackground>
        <BottomBackground isFullscreen={isFullscreen}>
          <FromWrapper isFullscreen={isFullscreen}>
            <FormContentWrapper showAllMembers={showAllMembers}>
              <FormLeftWrapper showAllMembers={showAllMembers}>
                <FormTitle>
                  <FormattedMessage id="contact-page.write-your-message" />
                </FormTitle>
                <ContactFormWrapper>
                  <ContactForm intl={intl} user={user} />
                </ContactFormWrapper>
              </FormLeftWrapper>
              <FormRightWrapper showAllMembers={showAllMembers}>
                <ShowHideWrapper showAllMembers={showAllMembers} onClick={this.showAllMembersInForm}>
                  <ShowHideIcon />
                </ShowHideWrapper>
                <MemberCard user={hector} />
                <MemberCard user={steve} />
                {
                  showAllMembers ?
                    <>
                      <MemberCard user={juan} />
                      <MemberCard user={daniel} />
                      <MemberCard user={emily} />
                      <MemberCard user={luca} />
                    </>
                    : null
                }
              </FormRightWrapper>
            </FormContentWrapper>
          </FromWrapper>
          <FooterText>
            &copy; 2019 - PierpontGlobal, Inc. All rights reserved.
          </FooterText>
        </BottomBackground>
      </Wrapper>
    );
  }
}

export default injectIntl(ContactPage);
