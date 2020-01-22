import React, { Component } from 'react';
import './styles.css';
import { Button } from 'semantic-ui-react';

class Success extends Component {
  constructor(props) {
    super(props);
    this.spinner_stat = 'normal';
    this.back = this.back.bind(this);
  }

  componentDidMount() {
    this.spinner_stat = 'rotate';
  }

  back(e) {
    e.preventDefault();
    this.props.prevStep();
  }

  render() {
    if (this.props.loading === 'loading') {
      return (
        <div>
          <h1 className="ui centered">Sending registration form</h1>
          <i style={{ fontSize: '48px', color: '#000000', float: 'right' }} className="fas fa-spinner loading" />
        </div>
      );
    } if (this.props.loading === 'success') {
      return (
        <div>
          <h1 className="ui centered">Details Successfully Saved</h1>
          <p>Your account is ready! go ahead and login with your credentials</p>
          <i style={{ fontSize: '48px', color: '#2db742', float: 'right' }} className="fas fa-check" />
        </div>
      );
    }
    return (
      <div>
        <h1 className="ui centered">Something went wrong</h1>
        <p>Go back and review your data, if you need help contact support.</p>
        <Button onClick={this.back}>Back</Button>
        <i style={{ fontSize: '48px', color: '#cc0000', float: 'right' }} className="fas fa-times" />
      </div>
    );
  }
}

export default Success;
