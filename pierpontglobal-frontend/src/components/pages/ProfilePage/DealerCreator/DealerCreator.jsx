import React from 'react';
import './styles.css';
import { Form } from 'semantic-ui-react';
import axios from 'axios';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { TextField, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { AsYouType } from 'libphonenumber-js';
import { Button } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import { withStyles } from '@material-ui/core/styles';
import { withCookies } from 'react-cookie';
import { ApiServer, StripeKey } from '../../../../Defaults';
import InjectedCheckoutForm from '../SettingSide/Components/Modals/CheckoutForm';
import SubscriptionCard from '../SubscriptionSide/Components/SubscriptionCard';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';

function printNumber(e) {
  e.target.value = new AsYouType('US').input(e.target.value);
}

const ButtonTheme = createMuiTheme({
  palette: {
    primary: { main: '#81B29A' },
    secondary: { main: '#E07A5F' },
  },
  typography: { useNextVariants: true },
});

const styles = theme => ({
  LogoutButtonIcon: {
    transform: 'rotate(180deg)',
  },
});

class DealerCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      amountToPay: '$ 495.00 USD',
      couponLoading: false,
      hasDealer: false,
      name: '',
      phoneNumber: '',
      coupon: '',
    };
    this.register = this.register.bind(this);
    this.verifyCoupon = this.verifyCoupon.bind(this);
    this.getCouponCode = this.getCouponCode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { hasDealer } = this.state;
    if (hasDealer !== newProps.hasDealer) {
      this.setState({
        hasDealer: newProps.hasDealer,
      });
    }
  }

  getCouponCode() {
    return this.state.coupon;
  }

  async register() {
    this.setState({
      loading: true,
    });
    const { name, phoneNumber } = this.state;
    const data = {
      name,
      phone_number: phoneNumber,
    };
    await axios.post(`${ApiServer}/api/v1/user/dealers`, data);
  }

  async verifyCoupon(couponRequested) {
    this.setState({
      couponLoading: false,
    });
    this.setState({
      couponLoading: true,
    });
    try {
      const response = (await axios.get(`${ApiServer}/api/v1/user/cards/coupon?coupon=${couponRequested}`));
      const coupon = response.data;
      const afterCouponTotal = `$ ${(495 - (coupon.amount_off / 100)).toFixed(2)} USD`;
      this.priceBreackDownHolder.innerHTML = ` <span style="text-decoration: none; color: black;">now</span> <span style="text-decoration: underline; color: #2db742">${afterCouponTotal}</span>`;
      this.setState({ amountToPay: afterCouponTotal });
    } catch (e) {
      this.priceBreackDownHolder.innerHTML = '<span style="color: #2db742">$ 495.00 USD</span>';
      this.setState({ amountToPay: '$ 495.00 USD' });
    }
    this.setState({
      couponLoading: false,
    });
  }

  async handleChange(key, node) {
    if (key === 'phoneNumber') {
      printNumber(node);
    }
    const { value } = node.target;
    this.setState({
      [key]: value,
    });
    if (key === 'coupon') {
      this.verifyCoupon(value);
    }
  }

  async signOut() {
    await axios.post(`${ApiServer}/api/v1/user/invalidate`, {
      one_signal_uuid: this.props.cookies.get('one_signal_uuid'),
    });
    this.props.cookies.remove('token', { path: '/' });
    this.props.history.push('/');
  }

  gotToMarketplace = () => {
    this.props.history.push('/marketplace');
  }

  render() {
    const subscriptionStartDate = new Date();
    const subscriptionEndYear = subscriptionStartDate.getFullYear() + 1;
    const subscriptionEndDate = new Date(
      subscriptionEndYear,
      subscriptionStartDate.getMonth(),
      subscriptionStartDate.getDate(),
    );

    const {
      couponLoading, amountToPay, hasDealer, name, phoneNumber, coupon,
    } = this.state;

    const { classes, intl } = this.props;

    const labels = {
      logout: intl.formatMessage({ id: 'dealer-creator.logout' }),
      market: intl.formatMessage({ id: 'dealer-creator.market' }),
      registerInfo: intl.formatMessage({ id: 'dealer-creator.register-info' }),
      dealerName: intl.formatMessage({ id: 'dealer-creator.dealer-name' }),
      dealerPhone: intl.formatMessage({ id: 'dealer-creator.dealer-phone' }),
      subscriptionDetail: intl.formatMessage({ id: 'dealer-creator.subscription-detail' }),
      subscriptionText: intl.formatMessage({ id: 'dealer-creator.subscription-text' }),
      saveButtonText: intl.formatMessage({ id: 'dealer-creator.save-button-text'}, { amount: amountToPay }),
      addCouponIfAny: intl.formatMessage({ id: 'dealer-creator.add-coupon-if-any' }),
    };

    return (
      <div style={{
        overflow: 'auto',
        display: this.props.show ? 'flex' : 'none',
        position: 'fixed',
        zIndex: 1010,
        width: '100%',
        height: '100%',
        margin: 'auto',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
        background: 'rgba(0,0,0,0.4)',
      }}
      >
        <div className="shadow form-container">
          <StripeProvider apiKey={StripeKey}>
            <Elements>
              <InjectedCheckoutForm
                innerFields={(
                  <div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignContent: 'space-between',
                      alignItems: 'center',
                      justifyItems: 'center',
                    }}
                    >
                      <MuiThemeProvider theme={ButtonTheme}>
                        <Button onClick={this.signOut} style={{ margin: '10px' }} color="secondary">
                          <ExitToApp className={classes.LogoutButtonIcon} />
                          {labels.logout}
                        </Button>
                        <Button onClick={this.gotToMarketplace} style={{ margin: '10px' }} color="primary">
                          {labels.market}
                          <ArrowForwardIos />
                        </Button>
                      </MuiThemeProvider>
                    </div>
                    <h4>{labels.registerInfo}</h4>
                    <div style={{ display: hasDealer ? 'none' : 'flex' }} className="section-2">
                      <Form.Field className="popup-form">
                        <TextField
                          label={labels.dealerName}
                          autoComplete="off"
                          type="text"
                          value={name}
                          required={!hasDealer}
                          style={{
                            width: '100%',
                            marginBottom: '5px',
                          }}
                          onChange={(node) => { this.handleChange('name', node); }}
                        />
                      </Form.Field>
                      <Form.Field className="popup-form">
                        <TextField
                          label={labels.dealerPhone}
                          autoComplete="off"
                          type="tel"
                          value={phoneNumber}
                          required={!hasDealer}
                          style={{
                            width: '100%',
                            marginBottom: '5px',
                          }}
                          onChange={(node) => { this.handleChange('phoneNumber', node); }}
                        />
                      </Form.Field>
                    </div>
                    <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                      <h4>{labels.subscriptionDetail}</h4>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                      }}
                      >
                        <SubscriptionCard planName="PierpontGlobal USA Access" endDate={subscriptionEndDate.toDateString()} />
                      </div>
                      <p style={{ textAlign: 'center' }}>
                        {labels.subscriptionText}
                        {' '}
                        <span
                          ref={(node) => { this.priceBreackDownHolder = node; }}
                          style={{ fontWeight: 900, color: '#2db742' }}
                        >
                          <span
                            id="total_to_pay"
                            ref={(node) => { this.totalAmount = node; }}
                          >
                          $ 495.00 USD
                          </span>
                        </span>
                        .
                      </p>
                      <Form.Field style={{ position: 'relative' }}>
                        <TextField
                          label={labels.addCouponIfAny}
                          autoComplete="off"
                          value={coupon}
                          style={{
                            width: '100%',
                            marginBottom: '10px',
                          }}
                          onChange={(node) => { this.handleChange('coupon', node); }}
                        />
                        <i
                          style={{
                            color: 'rgb(59, 68, 75)',
                            position: 'absolute',
                            right: '10px',
                            bottom: '4.5px',
                            display: couponLoading ? 'block' : 'none',
                          }}
                          className="fas fa-spinner loading"
                        />
                      </Form.Field>
                    </div>
                  </div>
                  )}
                  afterSubmit={() => (!hasDealer) ? this.register() : null }
                  couponField={this.getCouponCode}
                  saveButtonText={labels.saveButtonText}
                />
            </Elements>
          </StripeProvider>
        </div>
      </div>
    );
  }
}

export default withCookies(withStyles(styles)(withRouter(injectIntl(DealerCreator))));
