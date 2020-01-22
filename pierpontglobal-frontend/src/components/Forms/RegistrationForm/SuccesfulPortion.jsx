import axios from 'axios';
import React from 'react';
import { BarLoader } from 'react-spinners';
import { css } from 'emotion';
import { FormattedMessage } from 'react-intl';
import Text from '../../styles/Text/Text';
import { ApiServer } from '../../../Defaults';

const override = css`
    display: block;
    margin: 0 auto;
    height: 4px;
    width: 300px;
`;

class SuccessfulPortion extends React.Component {
  constructor(props) {
    super(props);
    const { loading, textColor, email } = this.props;
    this.state = {
      loading,
      textColor,
      email,
    };

    this.resend = this.resend.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.loading !== this.state.loading) {
      this.setState({ loading: props.loading });
    }
    if (props.textColor !== this.state.textColor) {
      this.setState({ textColor: props.textColor });
    }
    if (props.email !== this.state.email) {
      this.setState({ email: props.email });
    }
  }

  async resend(email) {
    this.setState({
      loading: true,
    });
    await axios.post(`${ApiServer}/api/v1/user/resend-confirmation`, { email });
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading, textColor, email } = this.state;
    if (loading === true) {
      return (
        <div style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          height: '500px',
        }}
        >
          <BarLoader
            className={override}
            sizeUnit="px"
            height={4}
            width={400}
            color="#3e78c0"
            loading
          />
        </div>
      );
    }

    return (
      <div style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'column',
      }}
      >
        <Text style={{
          fontSize: '32px',
          color: textColor,
          textAlign: 'center',
          padding: '10px',
        }}
        >
          <FormattedMessage id="success-register.account-almost-ready" />
        </Text>
        <p style={{
          color: textColor,
          textAlign: 'center',
          padding: '10px',
        }}
        >
          <FormattedMessage id="success-register.message-sent" />
          {' '}
          {email}
          {' '}
          <br />
          <FormattedMessage id="success-register.check-email" />
        </p>
        <p style={{
          color: textColor,
          textAlign: 'center',
          padding: '10px',
        }}
        >
          <FormattedMessage id="success-register.verify-spam-folder" />
          {' '}
          <button
            style={{
              color: textColor,
              textDecoration: 'none',
              borderBottom: `2px dotted ${textColor}`,
              cursor: 'pointer',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              background: 'transparent',
            }}
            type="button"
            onClick={() => (this.resend(email))}
          >
            <FormattedMessage id="success-register.resend" />
          </button>
          {' '}
          <FormattedMessage id="success-register.to-try-again" />
        </p>
      </div>
    );
  }
}

export default SuccessfulPortion;
