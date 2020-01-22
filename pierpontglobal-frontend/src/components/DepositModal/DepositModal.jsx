import React from 'react';
import axios from 'axios';
import { injectIntl } from 'react-intl';
import Modal from '../Modal/Modal';
import Information from '../BidModal/Information/Information';
import Btn from '../Btn/Btn';
import { ApiServer } from '../../Defaults';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

class DepositModal extends React.Component {
  constructor(props) {
    super(props);

    const {
      show,
      intendedBid,
      onSearch,
      onAddDeposit,
      intl,
    } = this.props;

    this.state = {
      show,
      intendedBid,
      onSearch,
      onAddDeposit,
      deficit: 0,
      availableFunds: 0,
    };

    this.getFunds = this.getFunds.bind(this);

    this.labels = {
      outOfDeposit: intl.formatMessage({ id: 'deposit.out-of-deposit' }),
      deficientAmount: intl.formatMessage({ id: 'deposit.deficient-amount' }),
      necessaryAmount: intl.formatMessage({ id: 'deposit.necessary-amount' }),
      availableAmount: intl.formatMessage({ id: 'deposit.available-amount' }),
      keepSearching: intl.formatMessage({ id: 'deposit.keep-searching' }),
      addDeposit: intl.formatMessage({ id: 'deposit.add-deposit' }),
    };
  }

  componentDidMount() {
    this.getFunds();
  }

  componentWillReceiveProps(newProperties) {
    if (newProperties.intendedBid !== this.state.intendedBid) {
      this.setState({ intendedBid: newProperties.intendedBid });
    }
  }

  async getFunds() {
    const { intendedBid } = this.state;
    const fundsResponse = (await axios.get(`${ApiServer}/api/v1/user/funds`)).data;

    const availableFunds = parseFloat(fundsResponse.balance) - parseFloat(fundsResponse.holding);
    const deficit = ((intendedBid * 10 / 100) - availableFunds);

    this.setState({
      deficit,
      availableFunds,
    });
  }

  render() {
    const {
      show, intendedBid, onSearch, onAddDeposit, deficit, availableFunds,
    } = this.state;

    return (
      <Modal
        title={this.labels.outOfDeposit}
        show={show}
      >
        <div className="pt-2">
          <Information
            label={this.labels.deficientAmount}
            text={`$ ${numberWithCommas(deficit.toFixed(2))}`}
            fontSize="16px"
            fontWeight={600}
            lineHeight={1.31}
            className="mb-0 pb-2 border-bottom"
          />
          <Information
            label={this.labels.necessaryAmount}
            text={`$ ${numberWithCommas((intendedBid * 10 / 100).toFixed(2))}`}
            fontSize="14px"
            fontWeight="normal"
            lineHeight={2}
            className="mb-0 pt-2"
          />
          <Information
            label={this.labels.availableAmount}
            text={`$ ${numberWithCommas(availableFunds.toFixed(2))}`}
            fontSize="14px"
            fontWeight="normal"
            lineHeight={2}
            className="mb-0"
          />
        </div>
        <div
          className="d-flex flex-row justify-content-center"
          style={{ height: '60px' }}
        >
          <Btn
            className="mr-3 w-100"
            maxWidth="152px"
            color="#3a7abf"
            hoverColor="#4c87cc"
            onClick={onSearch}
          >
            { this.labels.keepSearching }
          </Btn>
          <Btn
            className="w-100"
            maxWidth="152px"
            color="#0bb761"
            hoverColor="#23d17a"
            onClick={onAddDeposit}
          >
            { this.labels.addDeposit }
          </Btn>
        </div>
      </Modal>
    );
  }
}

export default injectIntl(DepositModal);
