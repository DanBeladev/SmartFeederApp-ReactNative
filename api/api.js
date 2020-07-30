import Axios from 'axios';
import { createHeader } from '../generalComponents/Utils';

export const API_URL = 'https://petfeeder-app.herokuapp.com/api/v1.0/';
export const DOG_API_URL = 'https://api.thedogapi.com/v1/breeds';
export const API_BASE_URL = 'https://petfeeder-app.herokuapp.com/';

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
  const headers = createHeader(token);
  const data = await getRequest(`${API_URL}dogs`, headers, {});
  return data;
};

const getHisunim_api = async (dogId, token) => {
  const headers = createHeader(token);
  const data = await getRequest(
    `${API_URL}dogs/vaccines/${dogId}`,
    headers,
    {}
  );
  return data;
};

const addHisun_api = async (hisun, dogId, token) => {
  const headers = createHeader(token);
  const data = await postRequest(
    `${API_URL}dogs/newVaccine/${dogId}`,
    hisun,
    headers
  );
  return data;
};

const addDog_api = async (data, token) => {
  let config = {
    method: 'post',
    url: `${API_URL}dogs/new`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
    data: data,
  };

  const res = await Axios(config);
  return res;
};

const dropFood_api = async (token) => {
  const headers = createHeader(token);
  const res = await postRequest(`${API_URL}dogs/dropfood`, {}, headers);
  return res;
};

const makeNoise_api = async (token) => {
  const headers = createHeader(token);
  const res = await postRequest(`${API_URL}dogs/makenoise`, {}, headers);
  console.log('res', res);
  return res;
};

const howMuchLeft_api = async (token) => {
  const headers = createHeader(token);
  const res = await getRequest(`${API_URL}dogs/howmuch`, headers, {});
  console.log('res', res);
  return res;
};

const deleteDog_api = async (dogId, token) => {
  const headers = createHeader(token);
  const req_url = `${API_URL}dogs/${dogId}`;

  const config = {
    method: 'DELETE',
    headers,
    data: {},
  };

  const res = await Axios.delete(req_url, config);
  return res;
};

const fetchDogNames_api = async () => {
  const res = await getRequest(`${DOG_API_URL}`, []);
  return res;
};

const getFilteredData = async (filteredData) => {
  console.log('in tem fun', filteredData);
  let data = new FormData();

  Object.entries(filteredData).forEach(([key, value]) => {
    if (key === 'image') {
      const array = item[key].split('/');
      const name = array[array.length - 1];
      const photo = {
        uri: item[key],
        type: 'image/jpeg',
        name: name,
      };
      data.append(key, photo);
    } else {
      data.append(key, value);
    }
  });
  return data;
  //   const keysArray = Object.keys(item);
  //   console.log('keysArray: ', keysArray);
  //   const key = keysArray[0];
  //   console.log('key:', key);
  //   if (key === 'image') {
  //     const array = item[key].split('/');
  //     const name = array[array.length - 1];
  //     const photo = {
  //       uri: item.key,
  //       type: 'image/jpeg',
  //       name: name,
  //     };
  //     data.append(key, photo);
  //   } else {
  //     console.log('item: ', item);
  //     console.log('item.key: ', item[key]);
  //     const value = item[key];
  //     console.log('value:', value);
  //     data.append(key, value);
  //   }
  // }
  // console.log('filtered data:', data);
};

const updateDog_api = async (dogId, token, changesObj) => {
  const { changes } = changesObj;
  console.log('token: ', token);
  const req_url = `${API_URL}dogs/update/${dogId}`;
  // const data = await getFilteredData(changes);
  const data = new FormData();
  data.append('name','yyy')
  console.log('data: ', data);
  const config = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
    data: data,
  };
  const res = await Axios.put(req_url, config);
  return res;
};

export const API_INSTANCE = {
  login: login_api,
  signup: signup_api,
  addDog: addDog_api,
  getDogs: getUserDogs_api,
  getHisunim: getHisunim_api,
  addHisun: addHisun_api,
  dropFood: dropFood_api,
  makeNoise: makeNoise_api,
  howMuchLeft: howMuchLeft_api,
  deleteDog: deleteDog_api,
  updateDog: updateDog_api,
  fetchDogNames: fetchDogNames_api,
};

const postRequest = async (url, body, headers = {}) => {
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
