import axios from 'axios';

let cachedClient: IHttpClient | null = null;

export interface IHttpClient {
  get: (url: string) => Promise<any>;
  post: (url: string, data: any) => Promise<any>;
}

const HttpClient = (): IHttpClient => {
  if (cachedClient) {
    return cachedClient;
  }

  const axiosClient = axios.create({
    baseURL: 'https://ably-frontend-assignment-server.vercel.app',
    responseType: 'json',
  });

  axiosClient.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response) {
        return Promise.reject({
          message: error.response?.data?.error?.message || 'unknown error',
          status: error.response.status,
        });
      } else if (error.request) {
        return Promise.reject({
          message: 'request failed',
          status: 404,
        });
      }
      return Promise.reject({
        message: 'unknown error',
        status: 404,
      });
    },
  );

  cachedClient = axiosClient;

  return cachedClient;
};

export default HttpClient;
