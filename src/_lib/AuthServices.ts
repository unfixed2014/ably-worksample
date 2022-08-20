import HttpClient, { IHttpClient } from './httpClient';

export interface IAuthService {
  requestLogin({ email, password }: { email: string; password: string }): Promise<any>;
}

export class AuthService implements IAuthService {
  constructor(private client: IHttpClient = HttpClient()) {}

  async requestLogin({ email, password }: { email: string; password: string }) {
    const res = await this.client.post('/api/login', { email, password });
    return res;
  }
}

export class FakeAuthService implements IAuthService {
  async requestLogin({ email, password }: { email: string; password: string }) {
    return 'hello';
  }
}
