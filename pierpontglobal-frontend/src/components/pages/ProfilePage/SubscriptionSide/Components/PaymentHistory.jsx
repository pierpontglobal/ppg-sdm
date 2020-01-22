import React from 'react';
import PropTypes from 'prop-types';
import PaySubscription from './PaySubscription';
import './styles.css';

class PaymentHistory extends React.Component {
  constructor(props) {
    super(props);

    const { paymentsHistory, pendingInvoices } = this.props;

    this.state = {
      paymentsHistory,
      pendingInvoices,
    };
  }

  render() {
    const historicRows = [];
    const { paymentsHistory, pendingInvoices } = this.state;
    if (pendingInvoices) {
      for (let i = 0; i < pendingInvoices.length; i += 1) {
        const pendingInvoice = pendingInvoices[i];
        historicRows.push(
          <tr key={i} style={{ backgroundColor: '#FFEDCC', color: '#000000' }}>
            <td>
              {'$ '}
              {(pendingInvoice.amount_due / 100).toFixed(2)}
            </td>
            <td>{ pendingInvoice.descriptor }</td>
            <td>{ pendingInvoice.status }</td>
            <td>{ pendingInvoice.id }</td>
            <td><PaySubscription token={this.props.token} invoiceId={pendingInvoice.id} status={pendingInvoice.status} amount={`$ ${(pendingInvoice.amount_due / 100).toFixed(2)}`} /></td>
          </tr>,
        );
      }
    }
    if (paymentsHistory) {
      for (let i = 0; i < paymentsHistory.length; i += 1) {
        const paymentHistory = paymentsHistory[i];
        historicRows.push(
          <tr key={(pendingInvoices.length + i)}>
            <td style={{ padding: '10px' }}>
              {'$ '}
              {(paymentHistory.amount / 100).toFixed(2)}
            </td>
            <td>{ paymentHistory.descriptor }</td>
            <td>{ paymentHistory.status }</td>
            <td>{ paymentHistory.id }</td>
            <td>
              <i
                style={{
                  color: 'rgb(59, 68, 75)',
                  fontSize: '16px',
                  margin: '5px',
                  cursor: 'pointer',
                }}
                className="fas fa-file-invoice-dollar"
              />
              <i
                style={{
                  color: 'rgb(59, 68, 75)',
                  fontSize: '16px',
                  margin: '5px',
                  cursor: 'pointer',
                }}
                className="fas fa-receipt"
              />
            </td>
          </tr>,
        );
      }
    }

    return (
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%' }}>
          <thead style={{ height: '80px' }}>
            <tr style={{ height: '40px', padding: '10px' }}>
              <th>Amount</th>
              <th>Description</th>
              <th>Status</th>
              <th>Transaction number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ padding: '10px' }}>
            { historicRows }
          </tbody>
        </table>
      </div>
    );
  }
}

PaymentHistory.propTypes = {
  paymentsHistory: PropTypes.array.isRequired,
  pendingInvoices: PropTypes.array.isRequired,
};

export default PaymentHistory;
