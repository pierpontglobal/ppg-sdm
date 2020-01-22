import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { ApiServer } from '../Defaults';

const withAPI = (WrappedComponnet) => {
  const axiosInstance = axios.create({
    baseURL: `${ApiServer}/api/v1/`
  });

  axiosInstance.interceptors.request.use(
    config => {
      config.headers = { Authorization: `Bearer ${Cookies.get("token", {path: '/'})}` };
      config.params = { lang: Cookies.get('language', {path: '/'}) };

      return config;
    },
    error => Promise.reject(error)
  );
  
  return class Wrapped extends React.Component {
    render() {
      return (<WrappedComponnet {...this.props} axios={axiosInstance} />)
    }
  }

}

export default withAPI;
