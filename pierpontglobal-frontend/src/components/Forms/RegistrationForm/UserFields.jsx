import React from 'react';
import Button from '../../Btn/Btn';
import Input from '../../styles/Input/Input';

const lookup = require('country-data').lookup;

class UserFields extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      country: '',
    };

    this.saveAndContinue = this.saveAndContinue.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
  }

  selectCountry(val) {
    val = lookup.countries({ name: val })[0];
    this.country = val.alpha2;
  }

  saveAndContinue() {
    this.props.nextButton({
      username: this.username.value,
      password: this.password.value,
      rePassword: this.rePassword.value,
    }, 4);
  }

  render() {
    return (
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

        <Input
          style={{
            marginTop: '10px',
          }}
          className="w-100 h-100 pl-2 border-0"
          type="text"
          backgroundColor="#EEEEEE"
          ref={(node) => { this.username = node; }}
          lineHeight={1.31}
          maxWidth="300px"
          maxHeight="40px"
          borderRadius="4px"
          placeholder="Username"
          required
        />

        <Input
          style={{
            marginTop: '10px',
          }}
          className="w-100 h-100 pl-2 border-0"
          type="password"
          backgroundColor="#EEEEEE"
          lineHeight={1.31}
          ref={(node) => { this.password = node; }}
          maxWidth="300px"
          maxHeight="40px"
          borderRadius="4px"
          placeholder="Password"
          required
        />

        <Input
          style={{
            marginTop: '10px',
            marginBottom: '10px',
          }}
          className="w-100 h-100 pl-2 border-0"
          type="password"
          backgroundColor="#EEEEEE"
          ref={(node) => { this.rePassword = node; }}
          lineHeight={1.31}
          maxWidth="300px"
          maxHeight="40px"
          borderRadius="4px"
          placeholder="Confirm password"
          required
        />

        <Button
          type="submit"
          style={{ marginTop: '12px' }}
          width="80%"
          maxWidth="300px"
          color="#3e78c0"
        >
            Register
        </Button>

      </form>
    );
  }
}

export default UserFields;
