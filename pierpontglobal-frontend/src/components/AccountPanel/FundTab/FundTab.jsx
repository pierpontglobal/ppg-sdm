import React from 'react';
import Span from '../../styles/Span/Span';
import { FormattedMessage } from 'react-intl';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function FundTab({ funds }) {
  return (
    <div className="d-flex justify-content-between px-3 pb-2">
      <Span
        opacity={0.87}
        fontSize="0.875em"
        fontWeight={600}
        lineHeight={1.43}
      >
        <FormattedMessage id="label.funds" />
      </Span>
      <Span
        className="d-flex"
        fontSize="0.875em"
        lineHeight={1.43}
      >
        <i
          style={{ color: '#3a7abf', fontSize: '14px' }}

          width="16.7px"
          height="16.7px"
          color="#3e78c0"
          className="fas fa-info-circle mr-1 align-self-end"
        />
        {`($) ${numberWithCommas(parseFloat(funds.remaining).toFixed(2))} / ${funds.total}`}
      </Span>
    </div>
  );
}

export default FundTab;
