import React from 'react';
import { Card } from 'semantic-ui-react';
import '../styles.css';

function CardComponent({
  cardInfo,
  renewable = false,
  onChangeRenew,
  loading = false,
}) {
  let brand = null;
  switch (cardInfo.brand) {
    case 'Visa':
      brand = <i className="fab fa-cc-visa" />;
      break;
    case 'American Express':
      brand = <i className="fab fa-cc-amex" />;
      break;
    case 'Diners Club':
      brand = <i className="fab fa-cc-diners-club" />;
      break;
    case 'Discover':
      brand = <i className="fab fa-cc-discover" />;
      break;
    case 'JCB':
      brand = <i className="fab fa-cc-jcb" />;
      break;
    case 'MasterCard':
      brand = <i className="fab fa-cc-mastercard" />;
      break;
    default:
      brand = <i className="far fa-question-circle" />;
      break;
  }

  const handleRenew = (e) => {
    onChangeRenew(e.target.checked);
  };

  const view = (
    <Card className="shadow" style={{ color: 'white', backgroundColor: 'rgb(59, 68, 75)', width: '300px' }}>
      <div className="card-holder">
        {brand}
        <p>
            Card number:
          {' '}
          <span className="letters" style={{ fontWeight: '200' }}>
                XXXX-XXXX-XXXX-
            {cardInfo.last4}
          </span>
        </p>
        <p>
            Card number:
          {' '}
          <span className="letters" style={{ fontWeight: '200' }}>
            {cardInfo.exp_month}
            /
            {cardInfo.exp_year}
          </span>
        </p>

        <div style={{
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          marginBottom: '10px',
        }}
        >
          <div style={{ margin: '0 10px 0 0' }} className="onoffswitch">
            <input onChange={handleRenew} type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" defaultChecked={renewable} />
            <label style={{ margin: 0 }} className="onoffswitch-label" htmlFor="myonoffswitch">
              <span className="onoffswitch-inner" />
              <span className="onoffswitch-switch" />
            </label>
          </div>
          {' '}
              Auto renew subscription
          {' '}
          <i
            style={{
              marginLeft: '5px',
              fontSize: '16px',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
              display: loading ? 'flex' : 'none',
            }}
            className="loading fas fa-spinner"
          />
        </div>

        <button style={{ backgroundColor: '#3a7abf' }} className="save-information-btn">Billing address</button>
      </div>
    </Card>
  );
  return view;
}

export default CardComponent;
