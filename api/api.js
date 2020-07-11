import Axios from 'axios';

export const API_URL = 'https://petfeeder-app.herokuapp.com/api/v1.0/';

const login_api = async (email, password) => {
  const body = {
    email: email,
    password: password,
  };
  const data = await postRequest(`${API_URL}users/login`, body);
  return data;
};

const signup_api = async (user) => {
  const data = await postRequest(`${API_URL}users/signup`, user);
  return data;
};

const getUserDogs_api = async (token) => {
    const headers = {
        'Authorization' : `Bearer ${token}`
    }
    const data = await getRequest(`${API_URL}dogs`, headers, {});
    return data;
};

const addDog_api = async (dog, token) => {
    const headers = {
        'Authorization' : `Bearer ${token}`
    }
    const data = await postRequest(`${API_URL}dogs/new`, dog, headers);
    return data;
};


export const API_INSTANCE = {
  login: login_api,
  signup: signup_api,
  addDog: addDog_api,
  getDogs: getUserDogs_api,
};

const postRequest = async (url, body, headers={}) => {
  try {
    const data = await Axios.post(url, body, { headers });
    return data;
  } catch (error) {
    return { error: error.message };
  }
};

const getRequest = async (url, headers = {}, falsyResponse) => {
  const data = await Axios.get(url, { headers });
  return data ? data : falsyResponse;
};
