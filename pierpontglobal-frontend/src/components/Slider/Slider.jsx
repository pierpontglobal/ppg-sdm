import React, { Component } from 'react';
import 'rc-drawer/assets/index.css';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { withStyles } from '@material-ui/core/styles';
import SliderOptions from './slider-options/SliderOptions';

const styles = () => ({
  drawer: {
    width: '80%',
  },
  paper: {
    width: '100%',
  },
});
class Slider extends Component {
  goToAction = (url) => {
    // Propagate ation to parent
    if (this.props.afterOptionclick) {
      this.props.afterOptionclick(url);
    }
  }

  render() {
    const {
      open, children, options,
    } = this.props;
    return (
      <SwipeableDrawer
        open={open}
        onClose={this.props.handleClose}
        onOpen={this.props.handleOpen}
      >
        <div style={{ minWidth: '270px' }}>
          {
            (children) || (<SliderOptions options={options} onClickOption={this.goToAction} />)
          }
        </div>
      </SwipeableDrawer>
    );
  }
}

export default withStyles(styles)(Slider);
