import React from 'react';

const style = {
  fontSize: '24px',
  fontWeight: 200,
  color: 'rgb(58, 62, 67)',
  width: '100%',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'overline',
  },
};

const styleIcon = {
  fontSize: '24px',
  fontWeight: 700,
  color: 'rgb(58, 62, 67)',
};

function Tab({ icon, children, href }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <a
        href={href}
        style={style}
      >
        <i
          style={styleIcon}
          className={icon}
        />
        {' '}
        {children}
      </a>
    </div>
  );
}

export default Tab;
