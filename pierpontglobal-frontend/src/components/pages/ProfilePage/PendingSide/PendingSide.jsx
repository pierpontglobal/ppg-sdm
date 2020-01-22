import React from 'react';
import '../styles.css';
import posed from 'react-pose';
import { Tabs, Tab, Icon } from '@material-ui/core';

const DivTabs = posed.div({
  normal: {
    y: -1000,
  },
  flyin: {
    y: 0,
    transition: {
      delay: 500,
      ease: 'backInOut',
    },
  },
});

class PendingSide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textPlace: 'normal',
      tabValue: 2,
    };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(event, value) {
    this.setState({ tabValue: value });
  }


  render() {
    const { tabValue } = this.state;
    return (
      <div>
        <DivTabs pose={this.state.textPlace} className="center-holder">
          <span className="big-text">Pending</span>
          <div>
                  These are the pending you have
          </div>
          <Tabs
            value={tabValue}
            onChange={this.handleTabChange}
            fullWidth
            className="mb-32"
          >
            <Tab
              icon={<Icon className="h-40 text-40">refresh</Icon>}
              className="min-w-0"
              label="Pending"
            />
            <Tab
              icon={<Icon className="h-40 text-40">check_circle</Icon>}
              className="min-w-0"
              label="History"
            />
            <Tab
              icon={<Icon className="h-40 text-40">drive_eta</Icon>}
              className="min-w-0"
              label="Other"
            />
          </Tabs>

          {tabValue === 0 && 'Pending sample...'}
          {tabValue === 1 && 'History sample..'}
          {tabValue === 2 && 'Other sample..'}
        </DivTabs>
      </div>
    );
  }
}

export default PendingSide;
