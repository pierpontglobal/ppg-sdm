import React, { Component } from 'react';
import styled from 'styled-components';

const LanguagesWrapper = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
  max-height: 220px;
  overflow-y: scroll;
  box-shadow: 0px 0px 8px 0px rgb(0, 0, 0, 0.8);
  @media only screen and (min-width: 748px) {
    max-height: 220px;
    overflow-y: scroll;
  }
`;

const LanguageWrapper = styled.div`
  width: 100%;
  min-height: 40px;
  display: grid;
  grid-template-columns: 20% 80%;
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const AbrWrapper = styled.div`
  width: 100%;
  height: 100%;
  & > span {
    color: ${props => props.active ? '#2c5587' : 'darkgray'};
  }
`;

const NameWrapper = styled.div`
  width: 100%;
  height: 100%;
  & > span {
    color: ${props => props.active ? '#2c5587' : 'darkgray'};
  }
`;

class Languages extends Component {

  setLanguage = (lang) => {
    this.props.handleClose();
    this.props.setLang(lang);
  }

  render() {
    const { languages } = this.props;

    return (
      <LanguagesWrapper>
        {
          languages.map(lang => (
            <LanguageWrapper key={lang.abr} onClick={() => this.setLanguage(lang)}>
              <AbrWrapper active={lang.active}>
                <span>{ lang.abr }</span>
              </AbrWrapper>
              <NameWrapper active={lang.active}>
                <span>{ lang.name }</span>
              </NameWrapper>
            </LanguageWrapper>
          ))
        }
      </LanguagesWrapper>
    );
  }
}

export default Languages;