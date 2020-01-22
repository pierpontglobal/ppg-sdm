import React, { useState, useEffect } from "react";
import { Logo, Title, Subtitle, RecoverForm, Fields, BottomSection, Loader, LoaderWrapper, StatusMessage } from "./SignInPage.styles";
import { AccentButton, ApiServer } from "../../../Defaults";
import SimpleInput from "./SimpleInput/SimpleInput";
import axios from "axios";

function submit(
  username,
  setLoading,
  setStatus,
) {
  setLoading(true);
  const data = {
    login: username,
  };
  axios.post(`${ApiServer}/api/v2/users/recover`, data).then(
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

export const RecoverView = props => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(undefined);

  useEffect(() => {
    function test(event) {
      if (event.keyCode === 13) {
        submit(username, setLoading, setStatus);
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
        <SimpleInput value={username} label="Username | Email" type="email" autoComplete="email" name="email" onChange={node => setUsername(node.target.value)} />
      </Fields>
    </RecoverForm>
    {status !== undefined ?
      <StatusMessage style={{ color: status ? 'darkgreen' : 'darkred' }} status={false}>
        {status ? 'Recovery email has ben sent' : 'This account doesn\'t exist'}
      </StatusMessage> : <></>}
    <AccentButton
      style={{
        width: "90%",
        margin: "20px 5% 0",
        borderRadius: "15px",
        left: 0,
        right: 0
      }} onClick={() => {
        submit(username, setLoading, setStatus);
      }}>
      Send recovery email
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
          props.setPage(1);
        }}>
          Sign in
          </span>
      </span>
    </BottomSection>
  </>);
};
