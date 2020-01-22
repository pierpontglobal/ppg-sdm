import React from 'react';
import axios from 'axios';
import { withCookies } from 'react-cookie';
import { ApiServer } from '../../../Defaults';
import Modal from '../../Modal/Modal';
import Input from '../../styles/Input/Input';
import Button from '../../Btn/Btn';
import './styles.css';
import { withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

class SignInModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showSigIn: props.show,
      rotate: 'normal',
      failed: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signInModal = this.signInModal.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.state.showSigIn !== newProps.show) {
      this.setState({
        showSigIn: newProps.show,
      });
    }
  }

  closeModal() {
    this.setState({ showSigIn: false });
    try {
      document.getElementsByTagName('body')[0].style.overflow = 'auto';
      const { notifyClosed } = this.props;
      notifyClosed();
    } catch (error) {
      console.log(error);
    }
  }

  openModal() {
    this.setState({ showSigIn: true });
  }

  signInModal() {
    const { rotate, failed } = this.state;
    const { intl } = this.props;
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';

    const labels = {
      userSignIn: intl.formatMessage({ id: 'sign-in.user-sign-in' }),
      username: intl.formatMessage({ id: 'sign-in.username' }),
      password: intl.formatMessage({ id: 'sign-in.password' }),
    };

    return (
      <Modal style={{ position: 'absolute' }} height="320px" show notifyClosed={this.closeModal} title={labels.userSignIn}>
        <form
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            minHeight: '390px',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onSubmit={this.signIn}
        >
          <img className="phone-only" style={{ marginBottom: '20px' }} width="80" src="/logos/loading_logo.png" alt="PierpontGlobal logo" />
          <p style={{ color: 'red', display: failed ? 'block' : 'none' }}>
            <FormattedMessage id="sign-in.wrong-credentials" />
          </p>
          <Input
            style={{
              height: '40px',
              border: '0px',
            }}
            className="w-100 pl-2"
            type="text"
            backgroundColor="#EEEEEE"
            ref={(node) => { this.username = node; }}
            lineHeight={1.31}
            maxWidth="300px"
            maxHeight="40px"
            borderRadius="4px"
            placeholder={labels.username}
            data-cy="username"
            required
          />

          <Input
            style={{
              marginTop: '10px',
              height: '40px',
              border: '0px',
            }}
            className="w-100 pl-2"
            type="password"
            backgroundColor="#EEEEEE"
            lineHeight={1.31}
            ref={(node) => { this.password = node; }}
            maxWidth="300px"
            maxHeight="40px"
            borderRadius="4px"
            placeholder={labels.password}
            data-cy="password"
            required
          />

          <a
            href="/recover"
            style={{
              marginTop: '10px',
              cursor: 'pointer',
              textDecoration: 'none',
              color: '#000000',
            }}
          >
            <FormattedMessage id="sign-in.forgot-account" />
          </a>

          <Button
            type="submit"
            marginTop="20px"
            color="#3e78c0"
            height="50px"
            width="160px"
            cypressId="submit-login"
            style={{
              color: 'gray',
            }}
            onClick={() => { this.setState({ rotate: 'rotate' }); }}
          >
            <div style={{ position: 'relative' }}>
              <FormattedMessage id='label.sign-in' />
              <i
                style={{
                  position: 'absolute',
                  right: 0,
                  margin: 'auto',
                  top: 0,
                  bottom: 0,
                  alignItems: 'center',
                  display: rotate === 'rotate' ? 'flex' : 'none',
                }}
                className="fas fa-spinner loading"
              />
            </div>
          </Button>
        </form>
      </Modal>
    );
  }

  async signIn(e) {
    e.preventDefault();
    const { cookies, history } = this.props;
    const data = {
      username: this.username.value,
      password: this.password.value,
      grant_type: 'password',
    };
    const response = await axios.post(`${ApiServer}/api/v2/users/login`, data);
    if (response.status === 200) {
      cookies.set('token', response.data.access_token, { expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) });
      axios.post(`${ApiServer}/api/v1/user/notifier`, {
        one_signal_uuid: cookies.get('one_signal_uuid'),
      });
      this.props.notifyClosed();
      history.push('/user');
    } else {
      this.username.className = `${this.username.className} wrong-cre`;
      this.password.className = `${this.password.className} wrong-cre`;
      this.setState({
        rotate: 'none',
        failed: true,
      });
    }
  }

  render() {
    const { showSigIn } = this.state;
    return (
      <div>
        {showSigIn ? this.signInModal() : null}
      </div>
    );
  }
}

export default withCookies(withRouter(injectIntl(SignInModal)));
