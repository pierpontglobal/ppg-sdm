import styled from 'styled-components';
import { fontProps, containerProps } from '../Properties/Properties';

const InfoBar = styled.div`
    ${fontProps}
    ${containerProps}
    {
        color: white;
        background: #3e78c0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        flex-direction: column;
    }

    @media only screen and (min-width: 600px) {
        flex-direction: row;
    }
`;

export default InfoBar;
