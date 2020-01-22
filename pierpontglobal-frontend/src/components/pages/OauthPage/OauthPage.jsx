import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';
import axios from 'axios';
import queryString from 'query-string';
import { ApiServer } from '../../../Defaults';

const AllScreen = styled.div`
  position: fixed;
  z-index: 10000;
  height: 100%;
  width: 100%;
  background: linear-gradient(#3a7abf, #3B444B);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const SignInWrapper = styled.div`
  max-width: 340px;
  min-width: 290px;
  width: 100%;
  height: auto;
  background: white;
  border-radius: 10px;
  position: absolute;
  margin: auto;
  right: 0;
  top: 20vh;
  left: 0;
  box-shadow: 3px 3px 6px rgba(0,0,0,0.16);
  padding: 10px;
`;

function oauthLogin(pk, username, password) {
  if (pk !== undefined) {
    axios.post(`${ApiServer}/oauth/login`, {
      pk,
      username,
      password,
    }).then((response) => {
      window.location.href = `${response.data.callback}?token=${response.data.token}`;
    }).catch(() => {
    });
  } else {
    alert('App not registered!');
  }
}

async function verifyPk(pk) {
  return axios.get(`${ApiServer}/oauth/application?pk=${pk}`);
}

function OauthPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [appName, setAppName] = useState('Login...');
  const [mount, setMount] = useState(false);

  const params = queryString.parse(window.location.search);
  const pk = params.app_pk;

  useEffect(() => {
    if (!mount) {
      verifyPk(pk).then((response) => {
        setAppName(response.data);
      });
      setMount(true);
    }
  });


  return (
    <AllScreen>
      <SignInWrapper>
        <h4 style={{ textAlign: 'center' }}>PierpontGlobal Login</h4>
        <TextField
          label="Username"
          autoComplete="username"
          type="text"
          value={username}
          onChange={(node) => { setUsername(node.target.value); }}
          name="username"
          style={{
            width: '100%',
            maxWidth: '300px',
            marginBottom: '10px',
          }}
        />
        <TextField
          label="Password"
          autoComplete="password"
          type="password"
          name="Password"
          value={password}
          onChange={(node) => { setPassword(node.target.value); }}
          style={{
            width: '100%',
            maxWidth: '300px',
            marginBottom: '10px',
          }}
        />

        <Button variant="contained" color="primary" style={{ width: '100%' }} onClick={() => { oauthLogin(pk, username, password); }}>LOGIN</Button>
        <h5 style={{ textAlign: 'right', marginTop: '10px' }}>{appName}</h5>
      </SignInWrapper>
    </AllScreen>
  );
}

export default OauthPage;
