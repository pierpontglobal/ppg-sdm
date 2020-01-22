import React, { Component } from 'react';
import styled from 'styled-components';
import Close from '@material-ui/icons/Close';
import { IconButton, Button } from '@material-ui/core';
import Warning from '@material-ui/icons/Warning';
import Info from '@material-ui/icons/Info';
import NotificationTypes from '../../../constants/NotificationTypes';

const AccountAlertWrapper = styled.div`
    width: 90%;
    display: grid;
    grid-template-rows: 10% 75% 15%;
    margin: 0 auto;
    max-height: calc(100vh - 220px);
  @media only screen and (min-width: 748px) {
    width: 60%;
    height: 60%;
    position: absolute;
    top: 10%;
  }
`;

const Header = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.bgColor};
`;

const Title = styled.div`
  display: flex;
  margin-left: 8px;
  padding: 8px;
  justify-content: flex-start;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 8px;
  overflow: scroll;
  @media only screen and (min-width: 600px) {
    padding: 24px;
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #3a3a3a;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 8px;
  @media only screen and (min-width: 600px) {
    padding: 24px;
  }
`;

class NotificationDetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  componentWillMount = () => {
    const { selectedNotification } = this.props;
    this.setState({
      notification: selectedNotification,
    });
  }

  onClose = () => {
    // TODO: Close Notification detail modal
    this.props.handleClose();
  }

  render() {
    const {
      notification,
    } = this.state;

    return (
      <AccountAlertWrapper>
        <Header bgColor={(notification.notification_type === NotificationTypes.alert) ? '#ff8080' : '#548ff2'}>
          <Title>
            {/* <AlertCount>{ alerts.length }</AlertCount> */}
            <div style={{ marginLeft: '8px' }}>
              <span style={{ fontWeight: '600', color: 'white' }}>
                {notification.data.title}
              </span>
            </div>
          </Title>
          <IconButton onClick={this.onClose}>
            <Close />
          </IconButton>
        </Header>
        <Content>
          <div style={{ margin: '8px 0px' }}>
            {
              (notification.notification_type === NotificationTypes.alert)
                ? <Warning color="primary" /> : <Info color="primary" />
            }
            <span>
              {notification.data.message}
            </span>
          </div>
          <hr />
          <div>
            <span style={{ fontWeight: '600' }}>Contact: </span>
            <span>{[notification.receiver.first_name, notification.receiver.last_name].join(' ')}</span>
          </div>
          <div>
            <span style={{ fontWeight: '600' }}>Sender email: </span>
            <span>{notification.actor.email}</span>
          </div>
          <div>
            <span style={{ fontWeight: '600' }}>Read date: </span>
            <span>{new Date(notification.read_at).toDateString()}</span>
          </div>
          {
            // Only if notification as an issue
            (notification.issue)
              ? (
                <>
                  <div style={{ marginTop: '16px' }}>
                    <div style={{ fontWeight: '600', color: 'darkred' }}>
                      STATUS:
                      {notification.issue.title}
                    </div>
                    <div>
                      <span style={{ fontWeight: '600' }}>Issue: </span>
                      {notification.issue.description}
                    </div>
                    {
                      // tslint:disable-next-line
                      (notification.issue.solutions)
                        ? (
                          <>
                            <div>
                              <div>
                                <span style={{ fontWeight: '600' }}>Solutions</span>
                              </div>
                              <div>
                                <ul>
                                  {notification.issue.solutions.map((sol, i) => (
                                    <li key={i}>
                                      <span style={{ fontWeight: '600' }}>
                                        {sol.velocity}
                                        {':'}
                                      </span>
                                      {sol.description}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </>
                        )
                        : null
                    }
                  </div>
                </>
              ) : null
          }
        </Content>
        <Footer>
          {/* <Button variant="outlined" color="secondary">Refresh</Button> */}
          <Button variant="outlined" color="secondary" onClick={this.onClose}>Ok</Button>
        </Footer>
      </AccountAlertWrapper>
    );
  }
}

export default NotificationDetailModal;
