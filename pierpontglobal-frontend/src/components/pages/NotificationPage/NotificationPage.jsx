import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { ActionCableProvider } from 'react-actioncable-provider';
import ActionCable from 'actioncable';
import { WSConnection } from '../../../Defaults';

const NotificationCard = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 20% 80%;
  background-color: white;
  border-radius: 16px;
  border: 1px solid darkred;
`;

const NotificationsWrapper = styled.div`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
`;

class NotificationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = () => {
    this.cable = ActionCable.createConsumer(WSConnection);
    this.userId = this.props.cookies.get('user_id', { path: '/' });

    this.subscription = this.cable.subscriptions.create(
      {
        channel: 'NotificationChannel',
        user_id: this.userId,
      },
      {
        received: (data) => {
          this.handleReceived(data);
        },
      },
    );
    // console.log(this.subscription);
  }

  componentDidMount = () => {
    axios.defaults.headers.common.Authorization = `Bearer ${this.props.cookies.get('token', { path: '/' })}`;

    // Fetch Notifications for current user
    setTimeout(() => {
      this.setState({
      });
    }, 3000);
  }

  handleReceived = (/* data */) => {
    // console.log('Recevied new data!! Yei!');
    // console.log(data);
  }


  render() {
    return (
      <>
        <ActionCableProvider cable={this.cable}>
          <NotificationsWrapper>
            <NotificationCard>
              <div>icon</div>
              <div>payload data</div>
            </NotificationCard>
          </NotificationsWrapper>
        </ActionCableProvider>
      </>
    );
  }
}

export default NotificationPage;
