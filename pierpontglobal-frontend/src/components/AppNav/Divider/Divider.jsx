import React from 'react';

function Divider({ className }) {
  return (
    <div>
      <div
        style={{
          width: '0',
          height: '2em',
          borderLeft: 'solid 1px #707070',
        }}
      />
    </div>
  );
}

export default Divider;
