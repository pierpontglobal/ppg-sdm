import React from 'react';
import { Collapse } from 'reactstrap';
import Container from '../styles/Container/Container';
import Text from '../styles/Text/Text';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const iconColor = {
  color: '#000000',
  opacity: 0.50,
  fontSize: '0.8125em'
}

export default function PurchaseCard() {
  return <div></div>;
}

/* export default class PurchaseCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = { open: false }
  }

  toggleCard = () => this.setState(prev => ({
    open: !prev.open
  }));

  render() {
    const {
      orderNumber,
      stepContent,
      activeStep,
      car
    } = this.props;

    const { open } = this.state;
    return (
      <Container
        className="mb-3"
        backgroundColor="#fafafa"
        boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.18)"
      >
        <Container
          className="d-flex flex-row justify-content-between pl-3 pr-4"
          height="70px"
          hoverCursor="pointer"
          onClick={this.toggleCard}
        >
          <div>
            <Text
              className="mb-0 pt-3"
              opacity={0.87}
              fontWeight={600}
              lineHeight={1.25}
            >
              {car.vin}
            </Text>
            <Text
              className="mb-0"
              opacity={0.54}
              fontSize="0.75em"
              lineHeight={1.67}
            >
              {`Order Number: ${orderNumber}`}
            </Text>
          </div>
          <div className="d-flex flex-column justify-content-center">
            <i
              className={`fas fa-chevron-${open ? 'up' : 'down'}`}
              style={iconColor}
            />
          </div>
        </Container>
        <Collapse isOpen={open}>
          <div>
            <Stepper activeStep={activeStep} orientation="vertical">
              {stepContent.map((step, index) => (
                <Step key={`${car.vin}-${index}`}>
                  <StepLabel>{'Test'} <span style={{ color: 'darkgrey' }}>12/30/19 - 3:00 PM</span></StepLabel>
                  <StepContent>
                    <Typography>{step['text']}</Typography>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === stepContent.length && (
              <Paper square elevation={0}>
                <Typography>All steps completed - you&apos;re finished</Typography>
              </Paper>
            )}
          </div>
        </Collapse>
      </Container>
    );
  }
} */
