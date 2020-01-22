import React from 'react';
import styled from 'styled-components';
import { WhiteLayer } from '../SignInPage/SignInPage.styles';
import { Icon } from 'antd';

export const WhiteLayerCentered = styled(WhiteLayer)`
  display: flex;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  flex-direction: column;
`;

export const IconBig = styled(Icon)`
  font-size: 80px;
`;

export const H4 = styled.h4`
  margin-top: 40px;
  text-align: center;
`;
