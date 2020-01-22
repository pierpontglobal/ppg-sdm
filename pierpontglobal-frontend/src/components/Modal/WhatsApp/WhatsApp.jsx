import React from 'react';
import Img from 'react-image';
import './custom.css';
import posed from 'react-pose';
import styled from 'styled-components';
import { FormattedMessage, injectIntl } from 'react-intl';

const WButton = posed.div({
  clicked: {
    rotate: 180,
    opacity: 1,
  },
  normal: {
    rotate: 0,
    opacity: 1,
  },
});

const WList = posed.div({
  hidden: {
    opacity: 0,
    y: 700,
    transition: { duration: 400 },
  },
  visible: {
    opacity: 1,
    y: -70,
    transition: { duration: 400 },
  },
});

const WMessage = posed.div({
  clicked: {
    y: 120,
    opacity: 0,
  },
  normal: {
    y: 0,
    opacity: 1,
  },
});

const WElement = posed.div({
  exit: {
    opacity: 0,
    y: 50,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: ({ i }) => ({ delay: i * 200 }),
  },
  props: { i: 0 },
});

const WMessageStyleWrapper = styled(WMessage)`
  position: absolute;
  right: 80px;
  bottom: 10px;
  padding: 7px;
  border-radius: 5px;
  background-color: #ffffff;
  min-width: 180px;
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const WWrapper = posed.div({
  normal: {
    y: 0,
  },
  moveToTop: {
    y: -76,
  }
});

const ClickHandlerWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.75);
  z-index: 1500;
  position: fixed;
  display: ${props => (props.isVisible ? 'inherit' : 'none')};
`;

const WListComponent = styled(WList)`
  border-radius: 10px;
  display: none;
  right: 50px;
  position: absolute;
  bottom: 10px;
  @media only screen and (max-width: 480px) {
    right: 0px;
  }
`;


class WhatsApp extends React.Component {
  constructor() {
    super();

    this.state = {
      whatsappVisible: false,
      wWPosition: 'normal',
    };

    window.changeWWPosition = (target) => {
      this.setState({
        wWPosition: target,
      });
    };
  }

  handleOnClose = () => {
    this.setState({
      whatsappVisible: false,
    });
  }

  handleButtonClick = (e) => {
    const { whatsappVisible } = this.state;
    if (e.target.className) {
      if (e.target.className.includes('fa-whatsapp') || e.target.className.includes('icon')) {
        if (!whatsappVisible) {
          this.wList.style.display = 'flex';
        } else {
          setTimeout(() => {
            this.wList.style.display = 'none';
          }, 500);
        }
        this.setState({ whatsappVisible: !whatsappVisible });
        return;
      }
    }
    this.setState({ whatsappVisible: false });
  }

  render() {
    const { whatsappVisible, wWPosition } = this.state;

    return (
      <>
        <ClickHandlerWrapper data-cy="ws-click-handler" isVisible={whatsappVisible} onClick={this.handleOnClose} />
        <WWrapper
          pose={ wWPosition }
          className="outerWhatsApp slide-in"
          id="wrapper"
        >
          <WListComponent
            pose={this.state.whatsappVisible ? 'visible' : 'hidden'}
            ref={(node) => { this.wList = node; }}
            className="chat-box animated shadow"
            id="chat-box"
            data-cy="ws-list-component"
          >
            <div className="card card-radius-all border-0">
              <div className="card-header card-radius" style={{ backgroundColor: '#2db742' }}>
                <div className="d-flex">
                  <span><i className="fab fa-whatsapp " /></span>
                  <div className="d-flex flex-column px-3">
                    <h5 className="header-heading "><FormattedMessage id="whatsapp.start-conversation" /></h5>
                    <p className="header-description mb-0">
                      <FormattedMessage id="whatsapp.welcome" values={{ social: <b>Whatsapp</b> }} />
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-body p-0 pb-2">
                <p className="description pl-3 pt-3 pb-0 mb-2"><FormattedMessage id="whatsapp.reply-info" /></p>
                <div className="list-unstyled">
                  <WElement pose={this.state.whatsappVisible ? 'enter' : 'exit'} i={1} key={1} href="#!" className="nav-link animated fadeInUp">
                    <div onClick={() => { window.location.href = 'https://wa.me/13056002113?text=Hello Juan, '; }} style={{ cursor: 'pointer' }} className="media px-3 py-2">
                      <div className="d-flex justify-content-end w-100 align-items-center">
                        <Img
                          style={{
                            width: '60px',
                          }}
                          alt="Administrator"
                          className="mr-3"
                          src={[
                            '/images/whatsapp/juan/juan.webp',
                            '/images/whatsapp/juan/juan.jp2',
                            '/images/whatsapp/juan/juan.jxr',
                            '/images/whatsapp/juan/juan.png',
                          ]}
                          loader={
                            <div style={{ width: '60px', height: '60px', background: '#dedede' }} />
                          }
                        />

                        <div className="media-body">
                          <p className="mb-1 name">Juan Villagrana</p>
                          <p style={{ color: 'darkgray' }} className="mb-1 profession"><FormattedMessage id="customer-service" /></p>
                        </div>
                        <div>
                          <span><i className="fab fa-whatsapp gren" /></span>
                        </div>
                      </div>

                    </div>
                  </WElement>
                  <WElement pose={this.state.whatsappVisible ? 'enter' : 'exit'} i={2} key={2} href="#!" className="nav-link animated fadeInUp">
                    <div onClick={() => { window.location.href = 'https://wa.me/18299570268?text=Hello Héctor, '; }} style={{ cursor: 'pointer' }} className="media px-3 py-2">
                      <div className="d-flex justify-content-end w-100 align-items-center">

                        <Img
                          style={{
                            width: '60px',
                          }}
                          alt="Administrator"
                          className="mr-3"
                          src={[
                            '/images/whatsapp/hector/hector.webp',
                            '/images/whatsapp/hector/hector.jp2',
                            '/images/whatsapp/hector/hector.jxr',
                            '/images/whatsapp/hector/hector.png',
                          ]}
                          loader={
                            <div style={{ width: '60px', height: '60px', background: '#dedede' }} />
                          }
                        />
                        <div className="media-body">
                          <p className="mb-1 name">Héctor Acosta</p>
                          <p style={{ color: 'darkgray' }} className="mb-1 profession"><FormattedMessage id="technical-support" /></p>
                        </div>
                        <div>
                          <span><i className="fab fa-whatsapp gren" /></span>
                        </div>
                      </div>

                    </div>
                  </WElement>
                  <WElement pose={this.state.whatsappVisible ? 'enter' : 'exit'} i={3} key={3} href="#!" className="nav-link animated fadeInUp">
                    <div onClick={() => { window.location.href = 'https://wa.me/19548063292?text=Hello Steve, '; }} style={{ borderLeftColor: 'darkgrey', cursor: 'pointer' }} className="media px-3 py-2">
                      <div className="d-flex justify-content-end w-100 align-items-center">
                        <Img
                          style={{
                            width: '60px',
                          }}
                          alt="Administrator"
                          className="mr-3"
                          src={[
                            '/images/whatsapp/steve/steve.webp',
                            '/images/whatsapp/steve/steve.jp2',
                            '/images/whatsapp/steve/steve.jxr',
                            '/images/whatsapp/steve/steve.png',
                          ]}
                          loader={
                            <div style={{ width: '60px', height: '60px', background: '#dedede' }} />
                          }
                        />
                        <div className="media-body">
                          <p className="mb-1 name">Steve Solomon</p>
                          <p style={{ color: 'darkgray' }} className="mb-1 profession"><FormattedMessage id="sale-support" /></p>
                          <p style={{ color: 'orange' }} className="mb-1 profession"><FormattedMessage id="whatsapp.be-back-soon" /></p>
                        </div>
                        <div>
                          <span><i style={{ color: 'darkgray' }} className="fab fa-whatsapp gren" /></span>
                        </div>
                      </div>

                    </div>
                  </WElement>
                </div>
              </div>
            </div>
          </WListComponent>
          <WMessageStyleWrapper
            pose={this.state.whatsappVisible ? 'clicked' : 'normal'}
            className="shadow"
          >
            <FormattedMessage id="whatsapp.need-help" />
            <span style={{ fontWeight: 'bold' }}>
              {' '}
              <FormattedMessage id="whatsapp.chat-with-us" />
            </span>
          </WMessageStyleWrapper>
          <div
            style={{
              zIndex: 200, position: 'absolute', right: 0, bottom: 0, width: 'auto', display: 'flex', justifyContent: 'flex-end',
            }}
            onClick={e => this.handleButtonClick(e)}
          >
            <WButton
              pose={this.state.whatsappVisible ? 'clicked' : 'normal'}
              id="chat-icon"
              className="icon d-flex justify-content-center align-items-center"
              data-cy="whatsapp-button"
            >
              <span id="icon-html">
                {this.state.whatsappVisible ? <i className="fas fa-times" /> : <i className="fab fa-whatsapp" />}
              </span>
            </WButton>
          </div>
        </WWrapper>
      </>
    );
  }
}

export default injectIntl(WhatsApp);
