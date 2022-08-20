import axios from 'axios';

const cachedClient = null;

const HttpClient = (() => {
  if (cachedClient) {
    return cachedClient;
  }
  return axios.create({
    baseURL: 'https://ably-frontend-assignment-server.vercel.app',
    responseType: 'json',
  });
})();

export default HttpClient;
