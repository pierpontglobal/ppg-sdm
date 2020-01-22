import React, { useState, useEffect } from "react";
import {
  SignInWrapper,
  SignInBox,
  BlobLeft,
  WhiteLayer,
  BlobRight,
  MainImage,
} from "./SignInPage.styles";
import { LoginView } from "./LoginView";
import { RegisterView } from "./RegisterView";
import { RecoverView } from "./RecoverView";
import { ChangePasswordView } from "./ChangePasswordView";

const queryString = require('query-string');

const SignInPage = props => {

  const [page, setPage] = useState(1);
  const [registerView, setRegisterView] = useState(false);

  useEffect(() => {
    var params = queryString.parse(window.location.search, { ignoreQueryPrefix: true })
    var register = params.register === "true";
    if (register) {
      setRegisterView(true)
      setPage(2)
    }
  }, [])


  let view = <LoginView
    registerView={registerView}
    setRegisterView={setRegisterView}
    handleSignIn={props.handleSignIn}
  />;

  switch (page) {
    case 1: view = <LoginView
      registerView={registerView}
      setPage={setPage}
      handleSignIn={props.handleSignIn}
    />;
      break;
    case 2: view = <RegisterView handleSignIn={props.handleSignIn} setPage={setPage} />;
      break;
    case 3:
      view = <RecoverView setPage={setPage}></RecoverView>;
      break;
  }

  return (
    <SignInWrapper>
      <BlobLeft src="/images/signinpage/blob.svg" />
      <BlobRight src="/images/signinpage/blob.svg" />
      <MainImage src="/images/signinpage/Dealer.svg" />
      <SignInBox big={page == 2}>
        <WhiteLayer>
          {view}
        </WhiteLayer>
      </SignInBox>
    </SignInWrapper >
  );
};

export function RecoverPage(props) {
  return (
    <SignInWrapper>
      <BlobLeft src="/images/signinpage/blob.svg" />
      <BlobRight src="/images/signinpage/blob.svg" />
      <MainImage src="/images/signinpage/Dealer.svg" />
      <SignInBox big={false}>
        <WhiteLayer>
          <ChangePasswordView />
        </WhiteLayer>
      </SignInBox>
    </SignInWrapper >
  );
}

export default SignInPage;
