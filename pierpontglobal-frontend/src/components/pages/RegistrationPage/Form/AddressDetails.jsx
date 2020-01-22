import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import TextField from "@material-ui/core/TextField";
import { MenuItem } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { CountriesList } from "../../../../Defaults";

class AddressDetails extends Component {
  constructor(props) {
    super(props);

    const { values } = this.props;

    this.state = {
      values
    };

    this.saveAndContinue = this.saveAndContinue.bind(this);
    this.back = this.back.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const newValues = nextProps.values;
    const { values } = this.state;
    if (newValues !== values) {
      this.setState({
        values: newValues
      });
    }
  }

  saveAndContinue(e) {
    e.preventDefault();
    this.props.nextStep();
  }

  back(e) {
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    const { values } = this.state;

    console.log(values);

    return (
      <Form color="blue">
        <h1 className="ui centered">Location Details</h1>
        <Form.Field>
          <TextField
            id="standard-select-currency"
            style={{
              width: "100%"
            }}
            required
            ref={node => {
              this.country = node;
            }}
            select
            label="Country"
            value={values.country}
            onChange={node => this.props.handleChange("country", node)}
            SelectProps={{
              name: "country",
              autoComplete: "country",
              MenuProps: {}
            }}
            helperText="Please select your currency"
            margin="normal"
          >
            {CountriesList.map(option => (
              <MenuItem key={option.key} value={option.name.en}>
                {option.name.en}
              </MenuItem>
            ))}
          </TextField>
        </Form.Field>
        <Form.Field>
          <TextField
            style={{
              marginTop: "5px",
              width: "100%"
            }}
            required
            onChange={node => this.props.handleChange("city", node)}
            label="City"
            name="city"
            autoComplete="address-level2"
            value={values.city}
          />
        </Form.Field>
        <Form.Field>
          <TextField
            style={{
              marginTop: "5px",
              width: "100%"
            }}
            onChange={node => this.props.handleChange("zipcode", node)}
            name="zip"
            autoComplete="postal-code"
            label="Zip code"
            value={values.zipcode}
          />
        </Form.Field>
        <Form.Field>
          <TextField
            style={{
              marginTop: "5px",
              width: "100%"
            }}
            required
            onChange={node => this.props.handleChange("address1", node)}
            name="address"
            autoComplete="address-line1"
            label="Primary address"
            value={values.address1}
          />
        </Form.Field>
        <Form.Field>
          <TextField
            style={{
              marginTop: "5px",
              width: "100%"
            }}
            margin="normal"
            onChange={node => this.props.handleChange("address2", node)}
            name="address"
            autoComplete="address-line2"
            label="Secondary Address (Optional)"
            value={values.address2}
          />
        </Form.Field>
        <Button variant="contained" color="secondary" onClick={this.back}>
          Back
        </Button>{" "}
        <Button
          variant="contained"
          color="primary"
          onClick={this.saveAndContinue}
        >
          Save and continue{" "}
        </Button>
      </Form>
    );
  }
}

export default AddressDetails;
