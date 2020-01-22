import React from 'react';
import Text from '../../styles/Text/Text';

function TimeTag({ time, className }) {
  return (
    <Text
      fontSize="0.75em"
      fontWeight={600}
      lineHeight={1.33}
      className={className}
      fontColor="#0bb761"
    >
      {time}
    </Text>
  );
}

export default TimeTag;
