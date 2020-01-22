import { css } from 'styled-components';

export const fontProps = props => css`
    color: ${props.fontColor || '#000000'};
    opacity: ${props.opacity || '1.0'};
    font-size: ${props.fontSize || '1em'};
    font-weight: ${props.fontWeight || 'normal'};
    line-height: ${props.lineHeight || 'normal'};
    letter-spacing: ${props.letterSpacing || 'normal'};
`;

export const placeholderProps = props => css`
    ::placeholder {
        ${props.placeholderColor && `color: ${props.placeholderColor};`}
        ${props.placeholderOpacity && `opacity: ${props.placeholderOpacity};`}
        ${props.placeholderFontSize && `font-size: ${props.placeholderFontSize};`}
        ${props.placeholderLineHeight && `line-height: ${props.placeholderColor};`}
    }
`;

export const containerProps = props => css`
    width: ${props.width || 'auto'};
    height: ${props.height || 'auto'};
    max-width: ${props.maxWidth || 'none'};
    max-height: ${props.maxHeight || 'none'};
    min-width: ${props.minWidth || 'none'};
    min-height: ${props.minHeight || 'none'};
    border-radius: ${props.borderRadius || '0'};
    background-color: ${props.backgroundColor || 'transparent'};
    overflow: ${props.overflow || 'hidden'};
    box-shadow: ${props.boxShadow || 'none'};
    ${props.backdropFilter
        && css`
            backdrop-filter: ${props.backdropFilter};
        `}
    ${props.webkitBackdropFilter
        && css`
            -webkit-backdrop-filter: ${props.webkitBackdropFilter};
        `}
`;
