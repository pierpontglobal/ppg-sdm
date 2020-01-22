import React from 'react';

function BurgerBtn({ onClick }) {
  return (
    <i
      className="fas fa-bars img-fluid align-self-center d-md-none"
      onClick={onClick}
      style={{
        color: '#212529',
        fontSize: '1.7em',
        opacity: 0.85,
        margin: '4px 16px',
      }}
    />
  );
}

export default BurgerBtn;
