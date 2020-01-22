import React from 'react';
import Text from '../../styles/Text/Text';
import Span from '../../styles/Span/Span';

function Detail({ name, value, className = '' }) {
  return (
    <div className={className}>
      <Text
        className="mb-0"
        fontSize="0.870em"
        lineHeight={1.64}
      >
        <Span
          fontWeight="600"
          fontSize="0.875em"
          lineHeight={1.64}
        >
          {name}
          {name ? ':' : ''}
          &nbsp;
        </Span>
        {value}
      </Text>
    </div>
  );
}

export default Detail;
