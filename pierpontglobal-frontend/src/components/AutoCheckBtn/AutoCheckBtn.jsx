import React from 'react';
import './style.css';
import { FormattedMessage } from 'react-intl';

const style = {
  borderRadius: '4px',
  backgroundColor: '#3e78c0',
  fontSize: '0.95em',
  fontWeight: 'bold',
  lineHeight: 1.33,
  color: '#ffffff',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.18)',
  borderStyle: 'none',
  marginTop: '15%',
  padding: '8px',
};
function AutoCheckBtn({ crUrl, className }) {
  return (
    <button
      type="button"
      className={`AutoCheckBtn ${className && className}`}
      style={style}
      onClick={() => (window.open(crUrl, '', 'width=500,height=500'))}
    >
      <FormattedMessage id="label.autocheck" />
    </button>
  );
}

export default AutoCheckBtn;
