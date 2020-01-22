import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ApiServer } from '../../../../../../Defaults';
import styled from 'styled-components';
import PPGModal from '../../../../../ppg-modal/PPGModal';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';

const ModalWrapper = styled.div`
  width: 90%;
  display: grid;
  grid-template-rows: ${props => props.gridRows};
  margin: 0 auto;
  background-color: white;
  @media only screen and (min-width: 748px) {
    width: 40%;
    height: 40%;
    position: absolute;
    top: 10%;
  }
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  display: flex;
  justify-content: space-between;
`;

const HeaderTitle = styled.h2`
  font-weight: 600;
  @media only screen and (max-width: 768px) {
    font-size: 0.98em;
  }
`;

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalFooter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  text-align: center;
`;

const DepositForm = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const TransactionButton = styled.button`
  background-color: #ffffff;
  color: #000000;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 12px;
  border: none;
  width: 100%;
  box-shadow: 0px 0px 3px 0px #ccc;
`;

const TransactionSuccessKeyValue = styled.div`
  margin-bottom: 8px;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  @media only screen and (max-width: 768px) {
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const Underline = styled.div`
  width: 100%;
  height: ${props => !props.height ? '100%' : props.height};
  background-color: #ccc;
`;

const AddDepositButtonWrapper = styled.div`
  @media only screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

class AddDeposit extends React.Component {
  constructor(props) {
    super(props);

    const { cookies, intl } = props;

    this.state = {
      open: false,
      status: 'normal',
      token: cookies.get('token', { path: '/' }),
      charge: {},
    };

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.sendDeposit = this.sendDeposit.bind(this);

    this.labels = {
      sending: intl.formatMessage({ id: 'deposit.sending' }),
      success: intl.formatMessage({ id: 'deposit.success' }),
      error: intl.formatMessage({ id: 'deposit.error' }),
      addDeposit: intl.formatMessage({ id: 'deposit.add-deposit' }),
      transactionFailed: intl.formatMessage({ id: 'deposit.transaction-failed' }),
      transactionFailedText: intl.formatMessage({ id: 'deposit.transaction-failed-text' }),
      transactionSuccess: intl.formatMessage({ id: 'deposit.transaction-success' }),
      visitTransactionTab: intl.formatMessage({ id: 'deposit.visit-transaction-tab' }),
      transactionNumber: intl.formatMessage({ id: 'deposit.transaction-number' }),
      userIdentifier: intl.formatMessage({ id: 'deposit.user-identifier' }),
      sourceId: intl.formatMessage({ id: 'deposit.source-id' }),
      date: intl.formatMessage({ id: 'deposit.date' }),
      transactions: intl.formatMessage({ id: 'deposit.transactions' }),
      performingTransactions: intl.formatMessage({ id: 'deposit.perfoming-transactions' }),
      depositAmount: intl.formatMessage({ id: 'deposit.deposit-amount' }),
      pleaseWait: intl.formatMessage({ id: 'deposit.please-wait' }),
      allowFundsDelay: intl.formatMessage({ id: 'deposit.allow-funds-delay-msg' }),
    };
  }

  onOpenModal() {
    this.setState({ status: 'normal', open: true });
  }

  onCloseModal() {
    this.setState({ open: false });
    if (this.state.status === 'success') {
      //window.location.reload();
    }
  }

  async sendDeposit(node) {
    node.target.disabled = true;
    node.target.style.backgroundColor = 'gray';
    node.target.classList.remove('green_button');

    this.setState({
      status: 'sending',
    });

    const config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };

    const data = { amount: parseFloat(this.amount.value) };
    let responseStatus = null;
    let responseData = null;
    try {
      const response = (await axios.post(`${ApiServer}/api/v1/user/funds`, data, config));
      responseStatus = response.status;
      responseData = response.data;
    } catch (e) {
      responseStatus = 400;
    }

    switch (responseStatus) {
      case 200:
        this.setState({
          status: 'success',
          charge: responseData,
        }, () => {
          // Propagate amount to parent
          this.props.onSuccess(responseData);
        });
        break;
      default:
        this.setState({
          status: 'error',
        });
        break;
    }
  }

  gotToTransactions = () => {
    this.props.history.push('/user/transactions');
  }

  render() {
    const { open, status, charge } = this.state;

    let title = this.labels.addDeposit;
    let content = null;
    let footer = '';
    let gridRows = '20% 0.5% 54% 0.5% 25%';

    switch (status) {
      case 'error':
        content = (
          <>
            <h3 style={{ color: '#B20000' }}>
              <i style={{ color: '#B20000' }} className="fas fa-times" />
              {' '}
            {this.labels.transactionFailed}
            </h3>
            <hr />
            <p style={{ marginTop: '20px' }}>
            {this.labels.transactionFailedText}
            </p>
          </>
        );
        break;
      case 'success':
        title = 'Transaction successful.';
        gridRows = '18% 0.5% 62% 0.5% 19%';
        if ( window.innerWidth <= 768 ) {
          gridRows = '13% 0.5% 73% 0.5% 13%';
        }
        content = (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <span style={{ fontWeight: '600' }}>{ this.labels.visitTransactionTab }</span>
            </div>
            <TransactionSuccessKeyValue>
              <span style={{ fontWeight: 900 }}>{ this.labels.transactionNumber } </span>
              <span>{charge.id}</span>
            </TransactionSuccessKeyValue>
            <TransactionSuccessKeyValue>
              <span style={{ fontWeight: 900 }}>{ this.labels.userIdentifier } </span>
              <span>{charge.customer}</span>
            </TransactionSuccessKeyValue>
            <TransactionSuccessKeyValue>
              <span style={{ fontWeight: 900 }}>{ this.labels.sourceId } </span>
              <span>{charge.source.id}</span>
            </TransactionSuccessKeyValue>
            <TransactionSuccessKeyValue>
              <span style={{ fontWeight: 900 }}>{ this.labels.date } </span>
              <span>{(new Date(charge.created * 1000)).toDateString()}</span>
            </TransactionSuccessKeyValue>
          </div>
        );
        footer = (
          <TransactionButton
            type="button"
            onClick={ this.gotToTransactions }
          >

            <i style={{ fontSize: '12px', color: 'rgb(59, 68, 75)' }} className="fas fa-file-invoice-dollar" />
            {' '}
            { this.labels.transactions }
          </TransactionButton>
        );
        break;
      case 'sending':
        content = (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            <h3>
              <i style={{ color: 'rgb(59, 68, 75)' }} className="fas fa-spinner loading" />
              {' '}
              { this.labels.performingTransactions }
            </h3>
          </div>
        );
        footer = this.labels.pleaseWait;
        break;
      default:
       content = 
       (
        <DepositForm>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '16px 0px' }}>
            <div style={{
              height: '41px',
              width: '41px',
              backgroundColor: '#dedede',
              fontSize: '16px',
              textAlign: 'center',
              lineHeight: '41px',
              fontWeight: 900,
              borderRadius: '5px 0 0 5px',
              border: 'gray solid 0.5px',
            }}
            >
          $
            </div>
            <input
              className="input-single-amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder={this.labels.depositAmount}
              ref={(node) => { this.amount = node; }}
            />
          </div>
          <button
            type="button"
            className="border-0 shadow green_button"
            style={{
              backgroundColor: '#10b364',
              color: '#ffffff',
              borderRadius: '5px',
              padding: '10px 30px',
              cursor: 'pointer',
            }}
            onClick={this.sendDeposit}
          >
            <i style={{ fontSize: '14px', color: '#ffffff' }} className="fas fa-money-bill-alt" />
            {' '}
            { this.labels.addDeposit }
          </button>
        </DepositForm>
       );
       footer = this.labels.allowFundsDelay;
    }

    const baseModalContent = 
    (
      <ModalWrapper gridRows={gridRows}>
        <ModalHeader>
          <HeaderTitle>{ title }</HeaderTitle>
          <CloseIcon onClick={this.onCloseModal} />
        </ModalHeader>
        <Underline />
        <ModalContent>
          { content }
        </ModalContent>
        <Underline />
        <ModalFooter>
          <p style={{ marginTop: '10px' }}>{ footer }</p>
        </ModalFooter>
      </ModalWrapper>
    );
    
    return (
      <AddDepositButtonWrapper>
        <button
          type="button"
          className="border-0 shadow green_button"
          style={{
            backgroundColor: '#10b364',
            color: '#ffffff',
            borderRadius: '5px',
            padding: '10px 30px',
            cursor: 'pointer',
          }}
          onClick={this.onOpenModal}
        >
          <i style={{ fontSize: '14px', color: '#ffffff' }} className="fas fa-money-bill-alt" />
          {' '}
          { this.labels.addDeposit }
        </button>
        <PPGModal 
          setPadding={false}
          onlyChildren={true} 
          setOpen={open} 
          handleClose={this.onCloseModal}
        >
         { baseModalContent }
        </PPGModal>
      </AddDepositButtonWrapper>
    );
  }
}

AddDeposit.propTypes = {
  cookies: PropTypes.object,
};

AddDeposit.defaultProps = {
  cookies: {},
};

export default withRouter(injectIntl(AddDeposit));
