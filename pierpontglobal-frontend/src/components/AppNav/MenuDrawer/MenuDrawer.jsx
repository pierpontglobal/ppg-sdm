import React, { Component } from 'react';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import Phone from '@material-ui/icons/Phone';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SettingsIconMui from '@material-ui/icons/Settings';
import Input from '@material-ui/icons/Input';
import CollectionMuiIcon from '@material-ui/icons/CollectionsBookmark';
import styled from 'styled-components';
import { withCookies } from 'react-cookie';
import { FormattedMessage } from 'react-intl';
import HelpIconMui from '@material-ui/icons/Help';
import SliderOptions from '../../Slider/slider-options/SliderOptions';
import AccountPanel from '../../AccountPanel/AccountPanel';
import Slider from '../../Slider/Slider';


// To avoid performance issues I've declared this variables up here
const labelMarket = <FormattedMessage id="label.market" />;
const labelContact = <FormattedMessage id="label.contact-us" />;
const labelProfile = <FormattedMessage id="label.profile" />;
const labelSignin = <FormattedMessage id="label.sign-in" />;

const MenuTitle = styled.div`
  width: 100%;
  min-height: 80px;
  padding: 16px;
  text-align: center;
  margin-top: 8px;
  font-weight: 600;
  font-size: 1.25rem;
`;

class MenuDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.state.open !== newProps.open) {
      this.setState({
        open: newProps.open,
      });
    }
  }

  userIsLoggedIn = () => !!this.props.cookies.get('token', { path: '/' })

  showLoginModal = () => {
    this.setState({
      open: false,
    });
    this.props.showSignIn();
  }

  showSavedCars = () => {
    this.setState({
      open: false,
    }, () => {
      this.props.showSavedCars()
    });
  }

  showSettings = () => {
    this.setState({
      open: false,
    }, () => {
      this.props.showSettings()
    });
  }

  render() {
    const {
      onMaskClick, afterOptionclick, onRequestOpen, dealer,
    } = this.props;
    const { open } = this.state;

    let menuOptions = [
      { label: labelMarket, icon: <DirectionsCar color="primary" />, urlMatch: '/marketplace' },
      { label: labelContact, icon: <Phone color="primary" />, urlMatch: '/contact-us' },
      { label: labelProfile, icon: <AccountCircle color="primary" />, urlMatch: '/user' },
      { label: 'My saved cars', icon: <CollectionMuiIcon color="primary" />, handleClick: this.showSavedCars },
      { label: 'Help & support', icon: <HelpIconMui color="primary" />, urlMatch: '/support' },
      { label: 'Settings', icon: <SettingsIconMui color="primary" />, handleClick: this.showSettings },
    ];

    if (!this.userIsLoggedIn()) {
      menuOptions = [
        { label: 'Help & support', icon: <HelpIconMui color="primary" />, urlMatch: '/support' },
        { label: labelContact, icon: <Phone color="primary" />, urlMatch: '/contact-us' },
        { label: labelSignin, icon: <Input color="primary" />, urlMatch: '/' },
      ];
    }

    if (window.location.pathname.includes('/user')) {
      return (
        <Slider
          open={open}
          handleClose={onMaskClick}
          handleOpen={onRequestOpen}
        >
          <AccountPanel
            dealer={dealer}
            inner={(<SliderOptions options={menuOptions} onClickOption={afterOptionclick} />)}
          />
        </Slider>
      );
    }
    return (
      <>
        <Slider
          open={open}
          swipeAreaWidth={20}
          disableSwipeToOpen={false}
          handleClose={onMaskClick}
          handleOpen={onRequestOpen}
        >
          <MenuTitle>
            <FormattedMessage id="label.menu" />
          </MenuTitle>
          <SliderOptions options={menuOptions} onClickOption={afterOptionclick} />
        </Slider>
      </>
    );
  }
}

export default withCookies(MenuDrawer);
