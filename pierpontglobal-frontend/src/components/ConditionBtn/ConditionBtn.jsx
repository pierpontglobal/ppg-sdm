import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const ConditionLabel = styled.div`
  width: 100%;
  border-radius: 4px 0px 0px 4px;
  background-color: #eeeeee;
  overflow: hidden;
  box-shadow: none;
  color: #000000;
  opacity: 1.0;
  font-size: 0.65em;
  font-weight: normal;
  line-height: 1.31;
  -webkit-letter-spacing: normal;
  -moz-letter-spacing: normal;
  -ms-letter-spacing: normal;
  letter-spacing: normal;
  text-align: center !important;
  padding: 8px;
`;

const ConditionScore = styled.div`
  text-align: center;
  border-radius: 0px 4px 4px 0px;
  background-color: ${props => `rgb(${props.hexColor})`};
  font-size: 0.65em;
  font-weight: bold;
  line-height: 1.33;
  color: #ffffff;
  padding: 8px;
`;
const ConditionBtnWrapper = styled.div`
  display: grid;
  grid-template-columns: 65% 35%;
  @media only screen and (max-width: 600px) {
    margin: 8px;
    width: 100%;
    grid-template-columns: 75% 25%;
  }
`;

function pickHex(color1, color2, color3, weight) {
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

function ConditionBtn({ score }) {
  const hexColor = pickHex([24, 183, 11], [255, 167, 0], [255, 0, 0], score).join();
  return (
    <ConditionBtnWrapper>
      <ConditionLabel>
        <FormattedMessage id="label.condition" />
      </ConditionLabel>
      <ConditionScore score={score} hexColor={hexColor}>{score}</ConditionScore>
    </ConditionBtnWrapper>
  );
}

export default ConditionBtn;
