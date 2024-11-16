import axiosCreator from 'axios';

const axios = axiosCreator.create({
  baseURL: `${process.env.REACT_APP_API_HOST}`,
});

axios.interceptors.request.use((config) => {
  return config;
});

export { axios };
