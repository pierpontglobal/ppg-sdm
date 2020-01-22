import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Logo, Title, Subtitle, SignInForm, Fields, BottomSection, Loader, LoaderWrapper, StatusMessage } from "./SignInPage.styles";
import { AccentButton, ApiServer } from "../../../Defaults";
import SimpleInput from "./SimpleInput/SimpleInput";
import axios from "axios";

function submit(
  username,
  password,
  setCookies,
  getCookies,
  setLoading,
  setStatus,
  handleSignIn
) {
  setLoading(true);
  const data = {
    user: {
      login: username,
      password
    }
  };
  axios.post(`${ApiServer}/api/v2/users/login`, data).then(
    response => {
      setCookies("token", response.headers['authorization'], {
        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      });
      axios.post(`${ApiServer}/api/v1/user/notifier`, {
        one_signal_uuid: getCookies["one_signal_uuid"]
      });
      handleSignIn();
    },
    err => {
      setLoading(false);
      setStatus(false);
    }
  );
}

export const LoginView = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    function test(event) {
      if (event.keyCode === 13) {
        submit(username, password, setCookies, cookies, setLoading, setStatus, props.handleSignIn);
      }
    }
    document.addEventListener('keydown', test);
    return function cleanup() {
      document.removeEventListener('keydown', test);
    }
  })

  return (<>
    <Logo src="/images/signinpage/ppg_logo.png" />
    <Title>Welcome to PierpontGlobal</Title>
    <Subtitle>Customer Login</Subtitle>
    <SignInForm>
      <Fields>
        <SimpleInput value={username} label="Username | Email" type="email" autoComplete="email" name="email" onChange={node => setUsername(node.target.value)} />
        <SimpleInput value={password} label={<>Password<span style={{ opacity: 0 }}>.......................</span></>} type="password" autoComplete="password" name="password" onChange={node => setPassword(node.target.value)} />
      </Fields>
    </SignInForm>
    <StatusMessage status={status}>
      Something went wrong, verify your credentials
      </StatusMessage>
    <AccentButton
      style={{
        width: "90%",
        margin: "20px 5% 0",
        borderRadius: "15px",
        left: 0,
        right: 0
      }} onClick={() => {
        submit(username, password, setCookies, cookies, setLoading, setStatus, props.handleSignIn);
      }}>
      Log In
      </AccentButton>
    <LoaderWrapper loading={loading}>
      <Loader />
    </LoaderWrapper>
    <BottomSection>
      <span>
        Don't have an account?{" "}
        <span style={{
          color: 'darkblue',
          cursor: 'pointer'
        }} onClick={() => {
          props.setPage(2);
        }}>
          Subscribe!
          </span>
      </span>
    </BottomSection>
    <BottomSection>
      <span>
        Forgot your password?{" "}
        <span style={{
          color: 'darkblue',
          cursor: 'pointer'
        }} onClick={() => {
          props.setPage(3);
        }}>
          Recover!
          </span>
      </span>
    </BottomSection>
  </>);
};
