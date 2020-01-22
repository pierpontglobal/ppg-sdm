import styled, {css} from 'styled-components';
import {containerProps} from '../Properties/Properties';

const Icon = styled.i`
    ${containerProps}
    ${props => props.color && css`color: ${props.color};`}
    ${props => props.size && css`font-size: ${props.size};`}
`;

export default Icon;