import React, { Component } from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';
import PPGModal from '../ppg-modal/PPGModal';

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FrameWrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 99999;
`;

class IframeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  iframeHasLoaded = () => {
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const {
      src, width, height, open, handleClose,
    } = this.props;
    const { isLoading } = this.state;

    return (
      <PPGModal
        setOpen={open}
        handleClose={handleClose}
        width={width}
        height={height}
        setPadding={false}
        onBackAction={handleClose}
      >
        {
          (isLoading)
            ? (
              <LoadingWrapper>
                <CircularProgress />
              </LoadingWrapper>
            ) : null
        }
        <FrameWrapper>
          <iframe title="Autocheck modal" onLoad={this.iframeHasLoaded} src={src} width="100%" height={(isLoading) ? '0%' : '100%'} />
        </FrameWrapper>
      </PPGModal>
    );
  }
}

export default IframeModal;
