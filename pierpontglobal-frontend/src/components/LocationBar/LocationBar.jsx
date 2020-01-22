import React from 'react';
import styled from 'styled-components';
import Text from '../styles/Text/Text';
import TransportDetailsModal from '../pages/CarBidPage/TransportDetailsModal';

const LocationBarWrapper = styled.div`
  display: flex;
  padding: 8px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const TransportWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LocationWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  };
`;

const TransportWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TransportTitleModal = styled.div`
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const LocationIconWrapp = styled.div`
  margin-right: 8px;
  width: auto;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;


function LocationBar({ currentLocation, to }) {
  return (
    <LocationBarWrapper>
      <Text
        className="mb-0"
        fontSize="1em"
        lineHeight="none"
      >
        <LocationWrap>
          <LocationIconWrapp>
            <i className="fas fa-map-marker-alt mr-md-2" style={{ color: '#3e78c0', fontSize: '20px' }} />
            <span style={{ fontWeight: '600' }}>Location:</span>
          </LocationIconWrapp>
          <div>{currentLocation}</div>
        </LocationWrap>
      </Text>
      <TransportWrapper>
        <TransportWrap>
          <TransportTitleModal>
            <div style={{ minWidth: '140px' }}>
              <span style={{ fontWeight: 600 }}>Ground transport</span>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
              <span style={{ color: '#3e78c0' }}>
                <TransportDetailsModal />
              </span>
            </div>
          </TransportTitleModal>
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '8px',
          }}
          >
            <span style={{ fontSize: '0.75em', fontStyle: 'italic' }}>
              {to}
            </span>
          </div>
        </TransportWrap>
      </TransportWrapper>
    </LocationBarWrapper>
  );
}

export default LocationBar;
