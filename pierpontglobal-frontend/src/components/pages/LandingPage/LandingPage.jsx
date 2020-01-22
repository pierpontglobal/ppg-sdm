import React from 'react';
import Img from 'react-image';
import { FormattedMessage, injectIntl } from 'react-intl';
import styled from 'styled-components';
import VideoBar from '../../Bars/VideoBar';
import Registration from '../../Forms/RegisterForm';
import ManheimLogo from './manheim.png';
import './font/flaticon.css';
import './landing_page.css';
import Button from '../../Btn/Btn';

const RegisterFormWrapper = styled.div`
  animation: 0.58s ease-out slideInFromRight;
  @keyframes slideInFromRight {
    0% {
      transform: translateX(30vw) rotate(45deg);
      opacity: 0;
    }
    90% {
      transform: rotate(1deg);
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRegisterForm: false,
    };
  }

  componentDidMount = () => {
    // Intersection observer
    if (window.IntersectionObserver) {
      const FormWrapper = document.querySelector('#form-wrapper');
      const options = {
        root: null, // document viewport as a trigger
        threshold: 0.94,
      };
      this.observer = new IntersectionObserver((entry) => {
        if (entry[0].isIntersecting) {
          this.setState({
            showRegisterForm: true,
          }, () => {
            this.observer.unobserve(document.querySelector('#form-wrapper'));
          });
        }
      }, options);
      this.observer.observe(FormWrapper);
    }
  }

  render() {
    const { showRegisterForm } = this.state;
    return (
      <div id="landing-page">
        <VideoBar />
        <Registration
          textColor="#ffffff"
          height="500px"
          background="linear-gradient(0deg, rgba(65,77,93,1) 0%, #3e78c0 100%)"
          openModal={this.openModal}
        />
        <div style={{
          width: '100%',
          height: '384px',
          background: '#f6f8fa',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <img
            style={{
              width: '152.5px',
              height: '152.5px',
              marginBottom: '40px',
            }}
            src={ManheimLogo}
            alt="Manheim logo"
          />

          <p
            className="big-title"
            style={{
              color: '#393e44',
            }}
          >
            <FormattedMessage id="landing.featuring-inventory" />
          </p>

          <p className="title-follow-up" style={{ color: '#393e44' }}>
            <FormattedMessage id="landing.featuring-inventory-text" />
          </p>
        </div>

        <div style={{
          padding: '40px',
          width: '100%',
          height: 'auto',
          background: '#ffffff',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <p
            className="big-title"
            style={{
              color: '#393e44',
            }}
          >
            <div className="typewriter">
              <div className="typewriter-text">
                <FormattedMessage id="landing.you-have-access-to" />
              </div>
            </div>
          </p>

          <p className="title-follow-up" style={{ color: '#393e44' }}>
            <FormattedMessage id="landing.you-have-access-to-text" />
          </p>

          <div className="cards-holder-3">
            <div className="card-info">
              <Img
                alt="magnifier"
                className="landing-page-icon"
                src={[
                  '/images/marketplace/magnifier/magnifier.webp',
                  '/images/marketplace/magnifier/magnifier.jp2',
                  '/images/marketplace/magnifier/magnifier.jxr',
                  '/images/marketplace/magnifier/magnifier.png',
                ]}
                loader={
                  <div style={{ width: '200px', height: '200px', background: '#dedede' }} />
                }
              />
              <p className="subtitle-medium"><FormattedMessage id="landing.search-listing" /></p>
              <p className="subtitle-follow-up"><FormattedMessage id="landing.search-listing-text" /></p>
            </div>
            <div className="card-info">
              <Img
                alt="imac"
                className="landing-page-icon"
                src={[
                  '/images/marketplace/imac/imac.webp',
                  '/images/marketplace/imac/imac.jp2',
                  '/images/marketplace/imac/imac.jxr',
                  '/images/marketplace/imac/imac.png',
                ]}
                loader={
                  <div style={{ width: '200px', height: '200px', background: '#dedede' }} />
                }
              />
              <p className="subtitle-medium"><FormattedMessage id="landing.place-bids" /></p>
              <p className="subtitle-follow-up"><FormattedMessage id="landing.place-bids-text" /></p>
            </div>
            <div style={{ marginBottom: '30px' }} className="card-info">
              <Img
                alt="pin"
                className="landing-page-icon"
                src={[
                  '/images/marketplace/pin/pin.webp',
                  '/images/marketplace/pin/pin.jp2',
                  '/images/marketplace/pin/pin.jxr',
                  '/images/marketplace/pin/pin.png',
                ]}
                loader={
                  <div style={{ width: '200px', height: '200px', background: '#dedede' }} />
                }
              />
              <p className="subtitle-medium"><FormattedMessage id="landing.delivery" /></p>
              <p className="subtitle-follow-up"><FormattedMessage id="landing.delivery-text" /></p>
            </div>
          </div>


        </div>

        <div style={{
          paddingTop: '100px',
          paddingBottom: '100px',
          width: '100%',
          height: 'auto',
          background: '#f6f8fa',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <div className="cards-holder-2" id="form-wrapper">
            <div className="column-5">
              <p className="subtitle-medium">
                <FormattedMessage id="landing.sign-up-now" />
                <span style={{
                  fontWeight: 'bold',
                }}
                >
                  {' '}
                  <FormattedMessage id="landing.be-first-access" />
                </span>
              </p>
              <p style={{ fontStyle: 'italic', fontSize: '16px', textAlign: 'left' }} className="subtitle-follow-up">
                <FormattedMessage id="landing.sign-up-quote" />
              </p>
              <p style={{ alignSelf: 'flex-end', marginTop: '50px' }} className="subtitle-follow-up">— Jorge Abreu, Abreu Motors</p>
            </div>
            {
              showRegisterForm ? (
                <RegisterFormWrapper
                  style={{
                    padding: '20px',
                    background: '#ffffff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                  className="shadow column-5"
                >
                  <Registration backgroundColor="rgb(255, 255, 255, 0.8)" openModal={this.openModal} />
                </RegisterFormWrapper>
              ) : null
            }
          </div>
        </div>
        <div style={{
          paddingTop: '100px',
          paddingBottom: '100px',
          width: '100%',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '600px',
        }}
        >
          <Img
            style={{
              position: 'absolute',
              minHeight: '100%',
              minWidth: '100%',
              width: 'auto',
              height: 'auto',
              bottom: '0',
            }}
            alt="Customs"
            className="image-landing"
            src={[
              '/images/marketplace/section1_bg/section1_bg.webp',
              '/images/marketplace/section1_bg/section1_bg.jp2',
              '/images/marketplace/section1_bg/section1_bg.jxr',
              '/images/marketplace/section1_bg/section1_bg.png',
            ]}
            loader={
              <div style={{ width: '100%', height: '100px', background: '#dedede' }} />
            }
          />

          <div style={{
            position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
          />

          <div style={{ position: 'absolute' }} className="cards-holder-1">
            <div style={{ color: '#ffffff' }} className="column-1">
              <p className="big-title">
                <FormattedMessage id="landing.what-makes-unique" />
              </p>
              <p style={{ fontSize: '16px', textAlign: 'center', maxWidth: '350px' }} className="subtitle-follow-up">
                <FormattedMessage id="landing.what-makes-unique-text" />
              </p>
              <Button
                type="button"
                style={{ marginTop: '12px', maxWidth: '300px' }}
                width="80%"
                maxWidth="300px"
                color="#3e78c0"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth', // Optional, adds animation
                  });
                }}
              >
                <FormattedMessage id="landing.sign-up-now" />
{' '}
&gt;&gt;
</Button>
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: '100px',
          paddingBottom: '100px',
          width: '100%',
          height: 'auto',
          background: '#f6f8fa',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        >
          <div className="cards-holder-1">
            <div className="column-1">
              <p className="big-title">
                <FormattedMessage id="landing.built-for" />
              </p>
            </div>
            <div className="cards-holder-2">
              <div
                style={{
                  padding: '10px',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}
                className="column-5"
              >

                <Img
                  style={{
                    maxWidth: '600px',
                  }}
                  alt="Customs"
                  className="image-landing"
                  src={[
                    '/images/marketplace/loader1/loader1.webp',
                    '/images/marketplace/loader1/loader1.jp2',
                    '/images/marketplace/loader1/loader1.jxr',
                    '/images/marketplace/loader1/loader1.png',
                  ]}
                  loader={
                    <div style={{ width: '100%', height: '100px', background: '#dedede' }} />
                  }
                />

                <p style={{ width: '100%', textAlign: 'left' }} className="subtitle-medium">
                  <FormattedMessage id="label.logistics" />
                </p>
                <p>
                  <FormattedMessage id="landing.logistics-text" />
                </p>
              </div>

              <hr className="phoneDivisor" />

              <div
                style={{
                  padding: '10px',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}
                className="column-5"
              >
                <Img
                  style={{
                    maxWidth: '600px',
                  }}
                  alt="Customs"
                  className="image-landing"
                  src={[
                    '/images/marketplace/customs1/customs1.webp',
                    '/images/marketplace/customs1/customs1.jp2',
                    '/images/marketplace/customs1/customs1.jxr',
                    '/images/marketplace/customs1/customs1.png',
                  ]}
                  loader={
                    <div style={{ width: '100%', height: '100px', background: '#dedede' }} />
                  }
                />

                <p style={{ width: '100%', textAlign: 'left' }} className="subtitle-medium">
                  <FormattedMessage id="landing.customs" />
                </p>

                <p>
                  <FormattedMessage id="landing.customs-text" />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: '100px',
          paddingBottom: '100px',
          width: '100%',
          height: 'auto',
          minHeight: '500px',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
        >

          <Img
            style={{
              position: 'absolute',
              minHeight: '100%',
              minWidth: '100%',
              width: 'auto',
              height: 'auto',
              bottom: 0,
            }}
            alt="Customs"
            className="image-landing"
            src={[
              '/images/marketplace/landing_bottom/landing_bottom.webp',
              '/images/marketplace/landing_bottom/landing_bottom.jp2',
              '/images/marketplace/landing_bottom/landing_bottom.jxr',
              '/images/marketplace/landing_bottom/landing_bottom.png',
            ]}
            loader={
              <div style={{ width: '100%', height: '100px', background: '#dedede' }} />
            }
          />

          <div style={{
            position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
          />

          <div style={{ position: 'absolute' }} className="cards-holder-1">
            <div style={{ color: '#ffffff' }} className="column-1">
              <p className="big-title">
                <FormattedMessage id="landing.working-smarter" />
              </p>
              <p
                style={{
                  fontSize: '16px',
                  textAlign: 'center',
                  maxWidth: '350px',
                }}
                className="subtitle-follow-up"
              >
                <FormattedMessage id="landing.working-smarter-text" />
              </p>
              <Button
                type="button"
                marginTop="96px"
                marginBottom="10px"
                style={{ marginTop: '96px', maxWidth: '300px' }}
                width="80%"
                maxWidth="300px"
                color="#3e78c0"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
              >
                <FormattedMessage id="landing.sign-me-up" />
              </Button>
              <p style={{ textAlign: 'center' }}>
                <FormattedMessage id="landing.by-continuing" />
                <br />
                <FormattedMessage id="landing.terms-of-use" />
              </p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default injectIntl(LandingPage);
