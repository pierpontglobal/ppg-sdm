import React from 'react';
import axios from 'axios';
import UnderLine from '../../../Underline/Underline';
import BidCard from '../../../BidCard/BidCard';
import PurchaseCard from '../../../PurchaseCard/PurchaseCard';
import { ApiServer } from '../../../../Defaults';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/Visibility';
import Modal from '@material-ui/core/Modal';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

const HeadingStyle = styled.div`
  font-size: 1em;
  font-weight: 600;
  line-height: 1.31;
  padding: 20px 40px;
  color: #000000;
  @media only screen and (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const ModalContainer = styled.div`
width: 100%;
`;

const ImageCard = styled.img`
width: 100%;
`;

const ModalStyled = styled(Modal)`
display: flex;
padding: 16px;
align-items: center;
justify-content: center;
`;

const PaperStyled = styled(Paper)`
width: 60%;
max-width: 560px;
background-color: white;
overflow-x: hidden;
overflow-y: auto;
position: relative;
max-height: 90%;

@media only screen and (max-width: 768px) {
  width: 90%;
}
`;

function bidFormatter(bid) {
  const formattedBid = {
    key: bid.vin,
    orderNumber: `${bid.bid_collector_id}B${bid.id}A${bid.car_id}`,
    bid: parseFloat(bid.amount),
    date: bid.auction_start_date,
    carTitle: `${bid.year ? bid.year : ''} ${bid.car_maker ? bid.car_maker : ''} ${bid.car_model ? bid.car_model : ''} ${bid.trim ? bid.trim : ''}`,
    data: bid,
  };
  return formattedBid;
}

function parseBids(bids) {
  const receivedBids = [];
  for (let i = 0; i < bids.length; i += 1) {
    const formattedBid = bidFormatter(bids[i]);
    receivedBids.push(formattedBid);
  }
  return receivedBids;
}

async function retrieveActiveBids() {
  const bidsResponse = (await axios.get(`${ApiServer}/api/v1/user/bids`)).data;
  return bidsResponse;
}

class PurchaseSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bids: [],
      purchases: [],
      openModal: false,
      selectedBid: undefined,
      stepContent: [
        {
          date: Date.now,
          title: 'Aquiring vehicle from auction',
          text: 'The vehicle is beeing pickup by a Pierpont Representative',
        },
        {
          date: Date.now,
          title: 'Transporting vehicle to shipping location',
          text: 'The vehicle is beeing transported from the seller to the shipping location',
        },
        {
          date: Date.now,
          title: 'Boarding vehicle to ship',
          text: 'The vehicle is beeing moved from the port storing location to a ship',
        },
        {
          date: Date.now,
          title: 'Transporting vehicle to destination country',
          text: 'The vehicle is on its way to the country of the buyer',
        },
        {
          date: Date.now,
          title: 'Car at pickup port',
          text: 'The car is at the port, waiting for a Pierpont Representative for pick up',
        }
      ],
      activeStep: 0
    };
    this.updateBids = this.updateBids.bind(this);
  }

  componentDidMount() {
    this.updateBids();
  }

  handleClose = () => {
    this.setState({ openModal: false })
  }

  handleOpen = (bid) => {
    this.setState({
      openModal: true,
      selectedBid: bid
    })
  }

  async updateBids() {
    const rawBids = await retrieveActiveBids();
    console.log(rawBids);
    const processedBids = parseBids(rawBids);
    this.setState({
      bids: processedBids.map((bid) => {
        if (bid.data.success === null)
          return bid;
        else
          return null;
      }).filter(Boolean),
      purchases: processedBids.map((bid) => {
        if (bid.data.success === true)
          return bid;
        else
          return null;
      }).filter(Boolean),
    });
  }

  render() {
    const { bids, purchases, openModal, selectedBid, stepContent } = this.state;
    console.log(selectedBid);

    console.log(purchases)
    return (
      <HeadingStyle>
        {selectedBid !== undefined ? <ModalStyled
          open={openModal}
          onClose={this.handleClose}>
          <PaperStyled>
            <ModalContainer>
              <ImageCard src={selectedBid.data.car_images[selectedBid.data.car_images.length - 1]} />
              <div style={{ margin: '16px' }}>
                <h3>{selectedBid.carTitle}</h3>
                <div>
                  <Stepper activeStep={selectedBid.data.step} orientation="vertical">
                    {stepContent.map((step, index) => (
                      <Step key={`${selectedBid.data.vin}-${index}`}>
                        <StepLabel>{step['title']} <span style={{ color: 'darkgrey' }}>12/30/19 - 3:00 PM</span></StepLabel>
                        <StepContent>
                          <Typography>{step['text']}</Typography>
                        </StepContent>
                      </Step>
                    ))}
                  </Stepper>
                  {selectedBid.data.step === stepContent.length && (
                    <Paper square elevation={0}>
                      <Typography>All steps completed - you&apos;re finished</Typography>
                    </Paper>
                  )}
                </div>
              </div>
            </ModalContainer>
          </PaperStyled>
        </ModalStyled> : <></>}

        <div className="card shadow content-holder-box">
          <div style={{ padding: '20px' }}>
            <h4>
              <FormattedMessage id="label.your-bids" />
            </h4>
            <p style={{ color: 'darkgrey' }}>
              <FormattedMessage id="label.lock-bid-msg" />
            </p>
          </div>
          <hr style={{ margin: 0 }} />
          <div className="content-main card">
            {bids.sort((a, b) => new Date(b.date) - new Date(a.date)).map(bid => (
              <BidCard
                vin={bid.key}
                key={bid.orderNumber}
                auctionDate={bid.date}
                bid={bid.bid.toFixed(2)}
                orderNumber={bid.orderNumber}
                carTitle={bid.carTitle}
                data={bid.data}
              />
            ))}
          </div>
        </div>

        <div style={{}} className="card shadow content-holder-box">
          <UnderLine className="justify-content-between">
            <h4 className="mb-0">
              <FormattedMessage id="label.your-purchases" />
            </h4>
          </UnderLine>

          <div style={{ overflow: 'auto', position: 'relative', width: '100%' }}>
            <Table style={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>VIN</TableCell>
                  <TableCell align="right">MODEL</TableCell>
                  <TableCell align="right">PRICE</TableCell>
                  <TableCell align="right">HANDLING</TableCell>
                  <TableCell align="right">STATUS</TableCell>
                  <TableCell align="right">ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {purchases.map(row => (
                  <TableRow key={row.orderNumber}>
                    <TableCell align="right">
                      {row.data.vin}
                    </TableCell>
                    <TableCell align="right"><div style={{ width: 'max-content' }}>{`${row.data.year} ${row.data.trim} ${row.data.car_model} ${row.data.car_maker}`}</div></TableCell>
                    <TableCell align="right">{row.bid}</TableCell>
                    <TableCell align="right">-</TableCell>
                    <TableCell align="right">{stepContent[row.data.step]['title']}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="delete" onClick={() => this.handleOpen(row)} >
                        <ViewIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </div>

          {purchases.map(o => (
            <PurchaseCard
              key={o.orderNumber}
              orderNumber={o.orderNumber}
              car={o.data}
              activeStep={0}
              stepContent={[
                {
                  date: Date.now,
                  text: 'Aquiring car from auction',
                },
                {
                  date: Date.now,
                  text: 'Aquiring car from auction',
                },
                {
                  date: Date.now,
                  text: 'Aquiring car from auction',
                },
                {
                  date: Date.now,
                  text: 'Aquiring car from auction',
                },
                {
                  date: Date.now,
                  text: 'Aquiring car from auction',
                }
              ]
              }
            />
          ))}
        </div>

      </HeadingStyle>
    );
  }
}

export default PurchaseSide;
