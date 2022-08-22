import axios from 'axios';

let cachedClient: IHttpClient | null = null;
type ReponseType<T> = {
  data: T;
};

export interface IHttpClient {
  get<T>(url: string): Promise<ReponseType<T>>;
  post<T>(url: string, data: unknown): Promise<ReponseType<T>>;
  patch<T>(url: string, data: unknown): Promise<ReponseType<T>>;
  setHeader(key: string, value: string): void;
}

const FakeHttpClient = (): IHttpClient => {
  return {
    get: <T>(_url: string) => Promise.resolve({ data: {} as T }),
    post: <T>(_url: string, _data: unknown) => Promise.resolve({ data: {} as T }),
    patch: <T>(_url: string, _data: unknown) => Promise.resolve({ data: {} as T }),
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
    post: (url: string, data: unknown) => axiosClient.post(url, data),
    setHeader: (key: string, value: string) => {
      axiosClient.defaults.headers.common[key] = value;
    },
    patch: (url: string, data: unknown) => axiosClient.patch(url, data),
  };

  return cachedClient;
};

export { HttpClient, FakeHttpClient };
