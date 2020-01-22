import React from 'react';
import { Card } from 'semantic-ui-react';
import './styles.css';

class StatHolder extends React.Component {
  constructor(props) {
    super(props);
    const {
      logo, title, value, className,
    } = this.props;
    this.state = {
      logo: logo || <i className="fas fa-question-circle" />,
      value,
      title,
      className,
    };
  }

  render() {
    const {
      logo, title, value, className,
    } = this.state;
    return (
      <Card className="shadow stat-holder">
        <div>

          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {logo}
            <p style={{ padding: '0 10px' }}>
              {title}
            </p>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            justifyItems: 'center',
            alignItems: 'center',
            alignContent: 'center',
            width: '100%',
            minHeight: '70px',
            fontSize: '40px',
          }}
          >
            <p className={className}>{value}</p>
          </div>
        </div>
      </Card>
    );
  }
}

export default StatHolder;
