import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

class PriceTag extends React.Component {
  constructor(props) {
    super(props);

    const {
      price,
      className,
      requestFunction,
      vin,
      color,
      fontSizeButton,
    } = this.props;

    this.state = {
      price,
      className,
      requestFunction,
      color: color || '#000000',
      fontSizeButton: fontSizeButton || '12px',
      vin,
      requesting: false,
    };

    this.request = this.request.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.price !== this.state.price) {
      this.setState({ price: nextProps.price });
    }

    if (nextProps.requestFunction !== this.state.requestFunction) {
      this.setState({ requestFunction: nextProps.requestFunction });
    }

    if (nextProps.vin !== this.state.vin) {
      this.setState({ vin: nextProps.vin, requesting: false, price: nextProps.price });
    }
  }

  request() {
    const {
      requestFunction, vin,
    } = this.state;
    this.setState({ requesting: true });
    requestFunction(vin);
  }

  render() {
    const {
      price, className, requesting, vin, color, fontSizeButton,
    } = this.state;

    this.requestPriceLb = this.props.intl.formatMessage({ id: 'label.request-price' });

    if (price) {
      return (
        <p
          style={{
            marginBottom: 0,
            fontSize: '20px',
            color,
          }}
          className={className}
        >
          {' '}
          {price === 'null' ? 'Not available' : `$ ${numberWithCommas(price.toFixed(2))}`}
        </p>
      );
    }
    if (requesting) {
      return (
        <div style={{
          width: '120px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          justifyItems: 'center',
          color,
        }}
        >
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: '100%' }} />
          </div>
          <p style={{ fontSize: '9px', textAlign: 'center', color }}>
            <FormattedMessage id="label.allow-up-retrieve-price" values={{ seconds: 10 }} />
          </p>
        </div>
      );
    }
    return (<button style={{ fontSize: fontSizeButton, fontWeight: '200' }} type="button" data-vin={vin} className="border-0 btn btn-info" onClick={this.request}>{this.requestPriceLb}</button>);
  }
}

export default injectIntl(PriceTag);
