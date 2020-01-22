import React, { Component } from 'react';
import LanguageIcon from '@material-ui/icons/Language';
import styled from 'styled-components';
import Popper from '@material-ui/core/Popper';
import { IconButton } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import { withStyles } from '@material-ui/core/styles';
import Languages from './languages/Languages';

const styles = theme => ({
  iconButton: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0);',
    },
  },
  margin: {
    margin: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 3,
  },
});

const CustomPopper = styled(Popper)`
  width: 100% !important;
  height: 100% !important;
  transform: none !important;
  top: 60px !important;
  background-color: white !important;
  @media only screen and (min-width: 748px) {
    width: 18% !important;
    right: 12% !important;
    left: auto !important;
    height: 65% !important;
  }
`;

const Wrapper = styled.div`
  margin-right: 0px;
  @media only screen and (min-width: 768px) {
    margin-left: 32px;
  }
`;

const LanguageIconLabeled = styled(IconButton)`
:hover::after {
  content: 'Change language';
  padding: 4px;
  font-size: 12px;
  border-radius: 4px;
  width: 100px;
  color: white;
  background-color: rgb(59, 68, 75);
  position: absolute;
  top: 48px;
  text-align: center;
  font-weight: 200;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.1);
  transition: 1s;
}
:hover::before {
  content: '';
  position: absolute;
  top: 40px;
  text-align: center;
  font-weight: 200;
  width: 0; 
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  position: absolute;
  color: white;
  border-bottom: 20px solid rgb(59, 68, 75);
  transition: 1s;
}
`;

class LanguageSwitch extends Component {
  state = {
    open: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { open } = this.state;
    const { classes, languages, setLang } = this.props;
    return (
      <Wrapper>
        <LanguageIconLabeled
          disableRipple
          onClick={this.handleOpen}
          className={classes.iconButton}
          buttonRef={(node) => {
            this.anchorEl = node;
          }}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
        >
          <LanguageIcon color="primary" />
        </LanguageIconLabeled>
        <CustomPopper color="primary" open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              color="primary"
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom', width: '100%' }}
            >
              <ClickAwayListener onClickAway={this.handleClose}>
                <div style={{ width: '100%', backgroundColor: '#2c5587' }}>
                  <Languages
                    handleClose={this.handleClose}
                    setLang={setLang}
                    languages={languages}
                  />
                </div>
              </ClickAwayListener>
            </Grow>
          )}
        </CustomPopper>
      </Wrapper>
    );
  }
}

export default withStyles(styles)(LanguageSwitch);
