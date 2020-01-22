import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import { Form } from 'semantic-ui-react';
import { ApiServer } from '../../../../../../Defaults';
import './styles.css';
import CardSection from './CardSection';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 'none',
    };
    this.registerCard = this.registerCard.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async registerCard(token) {
    await axios.post(`${ApiServer}/api/v1/user/cards`, {
      card_token: token,
      coupon: this.props.couponField ? this.props.couponField() : null,
    });
  }

  async handleSubmit(ev, afterSubmit) {
    ev.preventDefault();

    const response = (await axios.get(`${ApiServer}/api/v1/user`)).data;
    const name = `${response.first_name} ${response.last_name}`;

    this.props.stripe.createToken({ name }).then(({ token }) => {
      try {
        this.registerCard(token.id).then(() => {
          afterSubmit();
          this.setState({
            display: 'none',
          });
          window.location.reload(true);
        });
        this.props.onClose();
      } catch (e) {
        console.log(e);
      }
    });
  }

  render() {
    const {
      saveButtonText, afterSubmit, innerFields, handleSubmit = this.handleSubmit,
    } = this.props;
    const { display } = this.state;

    return (
      <Form
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
        onSubmit={ev => (handleSubmit(ev, afterSubmit))}
      >
        {innerFields}
        <CardSection />
        <button
          type="submit"
          className="border-0 shadow"
          style={{
            marginTop: '20px',
            backgroundColor: '#10b364',
            color: '#ffffff',
            borderRadius: '5px',
            padding: '10px 30px',
            cursor: 'pointer',
            marginBottom: '20px',
          }}
          onClick={() => {
            this.setState({
              display: 'inline-block',
            });
          }}
        >
          {saveButtonText}
          {' '}
          <i style={{ float: 'rigth', fontSize: '14px', display }} className="fas fa-spinner loading" />
        </button>
      </Form>
    );
  }
}

export default injectStripe(CheckoutForm);
