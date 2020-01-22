import React from 'react';
import VideoModal from 'react-modal-video';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import InfoBar from '../styles/InfoBar/InfoBar';
import Button from '../Btn/Btn';
import '../../../node_modules/react-modal-video/css/modal-video.min.css';
import './styles.css';

const VideoBarText = styled.div`
margin-right: 0;
margin-bottom: 10px;
text-align: center;
@media only screen and (min-width: 600px) {
  margin-right: 20px;
  margin-bottom: 0;
}
`;

const ButtonWrapper = styled(Button)`
  animation: ppg-wooble 0.8s both 1s;
  @keyframes ppg-wooble {
    0%, 100% {
      -webkit-transform: translateX(0%);
      transform: translateX(0%);
      -webkit-transform-origin: 50% 50%;
      transform-origin: 50% 50%;
    }
    15% {
    -webkit-transform: translateX(-30px) rotate(-6deg);
    transform: translateX(-30px) rotate(-6deg);
    }
    30% {
      -webkit-transform: translateX(15px) rotate(6deg);
      transform: translateX(15px) rotate(6deg);
    }
    45% {
      -webkit-transform: translateX(-15px) rotate(-3.6deg);
      transform: translateX(-15px) rotate(-3.6deg);
    }
    60% {
      -webkit-transform: translateX(9px) rotate(2.4deg);
      transform: translateX(9px) rotate(2.4deg);
    }
    75% {
      -webkit-transform: translateX(-6px) rotate(-1.2deg);
      transform: translateX(-6px) rotate(-1.2deg);
    }
  }
`;

class VideoBar extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  // Video banner
  render() {
    return (
      <InfoBar>
        <VideoBarText>
          <FormattedMessage id="home.slogan" />
        </VideoBarText>
        <VideoModal channel="youtube" isOpen={this.state.isOpen} videoId="XEcELW3hkuQ" onClose={() => this.setState({ isOpen: false })} />
        <ButtonWrapper height="50px" onClick={this.openModal} color="#0bb761">
          <FormattedMessage id="home.watch-promo" />
        </ButtonWrapper>
      </InfoBar>
    );
  }
}

export default VideoBar;
