import Axios from 'axios';

export const API_URL = 'https://petfeeder-app.herokuapp.com/api/v1.0/';

const login_api = async (email, password) => {
  const body = {
    email: email,
    password: password,
  };
  const data = await postRequest(`${API_URL}users/login`, body, {});
  return data;
};

const signup_api = async (user) => {
  const data = await postRequest(`${API_URL}users/signup`, user, {});
  return data;
};

export const API_INSTANCE = {
  login: login_api,
  signup: signup_api,
};

const postRequest = async (url, body, falsyResponse) => {
  try {
    const data = await Axios.post(url, body);
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

const getRequest = async (url, falsyResponse) => {
  const data = await Axios.get(url);
  return data ? data : falsyResponse;
};
