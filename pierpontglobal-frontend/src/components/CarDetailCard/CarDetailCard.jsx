import React from 'react';
import TimeAgo from 'react-timeago';
import styled from 'styled-components';
import ConditionBtn from '../ConditionBtn/ConditionBtn';
import ColorBtn from './ColorBtn/ColorBtn';
import Span from '../styles/Span/Span';

const Container = styled.div`
    background-color: #fafafa;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.18);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    width: 100%;
    padding: 8px;
`;

const CardTitle = styled.div`
  width: 100%;
  margin-bottom: 8px;
  text-align: left;
  padding-left: 8px;
  & > h4 {
    font-size: 1.45em;
    font-weight: 400;
    line-height: 1.34;
  }
`;

const ContentText = styled.div`
  font-size: 0.875em;
  line-height: 1.64;
  display: flex;
  justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
  align-items: center;
  padding: 8px;
  @media only screen and (min-width: 768) {
    justify-content: flex-start;
  }
`;

const ContentValue = styled.div`
  color: ${props => props.fontColor};
  font-size: "14px";
  font-weight: 600;
  line-height: 1.33;
  min-width: 160px;
  text-align: left;
  @media only screen and (min-width: 768) {
    margin-left: 8px;
  }
`;

const ConditionBtnWrapper = styled.div`
  overflow: visible;
  width: calc(100% - 120px);
  margin-top: 8px;
  margin-left: 8px;
`;

function pickHex(color1, color2, color3, weightRaw) {
  const weight = weightRaw > 5 ? 5 : weightRaw;
  if (weight === null) {
    return [169, 169, 169];
  } if (weight === 2.5) {
    return color2;
  } if (weight < 2.5) {
    const w1 = weight / 2.5;
    const w2 = 1 - w1;
    const rgb = [Math.round(color2[0] * w1 + color3[0] * w2),
    Math.round(color2[1] * w1 + color3[1] * w2),
    Math.round(color2[2] * w1 + color3[2] * w2)];
    return rgb;
  }
  const w1 = (weight - 2.5) / 2.5;
  const w2 = 1 - w1;
  const rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
  Math.round(color1[1] * w1 + color2[1] * w2),
  Math.round(color1[2] * w1 + color2[2] * w2)];
  return rgb;
}

function CarDetailCard({ car }) {
  const diference = Date.parse(car.saleDate) - new Date();
  const timeDiff = Math.abs(diference);
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return (
    <Container>
      <CardTitle>
        <h4>
          {car.title}
        </h4>
      </CardTitle>
      <ContentText>
        <Span fontWeight={600} style={{ marginRight: '8px' }}>Sale Date: </Span>
        <ContentValue
          style={{ marginBottom: '6px' }}
          fontColor={diference < 0 ? 'rgb(169,169,169)' : `rgb(${pickHex([24, 183, 11], [255, 167, 0], [255, 0, 0], diffDays)})`}
        >
          <TimeAgo date={car.saleDate} />
        </ContentValue>
      </ContentText>
      <ContentText>
        <Span fontWeight={600} style={{ marginRight: '8px' }}>VIN: </Span>
        <ContentValue>
          {car.vin}
        </ContentValue>
      </ContentText>
      <ContentText justify="flex-start" style={{ marginTop: '8px' }}>
        <Span
          style={{ width: '30%' }}
          className="d-flex"
          fontWeight={600}
        >
          Exterior:
          <ColorBtn color={car.exteriorColor} />
        </Span>
        <Span
          style={{ width: '30%' }}
          className="d-flex pr-4"
          fontWeight={600}
        >
          Interior:
          <ColorBtn color={car.interiorColor} />
        </Span>
      </ContentText>
      <ConditionBtnWrapper>
        {car.score ? <ConditionBtn score={car.score} /> : <ConditionBtn score={null} />}
      </ConditionBtnWrapper>
    </Container>
  );
}

export default CarDetailCard;
