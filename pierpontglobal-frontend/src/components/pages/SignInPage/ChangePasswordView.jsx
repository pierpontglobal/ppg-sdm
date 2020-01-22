import React, { useState, useEffect } from "react";
import { Logo, Title, Subtitle, RecoverForm, Fields, BottomSection, Loader, LoaderWrapper, StatusMessage } from "./SignInPage.styles";
import { AccentButton, ApiServer } from "../../../Defaults";
import SimpleInput from "./SimpleInput/SimpleInput";
import axios from "axios";
import { LightButton } from "../sign-in-page/styles/sign_in_styles";
import { Icon } from "antd";
const queryString = require('query-string');

function submit(
  password,
  setLoading,
  setStatus,
) {
  var params = queryString.parse(window.location.search, { ignoreQueryPrefix: true })
  setLoading(true);
  const data = {
    token: params.token,
    password: password
  };
  axios.post(`${ApiServer}/api/v2/users/password_change`, data).then(
    response => {
      setStatus(true)
      setLoading(false)
    },
    err => {
      setLoading(false);
      setStatus(false);
    }
  );
}

export const ChangePasswordView = props => {
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false)
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(undefined);

  useEffect(() => {
    function test(event) {
      if (event.keyCode === 13) {
        submit(password, setLoading, setStatus);
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
    <Subtitle>Customer password recover</Subtitle>
    <RecoverForm>
      <Fields>
        <SimpleInput style={{ height: '40px' }} icon={<Icon onClick={() => { setViewPassword(!viewPassword) }} style={{ position: 'absolute', zIndex: 100, right: 0, cursor: 'pointer', fontSize: '24px' }} type={viewPassword ? "eye-invisible" : "eye"} />} value={password} label="New password" type={viewPassword ? 'text' : 'password'} autoComplete="password" name="password" onChange={node => setPassword(node.target.value)} />
      </Fields>
    </RecoverForm>
    {status !== undefined ?
      <StatusMessage style={{ color: status ? 'darkgreen' : 'darkred' }} status={false}>
        {status ? 'Password changed, login' : 'Something wrong happened, try again'}
      </StatusMessage> : <></>}
    <AccentButton
      style={{
        width: "90%",
        margin: "20px 5% 0",
        borderRadius: "15px",
        left: 0,
        right: 0
      }} onClick={() => {
        submit(password, setLoading, setStatus);
      }}>
      Change password
      </AccentButton>
    <LoaderWrapper loading={loading}>
      <Loader />
    </LoaderWrapper>
    <BottomSection>
      <span>
        Already have an account?{" "}
        <span style={{
          color: 'darkblue',
          cursor: 'pointer'
        }} onClick={() => {
          window.location.href = '/'
        }}>
          Sign in
          </span>
      </span>
    </BottomSection>
  </>);
};
