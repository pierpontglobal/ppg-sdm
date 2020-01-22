import React from 'react';
import Button from '../styles/Button/Button';

function Btn({
  onClick,
  children,
  color,
  hoverColor,
  className = '',
  maxWidth = 'none',
  width = 'auto',
  height = '60px',
  marginTop = '0px',
  marginBottom = '0px',
  type = 'button',
  cypressId,
}) {
  return (
    <Button
      type={type}
      style={{
        width, height, marginTop, marginBottom,
      }}
      className={`border-0 ${className}`}
      maxWidth={maxWidth}
      borderRadius="4px"
      backgroundColor={color}
      fontSize="1em"
      fontWeight={600}
      lineHeight={1.31}
      fontColor="#ffffff"
      hoverColor={hoverColor}
      onClick={onClick}
      data-cy={cypressId}
    >
      {children}
    </Button>
  );
}

export default Btn;
