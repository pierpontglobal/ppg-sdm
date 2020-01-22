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

const YoutubeHolder = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25;
  height: 0;
`;

export function PlaceBidVideo() {
  return (
    <YoutubeHolder>
      <iframe
        title="Place a bid | Pierpont Global"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        src="https://www.youtube.com/embed/92VxQ8EbZ14"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </YoutubeHolder>
  );
}

export function PlaceBidTutorial() {
  return (
    <div>
      <p>
        <FormattedMessage id="support.basics.place-bid.navigate-to-the" />
        <Button>
          <Link to="/marketplace">
            <FormattedMessage id="support.basics.place-bid.marketplace-page" />
          </Link>
        </Button>
        <FormattedMessage id="support.basics.place-bid.text-1" />
      </p>
      <br />
      <p>
        <FormattedMessage id="support.basics.place-bid.text-2" />
        {' '}
        <b>
          <FormattedMessage id="support.basics.place-bid.bid" />
        </b>
        <FormattedMessage id="support.basics.place-bid.text-3" />
      </p>
    </div>
  );
}

export default PlaceBidTutorial;
