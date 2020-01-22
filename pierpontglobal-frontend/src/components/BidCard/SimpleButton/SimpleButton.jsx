import React from 'react';
import PropTypes from 'prop-types';
// import { Test } from './SimpleButton.styles';

const SimpleButton = ({
  text, iconClass, disabled, callBack, disabledText,
}) => (
  <div className="SimpleButtonWrapper">
    <button
      type="button"
      data-disabled-text={disabledText}
      style={{
        backgroundColor: '#ffffff',
        color: '#000000',
        borderRadius: '5px',
        marginBottom: '7px',
        padding: '10px 15px',
        cursor: 'pointer',
        fontSize: '12px',
        width: '100%',
      }}
      disabled={disabled}
      onClick={callBack}
      className="border-0 shadow button_white"
    >
      <i style={{ fontSize: '12px', color: '#000000' }} className={iconClass} />
      {' '}
      {text}
    </button>
  </div>
);

SimpleButton.propTypes = {
  text: PropTypes.string,
  disabledText: PropTypes.string,
  disabled: PropTypes.bool,
  callBack: PropTypes.func,
  iconClass: PropTypes.string,
};

SimpleButton.defaultProps = {
  iconClass: 'fas fa-question-circle',
  text: 'Button',
  disabledText: 'Not specified',
  disabled: false,
  callBack: () => { console.log('Add an action'); },
};

export default SimpleButton;
