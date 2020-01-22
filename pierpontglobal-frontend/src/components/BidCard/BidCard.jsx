import React from 'react';
import Countdown from 'react-countdown-now';
import posed from 'react-pose';
import Text from '../styles/Text/Text';
import './styles.css';
import SimpleButton from './SimpleButton';
import { FormattedMessage, injectIntl } from 'react-intl';
import styled from 'styled-components';

const Completionist = () => <FormattedMessage id="bid.process-start" />;

const NotAvailableLabel = <FormattedMessage id="label.not-available" />;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const ExpandableDiv = posed.div({
  retracted: {
    height: '120px',
  },
  expanded: {
    height: '430px',
  },
});

const RotatableIcon = posed.i({
  retracted: {
    rotate: 0,
  },
  expanded: {
    rotate: 180,
  },
});

const CompletedTimerText = styled.div`
  @media only screen and (max-width: 768px){
    & > span {
      font-size: 0.75rem;
    }
  }
`;

const renderer = ({
  days, hours, minutes, seconds, completed
}) => {
  if (completed) {
    // Render a completed state
    return (<CompletedTimerText><Completionist /></CompletedTimerText>);
  }
  // Render a countdown
  return (
    <span style={{ fontWeight: 800 }}>
      {`${days} days ${hours.toLocaleString(undefined, { minimumIntegerDigits: 2 })}:${minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })}:${seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })}`}
    </span>
  );
};

const AuctionTimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: auto;
  padding: 8px;
  align-items: space-between;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const RetractedContent = styled.div`
  padding: 8px;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const AuctionGoesOnText = styled.div`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ExpandableContent = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const AuctionDetail = styled.div`
  width: 100%;
  max-height: 320px;
  overflow-y: auto;
`;

const AuctionDetailContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (min-width: 768px) {
    width: 30%;
    margin: 12px 10px;
  }
`;

const AuctionDetailName = styled.div`
  & > span {
    font-weight: 600;
  }
`;

const AuctionDetailValue = styled.div`
  & > span {
    font-weight: 200;
  }
  @media only screen and (min-width: 768px) {
    min-width: 200px;
    text-align: left;
    & > span {
      margin-left: 24px;
    }
  }
`;

const LineSeparator = styled.hr`
  visibility: ${props => ((props.expanded) ? 'visible' : 'hidden')};
`;

class BidCard extends React.Component {
  constructor(props) {
    super(props);

    const {
      auctionDate,
      bid,
      orderNumber,
      carTitle,
      vin,
      data,
    } = this.props;

    this.state = {
      status: false,
      auctionDate,
      bid,
      orderNumber,
      carTitle,
      vin,
      data,
    };

    this.lbDays = this.props.intl.formatMessage({id: 'label.days' });
    this.disabledText = this.props.intl.formatMessage({id: 'label.cancel-bid-disabled' });
  }

  render() {
    const {
      auctionDate, bid, orderNumber, carTitle, status, vin, data,
    } = this.state;


    const auctionDateFormatted = new Date(auctionDate);
    const auctionDateTime = auctionDateFormatted.getTime();
    const bidRemovalTimeLimit = auctionDateTime - (1 * 60 * 60 * 1000); // Represents one hour
    const bidRemovalDateLimit = auctionDateFormatted.setTime(bidRemovalTimeLimit);
    const passBidRemovalAction = new Date() > bidRemovalDateLimit;

    return (
      <ExpandableDiv
        pose={status ? 'expanded' : 'retracted'}
        style={{
          height: '80px',
          borderBottom: 'solid 1px #dedede',
          overflow: 'hidden',
        }}
      >
        <RetractedContent>
          <div className="pt-md-3 pt-1">
            <div>
              <Text
                opacity={0.87}
                fontSize="1em"
                fontWeight={600}
                lineHeight={1.25}
                className="mb-0"
              >
                {carTitle}
              </Text>
              <Text
                opacity={0.54}
                fontSize="0.75em"
                lineHeight={1.67}
                className="mb-0"
              >
                <FormattedMessage id="label.order-number" />
                :
                { orderNumber }
              </Text>
            </div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          >
            <AuctionTimerWrapper>
              <Text
                opacity={0.54}
                size="0.75em"
                lineHeight={1.67}
                className="mb-0 text-right"
              >
                <AuctionGoesOnText>
                  <FormattedMessage id="label.auction-goes-on" />
                </AuctionGoesOnText>
              </Text>
              <Countdown
                date={auctionDate}
                renderer={renderer}
              />
              <Text
                fontSize="0.75em"
                lineHeight={1.67}
                className="mb-0 text-right"
              >
                <FormattedMessage id="label.your-bid" />
                <span style={{ color: '#0bb761' }}>
                  {' '}
                  $
                  {numberWithCommas(bid)}
                </span>
              </Text>
            </AuctionTimerWrapper>
            <button
              className="border-0 fas fa-car"
              type="button"
              style={{
                background: 'transparent',
                color: 'rgb(59, 68, 75)',
                textAlign: 'center',
                margin: '10px',
                lineHeight: '12px',
                cursor: 'pointer',
                minWidth: '80px'
              }}
              onClick={() => { window.location.href = `/marketplace/car?vin=${vin}`; }}
            >
              <br />
              <span style={{ fontFamily: 'Raleway', fontSize: '12px', lineHeight: '12px' }}>
                <FormattedMessage id="label.view-lot" />
              </span>
            </button>
            <RotatableIcon onClick={() => { this.setState({ status: !status }); }} style={{ color: 'rgb(59, 68, 75)', marginRight: '10px', cursor: 'pointer' }} className="fas fa-angle-down" />
          </div>
        </RetractedContent>
        <div style={{ padding: '0 30px' }}>
          <LineSeparator expanded={status} />
          <ExpandableContent>
            <AuctionDetail>
              <AuctionDetailContainer>
                <AuctionDetailName><FormattedMessage id="car.id" /></AuctionDetailName>
                <AuctionDetailValue><span>{data.car_id ? data.car_id : NotAvailableLabel}</span></AuctionDetailValue>
              </AuctionDetailContainer>
              <AuctionDetailContainer>
                <AuctionDetailName><FormattedMessage id="car.maker" /></AuctionDetailName>
                <AuctionDetailValue><span>{data.car_maker ? data.car_maker : NotAvailableLabel}</span></AuctionDetailValue>
              </AuctionDetailContainer>
              <AuctionDetailContainer>
                <AuctionDetailName><FormattedMessage id="car.model" /></AuctionDetailName>
                <AuctionDetailValue><span>{data.car_model ? data.car_model : NotAvailableLabel}</span></AuctionDetailValue>
              </AuctionDetailContainer>
              <AuctionDetailContainer>
                <AuctionDetailName><FormattedMessage id="car.year" /></AuctionDetailName>
                <AuctionDetailValue><span>{data.year ? data.year : NotAvailableLabel}</span></AuctionDetailValue>
              </AuctionDetailContainer>
              <AuctionDetailContainer>
                <AuctionDetailName><FormattedMessage id="car.trim" /></AuctionDetailName>
                <AuctionDetailValue><span>{data.trim ? data.trim : NotAvailableLabel}</span></AuctionDetailValue>
              </AuctionDetailContainer>
              <AuctionDetailContainer>
                <AuctionDetailName><FormattedMessage id="car.vin" /></AuctionDetailName>
                <AuctionDetailValue><span>{data.vin ? data.vin : NotAvailableLabel}</span></AuctionDetailValue>
              </AuctionDetailContainer>
              <AuctionDetailContainer>
                <AuctionDetailName><FormattedMessage id="car.channel" /></AuctionDetailName>
                <AuctionDetailValue><span>{data.channel ? data.channel : NotAvailableLabel}</span></AuctionDetailValue>
              </AuctionDetailContainer>
            </AuctionDetail>
            <div style={{ marginTop: '24px' }}>
              <SimpleButton text={<FormattedMessage id="label.modify-bid-amount" />} iconClass="fas fa-pen" />
              <SimpleButton
                text={<FormattedMessage id="label.cancel-bid" />}
                iconClass="fas fa-times"
                disabledText={this.disabledText}
                disabled={passBidRemovalAction}
              />
            </div>
          </ExpandableContent>
        </div>
      </ExpandableDiv>
    );
  }
}

export default injectIntl(BidCard);
