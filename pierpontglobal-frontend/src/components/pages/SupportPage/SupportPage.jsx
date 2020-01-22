import React from 'react';
import { withCookies } from 'react-cookie';
import styled from 'styled-components';
import 'video-react/dist/video-react.css';
import { Player } from 'video-react';
import { withRouter } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { Select, MenuItem } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import tutorials from './tutorials/tutorials';

const Container = styled.div`
display: grid;
grid-template-rows: 10% 90%;
grid-template-areas: 
  "menu"
  "body";

@media only screen and (min-width: 768px) {
  grid-template-columns: 30% 70%;
  grid-template-rows: 100%;
  grid-template-areas: 
    "menu body";
}

@media only screen and (min-width: 1200px) {
  grid-template-columns: 20% 80%;
  grid-template-rows: 100%;
  grid-template-areas: 
    "menu body";
}
`;

const BodyContainer = styled.div`
  overflow: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;

@media only screen and (min-width: 768px) {
  padding-left: 10%;
  padding-right: 10%;
}
`;

const Title = styled.div`
  width: 100%;
  font-size: 48px;
  font-weight: 300;
  padding: 30px;
`;

const Subtitle = styled.div`
  width: 100%;
  font-size: 30px;
  font-weight: 300;
  padding: 0 30px;
`;

const TextBody = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 200;
  padding: 30px;
`;

const MenuContainer = styled.div`
grid-area: menu;
display: flex;
flex-direction: column;
background: #fafafa;
overflow: hidden;

@media only screen and (min-width: 768px) {
  overflow: auto;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
`;

const MenuItemHeading = styled.div`
  width: 100%;
  height: 40px;
  line-height: 20px;
  font-weight: 600;
  padding: 10px;
  font-size: 16px;
`;

const VideoHolder = styled.div`
   margin: 30px;
`;

const MenuItemBody = styled.div`

  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-items: center;
  font-weight: 200;
  padding-left: 20px;
  position: relative;
  background: #fafafa;
  cursor: pointer;
  transition: 1s;
  padding-right: 40px;
  
  :hover {
    background: #dedede;
    transition: 1s;
  }

  :hover::after {
    right: 10px;
    color: #fafafa;
    transition: 1s;
  }

  ::after {
    content: 'keyboard_arrow_right';
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    position: absolute;
    right: 15px;
    color: #dedede;
    font-weight: 900;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
    transition: 1s;
  }
`;
class SupportPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorialId: 1,
    };
  }

  componentWillReceiveProps = (newProps) => {
    const currentTutorial = this.getTutorial(newProps.match.params.tutorial || 1);
    this.setState({
      tutorialId: currentTutorial.id,
    });
  }

  setTutorial = (id) => {
    this.props.history.push(`/support/${id}`);
  }

  changeTutorialIdSelect = (event) => {
    const { value } = event.target;
    if (value === '') {
      return;
    }
    this.setTutorial(value);
  }

  getVideoHolder = (tutorial) => {
    if (tutorial.youtube) {
      return (
        <VideoHolder>
          {tutorial.iframe}
        </VideoHolder>
      );
    }
    return (
      <VideoHolder>
        <Player
          laysInline
          poster={tutorial.video.sample}
          src={tutorial.video.url}
        />
      </VideoHolder>
    );
  }

  getTutorial = (id) => {
    const tutorial = tutorials.find(t => t.id === Number(id));
    if (!tutorial) {
      return tutorials.find(t => t.id === 1);
    }
    return tutorial;
  }

  render() {
    const { tutorialId } = this.state;
    const { intl } = this.props;
    const tutorial = this.getTutorial(tutorialId);

    const labels = {
      basics: intl.formatMessage({ id: 'support.basics' }),
      howToSingUp: intl.formatMessage({ id: 'support.how-to-sign-up' }),
      creatingDealer: intl.formatMessage({ id: 'support.creating-a-dealer' }),
      addingRemovingCard: intl.formatMessage({ id: 'support.adding-removing-cards' }),
      bids: intl.formatMessage({ id: 'support.bids' }),
      placingBid: intl.formatMessage({ id: 'support.placing-a-bid' }),
      viewingCurrentBidInfo: intl.formatMessage({ id: 'support.viewing-current-bid-info' }),
      faqs: intl.formatMessage({ id: 'support.faqs' }),
      viewFaqsHere: intl.formatMessage({ id: 'support.view-faqs-here' }),
      topic: intl.formatMessage({ id: 'support.topic' }),
    };

    const menuItems = [
      {
        type: 'heading',
        onClick: null,
        text: labels.basics,
      },
      {
        type: 'Item',
        id: 1,
        onClick: () => this.setTutorial(1),
        text: labels.howToSingUp,
      },
      {
        type: 'Item',
        id: 2,
        onClick: () => this.setTutorial(2),
        text: labels.creatingDealer,
      },
      {
        type: 'Item',
        id: 3,
        onClick: () => this.setTutorial(3),
        text: labels.addingRemovingCard,
      },
      {
        type: 'Item',
        id: 4,
        onClick: () => this.setTutorial(4),
        text: 'Push notifications',
      },
      {
        type: 'heading',
        onClick: null,
        text: labels.bids,
      },
      {
        type: 'Item',
        id: 5,
        onClick: () => this.setTutorial(5),
        text: labels.placingBid,
      },
      // {
      //   type: 'Item',
      //   id: 6,
      //   onClick: () => this.setTutorial(6),
      //   text: labels.viewingCurrentBidInfo,
      // },
      {
        type: 'heading',
        onClick: null,
        text: labels.faqs,
      },
      {
        type: 'Item',
        id: 7,
        onClick: () => this.setTutorial(7),
        text: labels.viewFaqsHere,
      },
    ];

    const TopicBar = styled.div`
    display: grid;
    height: 100%;
    grid-template-columns: 30% 70%;
    grid-template-areas: 
      "title dropdown";
    `;

    const ShortTitle = styled.div`
      display: flex;
      grid-area: 'title';
      height: 100%;
      width: 100%;
      align-content: center;
      align-items: center;
      justify-content: center;
      justify-items: center;
      font-size: 24px;
    `;

    return (
      <Container>
        <MenuContainer>
          <MediaQuery maxDeviceWidth={768}>
            <TopicBar>
              <ShortTitle>
                { labels.topic }
              </ShortTitle>
              <Select
                value={tutorialId}
                onChange={this.changeTutorialIdSelect}
              >
                {menuItems.map((item, i) => (item.type === 'heading' ? <MenuItem key={i} value=""><em style={{ fontWeight: 900, fontSize: '20px' }}>{item.text}</em></MenuItem> : <MenuItem key={i} value={item.id}>{item.text}</MenuItem>))}
              </Select>
            </TopicBar>
          </MediaQuery>
          <MediaQuery minDeviceWidth={768}>
            {menuItems.map((item, i) => (item.type === 'heading' ? <MenuItemHeading key={i}>{item.text}</MenuItemHeading> : <MenuItemBody key={i} onClick={item.onClick}>{item.text}</MenuItemBody>))}
          </MediaQuery>
        </MenuContainer>
        <BodyContainer>
          <Title>{tutorial.title}</Title>
          <hr style={{ margin: '0 30px' }} />
          {
            tutorial.video
              ? (
                this.getVideoHolder(tutorial.video)
              )
              : null
          }

          {tutorial.body.map((textBody, i) => (
            <div key={i} style={{ marginTop: '16px' }}>
              <Subtitle>{textBody.heading}</Subtitle>
              <TextBody>
                {textBody.content}
              </TextBody>
            </div>
          ))}
        </BodyContainer>
      </Container>
    );
  }
}

export default withCookies(withRouter(injectIntl(SupportPage)));
