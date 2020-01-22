import styled from "styled-components";
import { CircularProgress, Button, MobileStepper } from "@material-ui/core";

export const SignInWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  justify-items: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  justify-self: center;
  align-self: center;
  background: transparent;
`;

export const WhiteLayer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  top: 0;
  left: 0;
  padding: 40px;
  background: rgba(255, 255, 255, 0.9);
  z-index: 4;
  @media only screen and (max-width: 1280px) and (min-width: 768px) {
    padding: 16px 40px;
  }
  @media only screen and (max-width: 768px) {
    padding: 12px 24px;
  }
`;

export const Logo = styled.img`
  width: 50px;
  align-self: flex-start;
  @media only screen and (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
  @media only screen and (max-width: 1280px) and (min-width: 768px){
    width: 42px;
    height: 42px;
  }
`;

export const Title = styled.div`
  font-weight: 900;
  font-size: 24px;
  margin-top: 20px;
  color: #3b444b;
  @media only screen and (max-width: 768px) {
    font-weight: 600;
    font-size: 16px;
  }
`;

export const Subtitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 20px;
  color: #3b444b;
  @media only screen and (max-width: 768px) {
    font-weight: 400;
    font-size: 14px;
  }
`;

export const SignInForm = styled.div`
  width: 90%;
  height: 160px;
  background-color: white;
  margin: 20px auto 0;
  border-radius: 15px;
  box-shadow: rgba(47, 64, 163, 0.3) 0px 0px 50px -10px !important;
  padding: 10px;
  @media only screen and (max-width: 768px) {
    margin: 20px auto 0;
  }
`;

export const RecoverForm = styled.div`
  width: 90%;
  height: 80px;
  background-color: white;
  margin: 20px auto 0;
  border-radius: 15px;
  box-shadow: rgba(47, 64, 163, 0.3) 0px 0px 50px -10px !important;
  padding: 10px;
  @media only screen and (max-width: 768px) {
    margin: 20px auto 0;
    height: 60px;
  }
`;

export const SignInBox = styled.div`
  overflow: hidden;
  width: ${props => (props.big ? "748px" : "450px")};
  height: 70vh;
  position: absolute;
  background: transparent;
  margin-left: ${props => (props.big ? "calc(50vw - 374px)" : "15vw")};
  margin-top: 15vh;
  border-radius: 15px;
  z-index: 2;
  box-shadow: rgba(47, 64, 163, 0.3) 0px 0px 50px -10px !important;
  transition: 1s;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    margin: 0;
    border-radius: 0;
  }
`;

export const BlobLeft = styled.img`
  position: absolute;
  width: 69vw;
  max-width: 700px;
  min-width: 400px;
  left: -300px;
  bottom: -160px;
  z-index: 1;
  transform: rotateZ(173deg);
  transition: 1s;
  opacity: 0.3;
`;

export const BlobRight = styled.img`
  position: absolute;
  width: 88vw;
  max-width: 1440px;
  min-width: 800px;
  right: -400px;
  top: -500px;
  z-index: 1;
  transform: rotateZ(190deg);
  transition: 1s;
  opacity: 0.3;
`;

export const MainImage = styled.img`
  position: absolute;
  z-index: 2;
  width: 40vw;
  max-width: 1440px;
  min-width: 800px;
  right: 100px;
  top: 300px;
`;

export const Fields = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  padding: 20px 20px 0 20px;
  grid-template-columns: 100%;
  grid-template-rows: 50% 50%;
`;

export const BottomSection = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
  text-align: center;
  padding-top: 20px;
  a {
    color: #159dd6 !important;
    text-decoration: none;
  }
  > span {
    color: gray;
  }
`;

export const LoaderWrapper = styled.div`
  display: ${props => (props.loading ? "flex" : "none")};
  padding: 20px;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
`;

export const Loader = styled(CircularProgress)`
  > svg {
    color: #fe6b8b !important;
  }
`;

export const StatusMessage = styled.div`
  color: darkred;
  text-align: center;
  margin-top: 20px;
  display: ${props => (props.status ? "none" : "block")};
`;

export const SubscribeButton = styled(Button)`
  position: absolute !important;
  top: 10px;
  right: 10px;
  color: #3b444b !important;
  z-index: 40;
`;

export const RegistrationWrapper = styled.div`
  display: grid;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
  top: 0;
  left: 0;
  grid-template-rows: 100%;
  grid-template-columns: 35% 65%;
  z-index: 30;
  @media only screen and (max-width: 768px) {
    overflow: hidden;
    grid-template-rows: calc(100% - 70px) 70px;
    grid-template-columns: 100%;
  }
`;

export const ButtonHolders = styled.div`
  background-color: #fafafa;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  justify-items: space-between;
  padding: 10px;
  @media only screen and (min-width: 768px) {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
`;

export const VerifyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center !important;
`;

export const RegistartionWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const RegistrationForm = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 40px;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  justify-items: flex-start;
  align-items: center;
  flex-direction: column;
  overflow: auto;
  > * {
    width: 100%;
  }
  @media only screen and (min-width: 768px) {
    padding-bottom: 100px;
  }
`;

export const MobileStepperCustom = styled(MobileStepper)`
align-content: center !important;
align-items: center !important;
justify-content: center !important;
justify-items: center !important;
margin: 0 auto;
position: absolute;
left: 0;
right: 0;
display: flex;
`;

export const StepperWrapper = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  width: 100%;
  overflow: auto;
  height: 100%;
  background: linear-gradient(
    330deg,
    rgba(115, 88, 255, 0.3),
    rgba(123, 223, 242, 0.3)
  );
  transition: 1s;
  padding: 10%;
  @media only screen and (max-width: 768px) {
    background: linear-gradient(
      150deg,
      rgba(115, 88, 255, 0.3),
      rgba(123, 223, 242, 0.3)
    );
    padding: 0 40px;

    justify-content: center;
    justify-items: center;
    align-content: flex-start;
    align-items: flex-start;
    flex-direction: column !important;
  }
  > * {
    background: transparent !important;
  }
`;
