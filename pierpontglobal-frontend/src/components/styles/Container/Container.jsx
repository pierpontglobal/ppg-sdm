import styled, { css } from 'styled-components';
import { containerProps, fontProps } from '../Properties/Properties';

const Container = styled.div`
    ${containerProps}
    ${fontProps}
    ${props => props.hoverCursor && css`
        :hover {
            cursor: ${props.hoverCursor};
        }
    `}
`;

export default Container;
