import React from 'react';
import './styles.css';
import posed from 'react-pose';
import { FormattedMessage } from 'react-intl';

const FlyDownDiv = posed.div({
  normal: {
    y: -1000,
  },
  flyin: {
    y: 0,
    transition: {
      delay: 500,
      ease: 'backInOut',
    },
  },
});

class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textPlace: 'normal',
    };
  }

  componentDidMount() {
    this.setState({ textPlace: 'flyin' });
  }

  render() {
    return (
      <div>
        <FlyDownDiv pose={this.state.textPlace} className="center-holder">
          <span className="big-text">404</span>
          <div>
            <FormattedMessage id="label.not-found-page" />
          </div>
        </FlyDownDiv>
      </div>
    );
  }
}

export default NotFoundPage;
