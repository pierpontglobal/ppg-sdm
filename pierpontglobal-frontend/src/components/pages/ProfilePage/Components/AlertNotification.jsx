import React from 'react';
import './styles.css';

class AlertNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: true,
    };
  }

  render() {
    let color = '#CC0000';

    switch (this.props.level) {
      case 1: color = 'rgb(16,179,100)'; break;
      case 2: color = '#ffa500'; break;
      default: color = '#CC0000'; break;
    }

    return (
      <div
        className="info-bar-styler"
        style={{
          display: this.state.showing ? 'flex' : 'none',
          backgroundColor: color,
          color: '#ffffff',
          padding: '10px 20px',
          minHeight: '50px',
          flexDirection: 'column',
          justifyItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {this.props.children}
        { this.props.removable ? (
          <i
            className="fas fa-times-circle close"
            onClick={() => {
              this.setState({
                showing: false,
              });
            }}
          />
        ) : <div /> }
      </div>
    );
  }
}

export default AlertNotification;
