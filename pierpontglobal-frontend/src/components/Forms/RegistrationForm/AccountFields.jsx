import axios from 'axios';
import React from 'react';
import { AsYouType } from 'libphonenumber-js';
import posed from 'react-pose';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { ApiServer } from '../../../Defaults';

const Spinner = posed.i({
  rotate: {
    rotate: (300 * 2 * 360),
    transition: {
      duration: (1000 * 300),
      ease: 'linear',
    },
  },
  normal: {
    rotate: 0,
  },
});

const styles = {
  root: {
    width: '100%',
    background: '#EEEEEE !important',
  },
};

const validator = require('email-validator');

function printNumber(e) {
  e.target.value = new AsYouType('US').input(e.target.value);
}

class AccountFields extends React.Component {
  constructor(props) {
    super(props);

    this.saveAndContinue = this.saveAndContinue.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.changeStateLoader = this.changeStateLoader.bind(this);

    this.state = {
      wrongEmail: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    };

    this.handleChange = this.handleChange.bind(this);

    // Form labels
    this.firstnameLabel = <FormattedMessage id="home.signup-form.firstname-label" />;
    this.lastnameLabel = <FormattedMessage id="home.signup-form.lastname-label" />;
    this.emailLabel = <FormattedMessage id="home.signup-form.email-label" />;
    this.phoneLabel = <FormattedMessage id="home.signup-form.phone-label" />;
  }

  async saveAndContinue(e) {
    e.preventDefault();
    this.props.nextButton();

    const {
      firstName,
      lastName,
      email,
      phone,
    } = this.state;

    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phone,
    };

    this.props.fieldValues.email = email;
    await axios.post(`${ApiServer}/api/v1/user/subscription`, data);
    this.props.loadinStop();
    return false;
  }

  changeStateLoader(state) {
    this.rotatingState = state;
    this.forceUpdate();
  }

  changeVisualStatus(color) {
    this.email.style.borderColor = color;
    this.email.style.borderWidth = '2px';
    this.email.style.boxShadow = 'none';
    this.email.style.borderStyle = 'solid';
  }

  async checkEmail(node) {
    await this.handleChange('email', node);
    const { email } = this.state;
    this.changeStateLoader('rotate');
    const goodFormat = validator.validate(email);
    if (!goodFormat) {
      this.submitButton.disabled = true;
      this.changeStateLoader('normal');
      this.setState({ wrongEmail: true });
      return true;
    }
    const response = await axios.get(`${ApiServer}/api/v1/user/availability?email=${email}`);
    this.changeStateLoader('normal');
    this.submitButton.disabled = !response.data.available;
    if (!response.data.available) {
      this.setState({ wrongEmail: true });
    } else {
      this.setState({ wrongEmail: false });
    }
    return true;
  }

  async handleChange(key, node) {
    if (key === 'phone') {
      printNumber(node);
    }
    await this.setState({
      [key]: node.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    const {
      wrongEmail,
      firstName,
      lastName,
      email,
      phone,
    } = this.state;

    const privacyLink = (
      <a style={{ color: this.props.textColor, textDecoration: 'none', borderBottom: `2px dotted ${this.props.textColor}` }} href="https://www.iubenda.com/privacy-policy/24475288" className="iubenda-nostyle no-brand iubenda-embed" title="Privacy Policy ">
        <FormattedMessage id="label.privacy-policy" />
      </a>
    );

    return (
      <div style={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >

        <form
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onSubmit={this.saveAndContinue}
        >

          <p
            style={{
              color: this.props.textColor,
              fontSize: '28px',
            }}
            className="subtitle-medium"
          >
            <FormattedMessage id="home.signup-form.title" />
          </p>

          <TextField
            label={this.firstnameLabel}
            autoComplete="given-name"
            type="text"
            name="fname"
            value={firstName}
            style={{
              width: '100%',
              maxWidth: '300px',
              marginBottom: '10px',
            }}
            onChange={(node) => { this.handleChange('firstName', node); }}
            InputProps={{
              className: classes.root,
              required: true,
            }}
            variant="filled"
          />

          <TextField
            label={this.lastnameLabel}
            autoComplete="family-name"
            type="text"
            name="lname"
            value={lastName}
            style={{
              width: '100%',
              maxWidth: '300px',
              marginBottom: '10px',
            }}
            onChange={(node) => { this.handleChange('lastName', node); }}
            InputProps={{
              className: classes.root,
              required: true,
            }}
            variant="filled"
          />

          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '300px',
              marginBottom: '10px',
            }}
          >

            <TextField
              error={wrongEmail}
              label={this.emailLabel}
              autoComplete="email"
              type="email"
              name="email"
              value={email}
              style={{
                width: '100%',
                maxWidth: '300px',
              }}
              onChange={(node) => { this.checkEmail(node); }}
              InputProps={{
                className: classes.root,
                required: true,
              }}
              variant="filled"
            />

            <Spinner
              pose={this.rotatingState}
              style={{
                position: 'absolute',
                right: -35,
                margin: 'auto',
                top: 0,
                bottom: 0,
                alignItems: 'center',
                display: this.rotatingState === 'rotate' ? 'flex' : 'none',
              }}
              className="fas fa-spinner"
            />
          </div>

          <TextField
            label={this.phoneLabel}
            autoComplete="tel"
            type="tel"
            name="phone"
            value={phone}
            style={{
              width: '100%',
              maxWidth: '300px',
              marginBottom: '10px',
            }}
            onChange={(node) => { this.handleChange('phone', node); }}
            InputProps={{
              className: classes.root,
              required: true,
            }}
            variant="filled"
          />

          <button
            disabled
            className="border-0 button-check"
            type="submit"
            ref={(node) => { this.submitButton = node; }}
            style={{
              marginTop: '5px',
              maxWidth: '300px',
              width: '80%',
              height: '40px',
              marginBottom: '10px',
              color: 'white',
              borderRadius: '4px',
            }}
          >
            <FormattedMessage id="home.signup-form.button" />
          </button>

          <p style={{ color: this.props.textColor, maxWidth: '300px' }} className="subtitle-follow-up">
            <FormattedMessage id="signup-form.disclaimer" values={{ privacy: privacyLink }} />
          </p>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(AccountFields);
