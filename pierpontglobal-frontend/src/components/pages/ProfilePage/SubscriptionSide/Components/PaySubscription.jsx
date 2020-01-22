import React from 'react';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import { ApiServer } from '../../../../../Defaults';
import './styles.css';

class PaySubscription extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            token: this.props.token,
            loading: false
        };
        this.sendPayment = this.sendPayment.bind(this);
    }

    async sendPayment(){
        const { token } = this.state;

        this.setState({
            loading: true,
        })

        const config = {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post(`${ApiServer}/api/v1/user/subscriptions/payment`, {invoice_id: this.props.invoiceId}, config)
        console.log(response);
        this.setState({
            loading: false,
        })
        window.document.location.reload()
    }
    
    onOpenModal = () => {
        this.setState({ open: true });
    };
    
    onCloseModal = () => {
        this.setState({ open: false });
    };

  render() {
    const { open } = this.state;
    return (
      <div>
        <button 
        className="border-0 shadow"
        style={{
              backgroundColor: '#ffffff',
              color: '#000000',
              borderRadius: '5px',
              padding: '10px 15px',
              cursor: 'pointer',
              fontSize: '12px',
              margin: '10px',
            }} onClick={this.onOpenModal}>
            <i style={{fontSize: '12px',color: '#000000',}} className="fas fa-plus"/>
            {' '}Pay invoice
        </button>
        <Modal style={{}} open={open} onClose={this.onCloseModal} center>
        <div style={{
            width: '500px',
            fontWeight: '200',
        }}>
        <h2>Confirm payment</h2>
        <hr/>
        <h5>Description: <span style={{fontWeight: 200}}>Subscription payment for "Pierpont Global USA Access"</span></h5>
        <h5>Invoice id: <span style={{fontWeight: 200}}>{this.props.invoiceId}</span></h5>
        <h5>Invoice status: <span style={{fontWeight: 200}}>{this.props.status}</span></h5>
        <h5>Amount <span style={{fontWeight: 200}}>{this.props.amount}</span></h5>
        <button onClick={this.sendPayment} style={{float: "right"}} className="btn btn-success shadow">
        MAKE PAYMENT
        <i
            style={{
              marginLeft: '5px',
              fontSize: '16px',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              justifyItems: 'center',
              display: this.state.loading ? 'flex' : 'none',
            }}
            className="loading fas fa-spinner"
          /></button>
        </div>
        </Modal>
      </div>
    );
  }
}

export default PaySubscription;