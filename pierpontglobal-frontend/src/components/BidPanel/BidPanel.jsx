import React from 'react';
import axios from 'axios';
import { ActionCableConsumer } from 'react-actioncable-provider';
import styled from 'styled-components';
import { FormattedMessage, injectIntl } from 'react-intl';
import Input from '../styles/Input/Input';
import Container from '../styles/Container/Container';
import Text from '../styles/Text/Text';
import { ApiServer } from '../../Defaults';
import PriceTag from '../CarCard/PriceTag/PriceTag';
import DepositModal from '../DepositModal/DepositModal';
import numeral from 'numeral';

let bidInput = null;

async function requestCarPrice(vin) {
  await axios.patch(`${ApiServer}/api/v1/car/price-request`, { vin });
}

const BidPanelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  background-color: #3e78c0;
  min-height: 105px;
  @media screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
  }
`;

class BidPanel extends React.Component {
  constructor(props) {
    super(props);

    const {
      wholePrice,
      saleDate,
      carId,
      vin,
      intl,
    } = this.props;

    this.state = {
      wholePrice,
      saleDate,
      carId,
      vin,
      loading: false,
      bidPlacingFailed: false,
      numberValue: ''
    };

    this.handleReceived = this.handleReceived.bind(this);
    this.sendBid = this.sendBid.bind(this);

    this.bidAmountPlaceholder = intl.formatMessage({ id: 'label.your-max-bid' });
  }

  componentWillReceiveProps(nextProps) {
    const {
      wholePrice, vin, carId, saleDate,
    } = this.state;

    if (nextProps.wholePrice !== wholePrice) {
      this.setState({ wholePrice: nextProps.wholePrice });
    }

    if (nextProps.vin !== vin) {
      this.setState({ vin: nextProps.vin });
    }

    if (nextProps.carId !== carId) {
      this.setState({ carId: nextProps.carId });
    }

    if (nextProps.saleDate !== saleDate) {
      this.setState({ saleDate: nextProps.saleDate });
    }
  }

  async sendBid(bid, carId) {
    this.setState({
      loading: true,
    });

    const { updateUserBidCallback } = this.props;
    let response = null;
    try {
      response = await axios.post(`${ApiServer}/api/v1/car/bid`, { amount: bid, car_id: carId });
      if (response.status === 200) {
        const { data } = response;
        const userBid = parseFloat(data.message.amount);
        updateUserBidCallback(parseFloat(userBid));
      }
    } catch (error) {
      this.setState({
        bidPlacingFailed: false,
      });

      this.setState({
        bidPlacingFailed: true,
        intendedBid: bid,
      });
    }
    this.setState({
      loading: false,
    });
  }

  handleReceived(message) {
    const mmrResponse = JSON.parse(message);
    this.setState({
      wholePrice: mmrResponse.mmr,
    });
  }

  formatNumber = (e) => {
    const number = e.target.value;
    //const {numberValue} = this.state;
    
    if (!!number) {
      console.log(number, parseFloat(number), numeral(number).format('0,0'));
      this.setState({
        numberValue: numeral(number).format('0,0')
      }, () => {
        const { numberValue } = this.state;
        console.log('Numbervlaue >>> ', numberValue);
        console.log( parseFloat(numeral(numberValue).value()) );
      })
    }
  }

  render() {
    const {
      wholePrice,
      saleDate,
      carId,
      vin,
      loading,
      intendedBid,
      bidPlacingFailed,
      numberValue,
    } = this.state;

    return (
      <>
        { bidPlacingFailed ? (
          <DepositModal
            onAddDeposit={() => { window.location.href = '/user'; }}
            onSearch={() => {
              this.setState({
                bidPlacingFailed: false,
              });
            }}
            show
            intendedBid={intendedBid}
          />
        ) : null}
        <DepositModal />
        <ActionCableConsumer
          channel="PriceQueryChannel"
          onReceived={this.handleReceived}
        />
        <BidPanelWrapper>
          <div style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
            <Text
              className="mb-0"
              opacity={0.87}
              fontSize="0.75em"
              lineHeight={1.33}
              fontColor="#ffffff"
            >
              <FormattedMessage id="label.whole-price" />
            </Text>
            <PriceTag
              color="white"
              price={wholePrice}
              fontSizeButton="20px"
              vin={vin}
              requestFunction={requestCarPrice}
              className="text-right mb-0"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Container
              className="d-flex mb-1 justify-content-end"
              height="60px"
            >
              <Input
                className="input mr-3 border-0"
                width="100%"
                backgroundColor="#3A70B4"
                borderRadius="4px"
                ref={(node) => { bidInput = node; }}
                style={{
                  outline: 'none',
                  textAlign: 'center',
                  fontSize: '1.45rem'
                }}
                type="text"
                onChange={this.formatNumber}
                value={ numberValue}
                fontColor="#ffffff"
                placeholder={this.bidAmountPlaceholder}
                placeholderColor="#ffffff"
                placeholderOpacity={0.54}
              />
              <button
                style={{
                  position: 'relative',
                  maxWidth: '100px',
                  backgroundColor: '#0bb761',
                  color: 'white',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                className="border-0 w-100"
                hoverColor="#23d17a"
                onClick={() => (this.sendBid(parseFloat(numeral(numberValue).value()), carId))}
                type="button"
              >
                <FormattedMessage id="label.bid" />
                <i
                  style={{
                    display: loading ? 'block' : 'none',
                    position: 'absolute',
                    margin: 'auto 0',
                    top: 0,
                    bottom: 0,
                    right: '10px',
                    height: '20px',
                    fontSize: '20px',
                  }}
                  className="fas fa-spinner loading"
                />
              </button>
            </Container>
            <div
              style={{fontSize: '0.75em', lineHeight: '1.33', fontColor: 'rgba(255, 255, 255, 0.87)', color: 'white', textAlign: 'center', marginTop: '8px'}}
            >
              <FormattedMessage id="bid.retract-msg" />
              {' '}
              {saleDate}
            </div>
          </div>
        </BidPanelWrapper>
      </>
    );
  }
}

export default injectIntl(BidPanel);
