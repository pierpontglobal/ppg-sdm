import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';

import { ApiServer } from '../../../../Defaults';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-template-rows: 62px auto;
  grid-template-areas: 
    "username username email email"
    "message message message message"
    ". . . submit";

  @media only screen and (max-width: 480px) {
    grid-template-areas: 
    "username username email email"
    "message message message message"
    "submit . . .";
  }
`;

const LoadingWrapper = styled.div`
  grid-area: message;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SuccessWrapper = styled.div`
  grid-area: message;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const UsernameInput = styled.div`
  grid-area: username;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmailInput = styled.div`
  grid-area: email;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageInput = styled.div`
  width: 100%;
  height: 100%;
  grid-area: message;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubmitButtonWrapper = styled.div`
  grid-area: submit;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SubmitButton = styled.button`
  padding: 8px;
  border-radius: 4px;
  box-shadow: 2px 4px 8px 0px rgb(0, 0, 0, 0.1);
  min-width: 102px;
  border: none;
  background: -webkit-linear-gradient(to right, #2e90d1, #2573a7);
  background: linear-gradient(to right, #2e90d1, #2573a7);
  transition: all 0.2s;
  margin-right: 16px;
  & > span {
    color: white;
    font-weight: 400;
    font-size: 1.15rem;
  }
  &:hover {
    background: -webkit-linear-gradient(to right, #2e90d1, #2981bc);
    background: linear-gradient(to right, #2e90d1, #2981bc);
  }
`;

const SuccessTitle = styled.div`
  width: 100%;
  padding: 16px;
  text-align: center;
  & > span { 
    font-size: 1.55rem;
  }
`;
const SuccessMessage = styled.div`
  width: 100%;
  padding: 16px;
  text-align: center;
  & > span { 
    font-size: 1.05rem;
  }
`;

const SendOtherLink = styled.a`
  cursor: pointer;
  color: darkblue;
  text-decoration: underline;
`;

const styles = theme => ({
  textField: {
    width: '90%',
  },
  messageField: {
    width: '95%',
  }
});

class ContactForm extends React.Component {
  state = {
    username: {
      error: false,
      value: this.props.user.name || '',
    },
    email: {
      error: false,
      value: this.props.user.email || '',
    },
    message: {
      error: false,
      value: ''
    },
    isLoading: false,
    messageSent: false,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: {
        error: false,
        value: e.target.value,
      },
    })
  }

  sendOther = () => {
    const { user } = this.props;
    this.setState({
      message: '',
      username: user.name || '',
      email: user.email || '',
      isLoading: false,
      messageSent: false,
    })
  }

  validateMessage = () => {
    const {
      username, email, message,
    } = this.state;
    let validEmail = false;
    if (this.validateEmail(email.value)) {
      validEmail = true;
    }

    if (validEmail && message.value.length >= 10 && username.value.length > 0) {
      this.sendMessage({
        message: {
          name: username.value,
          email: email.value,
          message: message.value,
        },
      });
    } else {
      const errors = [];
      if (!validEmail) {
        errors.push({
          error: true,
          value: email.value,
          name: 'email',
        });
      }
      if (!!message.value && message.value.length < 10) {
        errors.push({
          error: true,
          value: message.value,
          name: 'message',
        });
      }
      if (!!username.value && username.value.length <= 0) {
        errors.push({
          error: true,
          value: username.value,
          name: 'name',
        });
      }

      const newState = {};
      errors.forEach((e) => {
        newState[e.name] = e;
      });
      this.setState({
        ...newState,
      });
    }
  }

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  sendMessage = () => {
    this.setState({
      isLoading: true,
    }, () => {
      const {
        username, email, message,
      } = this.state;

      axios.post(`${ApiServer}/api/v1/user/send-contact-form`, {
        name: username.value,
        email: email.value,
        message: message.value,
      }).then(() => {
        this.setState({
          isLoading: false,
          messageSent: true,
          username: { error: false, value: '' },
          email: { error: false, value: '' },
          message: { error: false, value: '' },
        });
      }, () => {
        this.setState({
          isLoading: false,
          messageSent: false,
        });
      });
    });
  }

  render() {
    const { classes, intl } = this.props;
    const { username, email, message, isLoading, messageSent } = this.state;

    return (
      <Wrapper>
        {
          isLoading ? <LoadingWrapper><CircularProgress /></LoadingWrapper> : messageSent ?
            <SuccessWrapper>
              <SuccessTitle>
                <FormattedMessage id="contact-page.form.success-title" />
              </SuccessTitle>
              <SuccessMessage>
                <FormattedMessage id="contact-page.form.success-message" />
              </SuccessMessage>
              <div style={{ marginTop: '16px' }}>
                <SendOtherLink onClick={this.sendOther}><FormattedMessage id="contact-page.form.send-other" /></SendOtherLink>
              </div>
            </SuccessWrapper> : (
              <>
                <UsernameInput>
                  <TextField
                    id="username"
                    error={username.error}
                    label={intl.formatMessage({ id: 'contact-page.form.name' })}
                    value={username.value}
                    margin="normal"
                    className={classes.textField}
                    variant="outlined"
                    onChange={this.handleChange}
                  />
                </UsernameInput>
                <EmailInput>
                  <TextField
                    required
                    id="email"
                    error={email.error}
                    label={intl.formatMessage({ id: 'contact-page.form.email' })}
                    value={email.value}
                    onChange={this.handleChange}
                    margin="normal"
                    className={classes.textField}
                    variant="outlined"
                  />
                </EmailInput>
                <MessageInput>
                  <TextField
                    id="message"
                    error={message.error}
                    label={intl.formatMessage({ id: 'contact-page.form.message' })}
                    multiline
                    rowsMax="6"
                    rows="6"
                    value={message.value}
                    onChange={this.handleChange}
                    className={classes.messageField}
                    margin="normal"
                    variant="outlined"
                  />
                </MessageInput>
                <SubmitButtonWrapper>
                  <SubmitButton onClick={this.validateMessage}>
                    <FormattedMessage id="contact-page.form.send" />
                  </SubmitButton>
                </SubmitButtonWrapper>
              </>
            )
        }
      </Wrapper>
    );
  }
}

export default withStyles(styles)(ContactForm);