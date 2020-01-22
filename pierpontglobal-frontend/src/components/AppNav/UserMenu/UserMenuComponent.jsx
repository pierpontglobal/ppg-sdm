import React from 'react';
import styled from 'styled-components';
import AccountIconMui from '@material-ui/icons/AccountCircle';
import HelpIconMui from '@material-ui/icons/Help';
import SettingsIconMui from '@material-ui/icons/Settings';
import CollectionsIconMui from '@material-ui/icons/CollectionsBookmark';
import LanguageIconMui from '@material-ui/icons/Language';
import ArrowIconMui from '@material-ui/icons/KeyboardArrowDown';
import { withRouter } from 'react-router-dom';
import { AppNavHeight } from '../../../constants/ApplicationSettings';
import ApplicationRoutes from '../../../constants/Routes';
import { UserMenuLinkHeight } from '../../../constants/ApplicationSettings';
import OptionMenu from './OptionMenu/OptionMenu';

const OutsideClickHandler = styled.div`
  width: 100vw;
  height: ${`calc(100vh - ${AppNavHeight}px)`};
  position: fixed;
  z-index: 900;
  background-color: rgb(0, 0, 0, 0.2);
  top: ${`${AppNavHeight}px`};
  left: 0;
`;

const UserMenu = styled.div`
  position: absolute;
  top: ${`${AppNavHeight + 2}px`};
  right: 8px;
  height: 400px;
  width: 300px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 4px 8px 2px rgb(0, 0, 0, 0.1);
  z-index: 1000;
`;

const UserMenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: minmax(200px, 4fr) 1fr;
  grid-template-columns: auto;
`;

const UserMenuBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: scroll;
`;

const UserMenuFooter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  box-shadow: 0px -4px 4px 0px rgb(0, 0, 0, 0.04);
`;

const UserMenuLink = styled.div`
  width: 100%;
  height: ${props => props.fullHeight ? `100%` : `${UserMenuLinkHeight}px`};
  display: grid;
  grid-template-columns: 1fr 4fr;
  
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #f4f4f4;
  }
`;

const MenuIconWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    font-weight: ${props => props.active ? '600' : '100'};
  }
`;

const MenuTextWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & > span {
    font-weight: ${props => props.active ? '600' : '100'};
  }
`;

const Submenu = styled.div`
  width: 100%;
  height: auto;
`;

const SubmenuLink = styled.div`
  width: 100%;
  height: ${`${UserMenuLinkHeight}px`};
  display: grid;
  grid-template-columns: 1fr 1fr 4fr;
  grid-template-rows: auto;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #e6e6e6;
  }
`;

const UserMenuLinkWithSubmenuWrapper = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #f4f4f4;
  }
`;

const UserMenuLinkWithSubmenu = styled.div`
  width: 100%;
  height: ${`${UserMenuLinkHeight}px`};
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-rows: auto;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: #f4f4f4;
  }
`;

const ShowSubmenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  transform: ${props => props.show ? 'rotate(-180deg)' : 'none'};
`;

const ArrowIconSubmenu = styled(ArrowIconMui)`
  color: #383838;
  font-size: 1.08rem;
`;

const AccountIcon = styled(AccountIconMui)`
  color: #383838;
`;

const HelpIcon = styled(HelpIconMui)`
  color: #383838;
`;

const SettingsIcon = styled(SettingsIconMui)`
  color: #383838;
`;

const ExitIcon = styled.div`
  & > i { 
    color: #383838;
    font-size: 1.0rem;
  }
  transform: rotate(-180deg);
`;

const CollectionIcon = styled(CollectionsIconMui)`
  color: #383838;
`;

const LanguageIcon = styled(LanguageIconMui)`
  color: #383838;
`;

class UserMenuComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLanguagesSubmenu: false,
      showOptionMenu: false,
    }
  }

  toggleLanguagesSubmenu = () => {
    this.setState((prevState) => ({
      showLanguagesSubmenu: !prevState.showLanguagesSubmenu,
    }));
  }

  switchLanguage = (lang) => {
    if (!!this.props.switchLanguage) {
      this.props.switchLanguage(lang);
    }
  }

  toggleOptionMenu = () => {
    this.setState((prevState) => ({
      showOptionMenu: !prevState.showOptionMenu,
    }));
  }

  render() {
    const {
      handleToggle,
      handleSignOut,
      goToAction,
      handleOpenSavedCars,
      languages,
    } = this.props;

    const { showLanguagesSubmenu, showOptionMenu } = this.state;

    return (
      <>
        <OutsideClickHandler onClick={handleToggle} />
        {
          showOptionMenu ? (<OptionMenu forceUpdate={this.props.forceUpdate} toggleOptionMenu={this.toggleOptionMenu} />) : (
            <UserMenu>
              <UserMenuWrapper>
                <UserMenuBody>
                  <UserMenuLink onClick={() => goToAction(ApplicationRoutes.profilePage.default)}>
                    <MenuIconWrapper>
                      <AccountIcon />
                    </MenuIconWrapper>
                    <MenuTextWrapper>
                      <span>
                        My profile
                      </span>
                    </MenuTextWrapper>
                  </UserMenuLink>
                  <UserMenuLink onClick={handleOpenSavedCars}>
                    <MenuIconWrapper>
                      <CollectionIcon />
                    </MenuIconWrapper>
                    <MenuTextWrapper>
                      <span>
                        My saved cars
                      </span>
                    </MenuTextWrapper>
                  </UserMenuLink>
                  <UserMenuLinkWithSubmenuWrapper>
                    <UserMenuLinkWithSubmenu onClick={this.toggleLanguagesSubmenu}>
                      <MenuIconWrapper>
                        <LanguageIcon />
                      </MenuIconWrapper>
                      <MenuTextWrapper>
                        <span>
                          Language
                        </span>
                      </MenuTextWrapper>
                      <ShowSubmenuWrapper show={showLanguagesSubmenu}>
                        <ArrowIconSubmenu />
                      </ShowSubmenuWrapper>
                    </UserMenuLinkWithSubmenu>
                    {
                      !showLanguagesSubmenu ? null : (
                        <Submenu show={showLanguagesSubmenu}>
                          {
                            languages.map(lang => (
                              <SubmenuLink key={lang.abr} onClick={() => this.switchLanguage(lang)}>
                                <div></div>
                                <MenuIconWrapper active={lang.active}>
                                  <span>{lang.abr}</span>
                                </MenuIconWrapper>
                                <MenuTextWrapper active={lang.active}>
                                  <span>
                                    <span>{lang.name}</span>
                                  </span>
                                </MenuTextWrapper>
                              </SubmenuLink>
                            ))
                          }
                        </Submenu>
                      )
                    }
                  </UserMenuLinkWithSubmenuWrapper>
                  <UserMenuLink onClick={() => this.toggleOptionMenu()}>
                    <MenuIconWrapper>
                      <SettingsIcon />
                    </MenuIconWrapper>
                    <MenuTextWrapper>
                      <span>
                        Settings
                      </span>
                    </MenuTextWrapper>
                  </UserMenuLink>
                  <UserMenuLink onClick={() => goToAction(ApplicationRoutes.supportPage)}>
                    <MenuIconWrapper>
                      <HelpIcon />
                    </MenuIconWrapper>
                    <MenuTextWrapper>
                      <span>
                        Help & support
                      </span>
                    </MenuTextWrapper>
                  </UserMenuLink>
                </UserMenuBody>
                <UserMenuFooter>
                  <UserMenuLink fullHeight onClick={handleSignOut}>
                    <MenuIconWrapper>
                      <ExitIcon>
                        <i className="fas fa-sign-out-alt"></i>
                      </ExitIcon>
                    </MenuIconWrapper>
                    <MenuTextWrapper>
                      <span>
                        Sign out
                      </span>
                    </MenuTextWrapper>
                  </UserMenuLink>
                </UserMenuFooter>
              </UserMenuWrapper>
            </UserMenu>
          )
        }
      </>
    );
  }
}

export default withRouter(UserMenuComponent);