/**
 * @desc Rewrite Application Navbar - Wednesday, May 29 - 2019
 * @author Daniel Peña
 * 
 */

import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Img from 'react-image';
import ArrowIconMui from '@material-ui/icons/KeyboardArrowDown';
import BurgerIconMui from '@material-ui/icons/Menu';
import { withCookies } from 'react-cookie';
import UserMenuComponent from './UserMenu/UserMenuComponent';
import { AppNavHeight } from '../../constants/ApplicationSettings';
import ApplicationRoutes from '../../constants/Routes';
import NotificatinBadge from './notification-badge/NotificatinBadge';
import MenuDrawer from './MenuDrawer/MenuDrawer';
import SettingsModalContent from './SettingsModalContent/SettingsModalContent';
import PPGModal from '../ppg-modal/PPGModal';
import Axios from 'axios';
import { ApiServer } from '../../Defaults';

const Wrapper = styled.div`
  width: 100%;
  height: ${`${AppNavHeight}px`};
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  box-shadow: 0px 4px 8px 0px rgb(0, 0, 0, 0.16);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppNavWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 6fr 3fr;
  grid-template-rows: auto;

  @media only screen and (max-width: 768px) {
    grid-template-columns: auto auto;
    grid-template-rows: auto;
  }
`;

const AppLogo = styled.div`
  background: transparent;
  align-items: center;
  max-height: 40px;
  border: none;
  cursor: pointer;
`;

const LogoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 768px) {
    justify-content: flex-start;
    margin-left: 12px;
  }
`;

const MobileIcons = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const BurgerWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

const BurgerIcon = styled(BurgerIconMui)`
  color: #000;
  margin-right: 12px;
`;

const NavbarItems = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ProfileIconWrapper = styled.div`
  height: 100%;
  width: 220px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const UserImageWrapper = styled.div`
  position: relative;
  & > img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    box-shadow: 0px 0px 4px 0px rgb(0, 0, 0, 0.1);
  }
`;

const UserNameWrapper = styled.div`
  margin-left: 16px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & > span {
    color: darkgray;
  }
`;

const ArrowWrapper = styled.div`
  margin-left: 12px;
  transition: all 0.2s;
  transform: ${props => props.isOpen ? 'rotate(-180deg)' : 'none'};
`;

const ArrowIcon = styled(ArrowIconMui)`
  color: darkgray;
  cursor: pointer;
`;

const NavbarLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const NavbarLink = styled.div`
  width: auto;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 12px;
  margin: 0px 12px;
  cursor: pointer;
  & > span {
    font-size: ${props => props.active ? '1.05rem' : '1.0rem'};
    font-weight: ${props => props.active ? '400' : '100'};
    transition: all 0.2s;
    font-weight: 400;
    color: rgb(0, 0, 0, 0.6);
  }
  &:hover {
    & > span {
      color: rgb(0, 0, 0, 1);
    }
  }
`;

const BottomIndicator = styled.div`
  width: 100%;
  height: 3px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  background-color: ${props => props.active ? '#32619a' : 'white'};
`;

const NotificatinBadgeWrapper = styled.div`
  height: 100%;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const PossibleLongTextFormatter = (text, maxLength) => {
  if (text.length > maxLength) {
    return `${text.substr(0, maxLength)}...`;
  }
  return text;
};

class AppNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openSidemenu: false,
      openUserMenu: false,
      navbarLinks: [],
      showSettingsModal: false,
    };
  }

  componentWillMount = () => {
    this.createNavbarLinks();
  }

  componentWillReceiveProps = (newProps) => {
    if (!!newProps && !!newProps.location && !!newProps.location.pathname) {
      this.selectActiveNavbarLink(newProps.location.pathname);
    }
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  selectActiveNavbarLink = (pathname) => {
    let navbarLinks = [...this.state.navbarLinks];

    navbarLinks.forEach(link => {
      link.active = false;
    });

    if (window.location.href.includes(pathname)) {
      let navbarLink = navbarLinks.filter(x => x.url === pathname)[0];

      if (!!navbarLink) {
        const idx = navbarLinks.indexOf(navbarLink);
        navbarLinks[idx].active = true;

        this.setState({
          navbarLinks
        });
      }
    }
  }

  createNavbarLinks = () => {
    let navbarLinks = [
      {
        label: 'Marketplace',
        url: ApplicationRoutes.marketplace,
        active: false,
      },
      {
        label: 'Contact us',
        url: ApplicationRoutes.contactPage,
        active: false,
      }
    ];
    this.setState({
      navbarLinks
    });
  }

  addConstructionLink = (roles) => {
    let navbarLinks = [...this.state.navbarLinks];
    console.log('will add construction link!', roles);
    if (!!roles) {
      const constructionRole = roles.find(x => x.toLowerCase() === "construction");
      if (!!constructionRole) {
        navbarLinks.unshift({
          label: 'Construction',
          url: ApplicationRoutes.constructionPage,
          active: false
        });
      }
    }
    this.props.onRef(undefined);
    this.setState({
      navbarLinks
    })
  }

  toggelUserMenu = () => {
    this.setState((prevState) => ({
      openUserMenu: !prevState.openUserMenu,
    }))
  }

  handleSignOut = () => {
    const { history } = this.props;
    // remove cookies
    this.removeCookies();
    history.push(ApplicationRoutes.home);
  }

  removeCookies = () => {
    const { cookies } = this.props;
    cookies.remove('token', { path: '/' });
    cookies.remove('one_signal_uuid', { path: '/' });
    Axios.delete(`${ApiServer}/api/v2/users/logout`);
  }

  goToAction = (url) => {
    const { openUserMenu, openSidemenu } = this.state;
    if (openUserMenu) {
      this.toggelUserMenu();
    }

    if (openSidemenu) {
      this.onTouchEnd();
    }

    if (url.charAt(0) === '/') {
      this.props.history.push(url);
    } else {
      this.props.history.push(`/${url}`);
    }
  }

  handleOpenSavedCars = () => {
    if (!!this.props.handleOpenSavedCars) {
      this.toggelUserMenu();
      this.props.handleOpenSavedCars();
    }
  }

  toggleSettingsModal = () => {
    this.setState((prevState) => ({
      showSettingsModal: !prevState.showSettingsModal,
    }));
  }

  handleDrawerOpen = () => {
    this.setState({
      openSidemenu: true,
    });
  }

  onTouchEnd = () => {
    this.setState({
      openSidemenu: false,
    });
  }

  shortStringTo = (text, chars) => {
    if (text && text.length > chars) {
      let cutted = text.substr(0, chars);
      cutted = cutted + "..."
      return cutted;
    }
    return text;
  }

  switchLanguage = (lang) => {
    if (!!this.props.setLang) {
      this.toggelUserMenu();
      this.props.setLang(lang);
    }
  }

  render() {
    const { openUserMenu, navbarLinks, openSidemenu, showSettingsModal } = this.state;
    const { user, languages } = this.props;

    const username = user.name ? this.shortStringTo(user.name, 18) : 'Car dealership';

    return (
      <>
        <MenuDrawer
          open={openSidemenu}
          onMaskClick={this.onTouchEnd}
          afterOptionclick={this.goToAction}
          showSignIn={() => { this.showSignIn(true); }}
          showSavedCars={this.handleOpenSavedCars}
          showSettings={this.toggleSettingsModal}
          onRequestOpen={this.handleDrawerOpen}
        />
        <PPGModal
          setOpen={showSettingsModal}
          handleClose={this.toggleSettingsModal}
          setPadding={false}
          onlyChildren
        >
          <SettingsModalContent toggleSettingsModal={this.toggleSettingsModal} />
        </PPGModal>
        <Wrapper>
          <AppNavWrapper>
            <LogoWrapper>
              <AppLogo>
                <Img
                  style={{
                    width: '40px',
                    cursor: 'pointer',
                  }}
                  alt="Pierpont Global, Inc"
                  className="logo"
                  src={[
                    '/logos/sm_logo.webp',
                    '/logos/sm_logo.jp2',
                    '/logos/sm_logo.jxr',
                    '/logos/sm_logo.png',
                  ]}
                  loader={
                    <div style={{ width: '40px', height: '40px', background: '#dedede' }} />
                  }
                />
              </AppLogo>
            </LogoWrapper>
            <MobileIcons>
              <NotificatinBadgeWrapper>
                <NotificatinBadge />
              </NotificatinBadgeWrapper>
              <BurgerWrapper onClick={this.handleDrawerOpen}>
                <BurgerIcon />
              </BurgerWrapper>
            </MobileIcons>
            <NavbarLinks>
              {
                navbarLinks.map((link, index) => (
                  <NavbarLink key={index} active={link.active} onClick={() => this.goToAction(link.url)}>
                    <span>
                      {link.label}
                    </span>
                    <BottomIndicator active={link.active} />
                  </NavbarLink>
                ))
              }
            </NavbarLinks>
            <NavbarItems>
              <NotificatinBadgeWrapper>
                <NotificatinBadge />
              </NotificatinBadgeWrapper>
              <ProfileIconWrapper>
                <UserImageWrapper>
                  <img alt={`${username} | Pierpont Global`} src={!!user.photo ? user.photo : '/images/no-user-photo.png'} />
                  {/* <CustomBagde>
                    <span>1</span>
                  </CustomBagde> */}
                </UserImageWrapper>
                <UserNameWrapper onClick={this.toggelUserMenu}>
                  <span>
                    {PossibleLongTextFormatter(username, 12)}
                  </span>
                </UserNameWrapper>
                <ArrowWrapper isOpen={openUserMenu} onClick={this.toggelUserMenu} r>
                  <ArrowIcon />
                </ArrowWrapper>
                {
                  !openUserMenu ? null : (
                    <UserMenuComponent
                      goToAction={this.goToAction}
                      handleToggle={this.toggelUserMenu}
                      handleSignOut={this.handleSignOut}
                      handleOpenSavedCars={this.handleOpenSavedCars}
                      switchLanguage={this.switchLanguage}
                      languages={languages}
                      openUserMenu={openUserMenu}
                      forceUpdate={this.props.forceUpdate}
                    />
                  )
                }
              </ProfileIconWrapper>
            </NavbarItems>
          </AppNavWrapper>
        </Wrapper>
      </>
    );
  }

}

export default withRouter(withCookies(AppNav));