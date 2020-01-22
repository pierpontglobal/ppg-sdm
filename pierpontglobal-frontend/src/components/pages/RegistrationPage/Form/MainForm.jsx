import React, { Component } from 'react';
import axios from 'axios';
import iplocation from 'iplocation';
import ip from 'public-ip';
import UserDetails from './UserDetails';
import AddressDetails from './AddressDetails';
import AccountDetails from './AccountDetails';
import Success from './Success';
import { ApiServer } from '../../../../Defaults';

const qs = require('query-string');

class MainForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'loading',
      username: '',
      step: 1,
      firstName: '',
      lastName: '',
      email: '',
      phonenumber: '',
      age: '',
      city: '',
      country: '',
      zipcode: '',
      address1: '',
      address2: '',
      password1: '',
      password2: '',
    };
    this.changeEmail = this.changeEmail.bind(this);
    this.params = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    this.setInformation = this.setInformation.bind(this);
    this.setCountry = this.setCountry.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.setInformation();


    (async () => {
      iplocation(await ip.v4(), [], (error, res) => {
        this.setState({
          country: res.country,
          city: res.city,
          zipcode: res.postal,
        });
      });
    })();
  }

  setCountry(value) {
    this.setState({
      country: value,
    }, console.log(this.state));
  }

  async setInformation() {
    if (!this.params.token) {
      return false;
    }
    const response = await axios.get(`${ApiServer}/api/v1/user/subscription?token=${this.params.token}`);
    if (response) {
      try {
        this.setState({
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          email: response.data.email,
          phonenumber: response.data.phone_number,
        });
      } catch (e) {
        // Test
      }
    }
    return true;
  }

  async handleChangePassword(node, ik) {
    if (ik === 1) {
      await this.setState({
        password1: node,
      });
    } else {
      await this.setState({
        password2: node,
      });
    }
    console.log(this.state.password1);
    console.log(this.state.password2);
    if (this.state.password1 === this.state.password2) {
      return true;
    }
    return false;
  }

  nextStep() {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  }

  prevStep() {
    const { step } = this.state;
    this.setState({
      step: step - 1,
      status: 'loading',
    });
  }

  handleChange(input, event) {
    console.log(input);
    this.setState({ [input]: event.target.value }, () => console.log(this.state));
  }

  changeEmail(value) {
    this.setState({ email: value });
  }

  async sendRequest() {
    this.nextStep();

    const {
      username,
      firstName,
      lastName,
      email,
      phonenumber,
      city,
      country,
      zipcode,
      address1,
      address2,
      password1,
    } = this.state;

    const data = {
      email,
      password: password1,
      username,
      phone_number: phonenumber,
      first_name: firstName,
      last_name: lastName,
      address: {
        country,
        city,
        zip_code: zipcode,
        primary_address: address1,
        secondary_address: address2,
      },
    };
    try {
      const response = await axios.post(`${ApiServer}/api/v1/users`, data);
      if (response.status === 200) {
        this.setState({
          status: 'success',
        });
      }
    } catch (e) {
      this.setState({
        status: 'error',
      });
    }
  }

  render() {
    const { step } = this.state;
    const { status } = this.state;
    const {
      username, firstName, lastName, email, phonenumber, city, country, zipcode, address1, address2,
    } = this.state;
    const values = {
      username, firstName, lastName, email, phonenumber, city, country, zipcode, address1, address2,
    };
    switch (step) {
      default:
        return (
          <UserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            changeEmail={this.changeEmail}
          />
        );
      case 2:
        return (
          <AddressDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            setCountry={this.setCountry}
          />
        );
      case 3:
        return (
          <AccountDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            sendRequest={this.sendRequest}
            handleChangePassword={this.handleChangePassword}
          />
        );
      case 4:
        return (
          <Success
            prevStep={this.prevStep}
            loading={status}
          />
        );
    }
  }
}

export default MainForm;
