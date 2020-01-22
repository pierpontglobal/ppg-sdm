import React, { Component } from 'react';
import styled from 'styled-components';

const SliderOption = styled.div`
  width: 100%;
  padding: 0px;
  display: grid;
  grid-template-columns: 1% 99%;
  box-sizing: border-box;
`;

const SliderOptionActiveLine = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${props => props.background};
`;

const SliderOptionContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.active ? '#f7f7f7' : 'white' };
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 16px;
  &:hover {
    background-color: #f7f7f7;
  }
`;

class SliderOptions extends Component {

  constructor(props) {
     super(props);
     this.state = {
      options: this.props.options || [],
    };
  }

  componentDidMount = () => {
    // Select active option based on url
    this.selectActiveOption();
  }

  onClickOption = (url, option) => {
    if (!!url) {
      if (!!this.props.onClickOption) {
        this.props.onClickOption(url);
        this.selectActiveOption();
      }
    }
    if (!!option) {
      option.handleClick();
    }
  }

  selectActiveOption = () => {
    const  { options } = this.props;

    if (!!options) {
      let activeSelected = false;
      let optionsWithActiveValue = options.map((opt) => {
        if (!!opt.urlMatch) {
          if (window.location.href.indexOf(opt.urlMatch) > 0) {
            if (opt.urlMatch !== '/') {
              activeSelected = true;
              return {
                ...opt,
                active: true
              };
            }  
          }
        }
        return {
          ...opt,
          active: false
        };
      });

      if (!activeSelected) {
        optionsWithActiveValue.forEach((opt) => {
          if (opt.urlMatch === '/' && !window.location.pathname.includes('/user')) {
            opt.active = true;
          }
        })
      }

      this.setState({
        options: optionsWithActiveValue
      }); 
    }
  }

  render() {
    const { options } = this.state;
    return(
      <>
        {
          (!!options && options.length > 0)
            ? options.map((option, index) => (
              <SliderOption key={index} onClick={() => this.onClickOption(option.urlMatch, (!!option.handleClick) ? option : null )}>
                <SliderOptionActiveLine background={ (option.active) ? '#3e78c0' : 'darkgray'} />
                <SliderOptionContent active={option.active}>
                  <div>{option.icon}</div>
                  <div>{option.label}</div>
                </SliderOptionContent>
              </SliderOption>
            ))
            : null
          }
      </>
    );
  }
}

export default SliderOptions;