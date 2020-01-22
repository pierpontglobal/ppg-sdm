import React from 'react';
import styled from 'styled-components';
import ArrowBackIconMui from '@material-ui/icons/KeyboardArrowLeft';
import { Switch } from 'antd';
import { withCookies } from 'react-cookie';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 5fr;
  grid-template-columns: auto;
  background-color: white;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: auto;
  padding: 16px;
`;

const ArrowBackIconWrapper = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ArrowBackIcon = styled(ArrowBackIconMui)`
  cursor: pointer;
`;

const Title = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  & > span {
    font-weight: 400;
    font-size: 1.25rem;
  }
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
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

class SettingsModalContent extends React.Component {
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
    this.props.cookies.set('switch_marketplace', checked ? 'on' : 'off', { path: '/' });
    if (!!this.props.forceUpdate) {
      this.props.forceUpdate();
    }
  }

  render() {
    const { switchMarket } = this.state;
    return (
      <Wrapper>
        <HeaderWrapper>
          <ArrowBackIconWrapper onClick={this.props.toggleSettingsModal}>
            <ArrowBackIcon />
          </ArrowBackIconWrapper>
          <Title>
            <span>
              Settings
            </span>
          </Title>
        </HeaderWrapper>
        <Body>
          <ContentWithSwitch>
            <SwitchDescription>
              Cards layout -  marketplace
            </SwitchDescription>
            <SwitchWrapper>
              <Switch defaultChecked={switchMarket} onChange={this.toggleMarketplaceDesign} />
            </SwitchWrapper>
          </ContentWithSwitch>
        </Body>
      </Wrapper>
    );
  }
}

export default withCookies(SettingsModalContent);
