import React from 'react';

function Underline({ children, className }) {
  return (
    <div
      className={`d-flex px-3 py-3 border-bottom ${className || ''}`}
    >
      {children}
    </div>
  );
}

export default Underline;
