import React from 'react';
import { CardElement } from 'react-stripe-elements';
import { FormattedMessage } from 'react-intl';

function CardSection() {
  return (
    <label style={{ width: '100%' }}>
      <h4>
        <FormattedMessage id="card-section.card-details" />
      </h4>
      <p>
        <FormattedMessage id="card-section.card-details-text" />
      </p>

      {/* <div style={{ marginBottom: '20px' }}>
        <p style={{
          fontSize: '18px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          justifyItems: 'flex-start',
          alignContent: 'center',
          alignItems: 'center',
        }}
        >
          <label style={{ margin: '0 10px 0 0' }} onClick={() => { console.log('clicked'); }} className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider round" />
          </label>
        Use your address as billing address
        </p>
      </div> */}

      <CardElement style={{ base: { fontSize: '14px' } }} />
    </label>
  );
}

export default CardSection;
