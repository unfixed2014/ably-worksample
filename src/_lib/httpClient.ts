import axios from 'axios';

let cachedClient: IHttpClient | null = null;

export interface IHttpClient {
  get(url: string): Promise<any>;
  post(url: string, data: any): Promise<any>;
  setHeader(key: string, value: string): void;
}

const FakeHttpClient = (): IHttpClient => {
  return {
    get: (url: string) => Promise.resolve({ data: {} }),
    post: (url: string, data: any) => Promise.resolve({ data: {} }),
    setHeader: (key: string, value: string) => {
      console.log('setHeader', key, value);
    },
  };
};

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

  cachedClient = {
    get: (url: string) => axiosClient.get(url),
    post: (url: string, data: any) => axiosClient.post(url, data),
    setHeader: (key: string, value: string) => {
      axiosClient.defaults.headers.common[key] = value;
    },
  };

  return cachedClient;
};

export { HttpClient, FakeHttpClient };
