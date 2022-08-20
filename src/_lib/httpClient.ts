import axios from 'axios';

const cachedClient = null;

export interface IHttpClient {
  get: (url: string) => Promise<any>;
  post: (url: string, data: any) => Promise<any>;
}

const HttpClient = (): IHttpClient => {
  if (cachedClient) {
    return cachedClient;
  }
  return axios.create({
    baseURL: 'https://ably-frontend-assignment-server.vercel.app',
    responseType: 'json',
  });
};

export default HttpClient;
