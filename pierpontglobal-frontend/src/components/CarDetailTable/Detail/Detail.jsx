import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import Span from '../../styles/Span/Span';

const Container = styled.div`
  height: 28px;
  font-size: 0.875em;
  line-height: 2;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${props => (props.stripe ? '#f2f2f2' : 'ffffff')};
`;

const DetailValue = styled.div`
  text-align: left;
  margin-left: 8px;
  overflow: hidden;
  @media only screen and (min-width: 768px) {
    margin-left: 2px;
  }
`;

function Detail({ stripe, title, text }) {
  return (
    <Container
      stripe={stripe}
    >
      <Span fontWeight={600}>
        {_.upperFirst(title)}
        { ':' }
      </Span>
      <DetailValue>
        {text}
      </DetailValue>
    </Container>
  );
}

export default Detail;
