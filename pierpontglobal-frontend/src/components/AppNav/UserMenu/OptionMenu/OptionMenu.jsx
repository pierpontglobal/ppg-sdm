import React from 'react';
import styled from 'styled-components';
import ArrowIconMui from '@material-ui/icons/KeyboardArrowLeft';
import { Switch } from 'antd';
import { withCookies } from 'react-cookie';
import { AppNavHeight } from '../../../../constants/ApplicationSettings';
import SETTINGS_ACTIONS from '../../../../modules/settings/actions';
import { connect } from 'react-redux';

const Wrapper = styled.div`
  position: absolute;
  top: ${`${AppNavHeight + 2}px`};
  right: 8px;
  height: 200px;
  width: 300px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 4px 8px 2px rgb(0, 0, 0, 0.1);
  z-index: 1000;
`;

const OptionMenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: minmax(80px, 1fr) 4fr;
  grid-template-columns: auto;
`;

const OptionMenuHeader = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: auto;
`;

const OptionMenuBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-x: scroll;
`;

const ArrowIcon = styled(ArrowIconMui)`
  color: #383838;
  font-size: 1.08rem;
`;

const IconWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const MenuTitle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & > span {
    font-weight: 400;
    font-size: 1.15rem;
  }
`;

const ContentWithSwitch = styled.div`
  width: 100%;
  padding: 8px;
  display: grid;
  grid-template-columns: 4fr 1fr;
`;

const SwitchDescription = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SwitchWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class OptionMenu extends React.Component {

  state = {
    switchMarket: false,
  }

  componentWillMount = () => {
    const marketSetting = this.props.cookies.get('switch_marketplace', { path: '/' });
    if (!!marketSetting && marketSetting === 'on') {
      this.setState({
        switchMarket: true,
      });
    }
  }

  toggleMarketplaceDesign = (checked) => {
    const { changeMarketDesign } = this.props;
    this.props.cookies.set('switch_marketplace', checked ? 'on' : 'off', { path: '/' });
    let toChange = 'new';
    if (!checked) {
      toChange = 'old'
    }
    changeMarketDesign(toChange);
  }

  render() {
    const { switchMarket } = this.state;
    return (
      <Wrapper>
        <OptionMenuWrapper>
          <OptionMenuHeader>
            <IconWrapper onClick={this.props.toggleOptionMenu}>
              <ArrowIcon />
            </IconWrapper>
            <MenuTitle>
              <span>
                Settings
              </span>
            </MenuTitle>
          </OptionMenuHeader>
          <OptionMenuBody>
            <ContentWithSwitch>
              <SwitchDescription>
                Cards layout -  marketplace
              </SwitchDescription>
              <SwitchWrapper>
                <Switch defaultChecked={switchMarket} onChange={this.toggleMarketplaceDesign} />
              </SwitchWrapper>
            </ContentWithSwitch>
          </OptionMenuBody>
        </OptionMenuWrapper>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeMarketDesign: (toChange) => dispatch(SETTINGS_ACTIONS.changeMarketDesign(toChange)) 
});

export default connect(
  null,
  mapDispatchToProps
)(withCookies(OptionMenu));
