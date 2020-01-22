import React from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import Button from '../../Btn/Btn';
import Input from '../../styles/Input/Input';

class AddressFields extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      country: props.fieldValues.country,
    };

    this.country_code = props.fieldValues.country;
    this.saveAndContinue = this.saveAndContinue.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
  }

  selectCountry(val) {
    // const lookupVal = lookup.countries({ name: val })[0];
    this.setState({ country: val });
    this.country_code = val;
  }

  saveAndContinue() {
    this.props.nextButton({
      country: this.country_code,
      city: this.city.value,
      zip: this.zip.value,
      address1: this.address1.value,
      address2: this.address2.value,
    }, 3);
  }

  render() {
    const { country } = this.state;

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
        <CountryDropdown
          style={{
            width: '300px',
            height: '40px',
            backgroundColor: '#EEEEEE',
          }}
          ref={(node) => { this.country = node; }}
          value={country}
          onChange={val => this.selectCountry(val)}
          required
        />

        <Input
          style={{
            marginTop: '10px',
          }}
          className="w-100 h-100 pl-2 border-0"
          type="text"
          backgroundColor="#EEEEEE"
          ref={(node) => { this.city = node; }}
          lineHeight={1.31}
          maxWidth="300px"
          maxHeight="40px"
          borderRadius="4px"
          placeholder="Your city"
          defaultValue={this.props.fieldValues.city}
          required
        />

        <Input
          style={{
            marginTop: '10px',
          }}
          className="w-100 h-100 pl-2 border-0"
          type="text"
          backgroundColor="#EEEEEE"
          lineHeight={1.31}
          ref={(node) => { this.zip = node; }}
          maxWidth="300px"
          maxHeight="40px"
          borderRadius="4px"
          placeholder="Your zip code"
          defaultValue={this.props.fieldValues.zip}
          required
        />

        <Input
          style={{
            marginTop: '10px',
          }}
          className="w-100 h-100 pl-2 border-0"
          type="text"
          backgroundColor="#EEEEEE"
          ref={(node) => { this.address1 = node; }}
          lineHeight={1.31}
          maxWidth="300px"
          maxHeight="40px"
          borderRadius="4px"
          placeholder="Primary Address"
          defaultValue={this.props.fieldValues.address1}
          required
        />

        <Input
          style={{
            marginTop: '10px',
            marginBottom: '10px',
          }}
          className="w-100 h-100 pl-2 border-0"
          type="text"
          backgroundColor="#EEEEEE"
          ref={(node) => { this.address2 = node; }}
          lineHeight={1.31}
          maxWidth="300px"
          maxHeight="40px"
          borderRadius="4px"
          placeholder="Secondary Address"
          defaultValue={this.props.fieldValues.address2}
          required
        />

        <Button
          type="submit"
          style={{ marginTop: '12px', maxWidth: '300px' }}
          width="80%"
          maxWidth="300px"
          color="#3e78c0"
        >
            One step more >>
        </Button>

      </form>
    );
  }
}

export default AddressFields;
