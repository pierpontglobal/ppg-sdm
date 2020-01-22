import styled from "styled-components";

export const LightInput = styled.div`
  position: relative;
  > span {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 28px;
    cursor: text;
    left: 13px;
    color: gray;
    font-size: 20px;
    font-weight: 200;
    z-index: ${props => (props.full === true ? "60" : "20")};
    transition: all 0.5s;
    transform: ${props =>
    props.full === true
      ? "translateY(-23px) translateX(-30px) scale(0.8)"
      : ""};
    @media only screen and (max-width: 768px) {
      font-size: 14px;
    }
    @media only screen and (max-width: 1280px) and (min-width: 768px){
      font-size: 16px;
    }
  }
  > input {
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 40;
    font-size: 24px;
    position: absolute;
    border: none;
    outline: none;
    :focus + span {
      transform: translateY(-23px) translateX(-30px) scale(0.8);
      z-index: 60;
    }
    @media only screen and (max-width: 1280px) and (min-width: 768px){
      font-size: 18px;
    }
    @media only screen and (max-width: 768px) {
      font-size: 16px;
    }
  }
`;
