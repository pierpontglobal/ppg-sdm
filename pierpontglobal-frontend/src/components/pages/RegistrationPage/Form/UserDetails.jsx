// UserDetails.jsx
import React, { Component } from 'react';
import axios from 'axios';
import { Form } from 'semantic-ui-react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { ApiServer } from '../../../../Defaults';

const validator = require('email-validator');

class UserDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      incorrectEmail: false,
    };

    this.checkEmail = this.checkEmail.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
  }

  saveAndContinue(e) {
    e.preventDefault();
    this.props.nextStep();
  }

  changeVisualStatus(color) {
    this.email.style.borderColor = color;
    this.email.style.borderWidth = '2px';
    this.email.style.boxShadow = 'none';
    this.email.style.borderStyle = 'solid';
  }

  async checkEmail(node) {
    const goodFormat = validator.validate(node.target.value);
    this.props.handleChange('email', node);
    if (!goodFormat) {
      this.submitButton.disabled = true;
      this.setState({
        incorrectEmail: true,
      });
      return true;
    }
    const response = await axios.get(`${ApiServer}/api/v1/user/availability?email=${this.email.value}`);
    this.submitButton.disabled = !response.data.available;
    if (!response.data.available) {
      this.setState({
        incorrectEmail: true,
      });
    } else {
      this.setState({
        incorrectEmail: false,
      });
    }
  }

  render() {
    const { values } = this.props;
    const { incorrectEmail } = this.state;
    return (
      <Form>
        <h1 className="ui centered">Enter User Details</h1>

        <Form.Field>
          <TextField
            style={{
              width: '100%',
            }}
            required
            onChange={node => this.props.handleChange('firstName', node)}
            label="First Name"
            name="fname"
            value={values.firstName}
            autoComplete="given-name"
          />
        </Form.Field>
        <Form.Field>
          <TextField
            style={{
              marginTop: '5px',
              width: '100%',
            }}
            required
            onChange={node => this.props.handleChange('lastName', node)}
            label="Last Name"
            name="lname"
            value={values.lastName}
            autoComplete="family-name"
          />
        </Form.Field>
        <Form.Field>
          <TextField
            error={incorrectEmail}
            style={{
              marginTop: '5px',
              width: '100%',
            }}
            required
            onChange={(node) => { this.checkEmail(node); }}
            label="Email Address"
            type="email"
            autoComplete="email"
            value={values.email}
            ref={(node) => { this.email = node; }}
          />
        </Form.Field>
        <Form.Field>
          <TextField
            style={{
              marginTop: '5px',
              width: '100%',
            }}
            onChange={node => this.props.handleChange('phonenumber', node)}
            label="Phone number"
            type="tel"
            required
            margin="normal"
            name="phone"
            value={values.phonenumber}
            autoComplete="tel"
          />
        </Form.Field>
        <Button variant="contained" color="primary" ref={node => this.submitButton = node} onClick={this.saveAndContinue}>Confirm and continue</Button>
      </Form>
    );
  }
}

export default UserDetails;
