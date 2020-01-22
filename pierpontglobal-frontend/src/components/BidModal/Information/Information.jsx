import React from 'react';
import Text from '../../styles/Text/Text';

function Information({
  label, text, fontSize, fontWeight, lineHeight, className = '', ref,
}) {
  return (
    <Text
      className={`d-flex justify-content-between ${className}`}
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
      ref={ref}
    >
      <span>{label}</span>
      <span>{text}</span>
    </Text>
  );
}

export default Information;
