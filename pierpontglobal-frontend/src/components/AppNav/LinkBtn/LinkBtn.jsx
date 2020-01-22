import React from 'react';

const linkStyle = {
  fontWeight: 600,
  opacity: 0.54,
  color: '#000000',
  lineHeight: 1.31,
  textDecoration: 'none',
};

function LinkBtn({
  children, className = '', href = '#',
}) {
  return (
    <a
      className={className}
      style={linkStyle}
      href={href}
    >
      {children}
    </a>
  );
}

export default LinkBtn;
