import React from 'react';
import Button from '../../styles/Button/Button';

function ColorBtn({ color }) {
  return (
    <Button
      className="ml-1 align-self-center pt-3 border-0"
      width="16px"
      borderRadius="50%"
      backgroundColor={color}
      boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.3)"
    />
  );
}

export default ColorBtn;
