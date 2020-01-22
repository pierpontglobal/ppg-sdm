import styled, { css } from 'styled-components';
import { fontProps, containerProps } from '../Properties/Properties';

const Button = styled.button`
    ${fontProps}
    ${containerProps}
    &:hover {
        cursor: pointer;
        ${props => props.hoverColor
            && css`
                background-color: ${props.hoverColor} !important;
            `}
    }
`;

export default Button;
