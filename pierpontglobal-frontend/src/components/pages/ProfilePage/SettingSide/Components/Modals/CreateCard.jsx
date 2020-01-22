import React from 'react';
import Modal from 'react-responsive-modal';
import InjectedCheckoutForm from './CheckoutForm';
import { injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import { ApiServer } from '../../../../../../Defaults';
import styled from 'styled-components';

const ActionButtonText = styled.span`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ModalContent = styled.div`
  max-height: calc(100vh - 320px);
  overflow-y: scroll;
`;

class CreateCard extends React.Component {

  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    state = {
        open: false,
    };
    
    onOpenModal = () => {
        this.setState({ open: true });
    };
    
    onCloseModal = () => {
        this.setState({ open: false });
    };

    async registerCard(token) {
      await axios.post(`${ApiServer}/api/v1/user/cards/append`, {
        card_token: token
      });
    }

    async handleSubmit(ev, afterSubmit) {
      ev.preventDefault();
  
      const response = (await axios.get(`${ApiServer}/api/v1/user`)).data;
      const name = `${response.first_name} ${response.last_name}`;
  
      this.props.stripe.createToken({ name }).then(({ token }) => {
        try {
          this.registerCard(token.id).then(() => {
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
    const { open } = this.state;
    return (
      <div>
        <button
          style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            borderRadius: '5px',
            padding: '10px 15px',
            cursor: 'pointer',
            fontSize: '12px',
          }} 
          onClick={this.onOpenModal}
          className="border-0 button_white">
            <i style={{fontSize: '12px',color: '#000000'}} className="fas fa-plus"/>
            {' '} <ActionButtonText>Add payment method</ActionButtonText>
        </button>
        <Modal style={{}} open={open} onClose={this.onCloseModal} center>
        <div style={{
            fontWeight: '200',
        }}>
        <div style={{ marginTop: '24px' }}>
          <h2>Add your payment method details</h2>
        </div>
        <hr/>
        <ModalContent>
          <InjectedCheckoutForm handleSubmit={this.handleSubmit} saveButtonText={'SAVE CARD'} cookies={this.props.cookies} onClose={this.onCloseModal} />
          <hr/>
          <h4>Bank transfer</h4>
          <p>At the moment Pierpont Global do not accept bank transfers through our electronic system, contact support.</p>
          <hr/>
          <h4>PayPal</h4>
          <p>At the moment Pierpont Global do no t accept payments from PayPal.</p>
        </ModalContent>
        </div>
        </Modal>
      </div>
    );
  }
}

export default injectStripe(CreateCard);