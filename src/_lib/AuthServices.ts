import { HttpClient, IHttpClient } from './httpClient';

export interface requestLoginResponse {
  accessToken: string;
}

export interface requestUserInfoResponse {
  name: string;
  email: string;
  profileImage: string;
  lastConnectedAt: Date;
}

export interface requestEmailVerificationResponse {
  issueToken: string;
  remainMillisecond: number;
}

export interface requestVerifyCodeResponse {
  confirmToken: string;
}

export interface requestPasswordModification {
  email: string;
}

export interface IAuthService {
  requestLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<requestLoginResponse>;
  requestLogout(): Promise<void>;
  reqeustUserInfo(): Promise<requestUserInfoResponse>;
  requestEmailVerification(email: string): Promise<requestEmailVerificationResponse>;
  requestVerifyCode(
    email: string,
    authCode: string,
    issueToken: string,
  ): Promise<requestVerifyCodeResponse>;
  requestPasswordModification(
    email: string,
    confirmToken: string,
    newPassword: string,
    newPasswordConfirm: string,
  ): Promise<requestPasswordModification>;
}

export class AuthService implements IAuthService {
  constructor(private client: IHttpClient = HttpClient()) {}

  async requestLogin({ email, password }: { email: string; password: string }) {
    const res = await this.client.post('/api/login', { email, password });
    return res.data;
  }

  async requestLogout() {
    await this.client.post('/api/logout', {});
  }

  async reqeustUserInfo() {
    const res = await this.client.get('/api/user');
    return res.data;
  }

  async requestEmailVerification(email: string): Promise<requestEmailVerificationResponse> {
    const res = await this.client.get(`/api/reset-password?email=${email}`);
    return res.data;
  }

  async requestVerifyCode(
    email: string,
    authCode: string,
    issueToken: string,
  ): Promise<requestVerifyCodeResponse> {
    const res = await this.client.post('/api/reset-password', { email, authCode, issueToken });
    return res.data;
  }

  async requestPasswordModification(
    email: string,
    confirmToken: string,
    newPassword: string,
    newPasswordConfirm: string,
  ) {
    const res = await this.client.patch('/api/reset-password', {
      email,
      confirmToken,
      newPassword,
      newPasswordConfirm,
    });

    return res.data;
  }
}

export class FakeAuthService implements IAuthService {
  async requestLogin({ email, password }: { email: string; password: string }) {
    if (email === 'ably@dummy.com' && password === '!abc321#$') {
      return Promise.resolve({ accessToken: 'toekewjiorjewqoirjioewjoie' });
    }
    return Promise.reject({
      message: 'invalid email or password',
      status: '401',
    });
  }

  async requestLogout() {
    return Promise.resolve();
  }

  async reqeustUserInfo() {
    return Promise.resolve({
      name: 'ably',
      email: 'ably@ably.com',
      profileImage: 'abcde',
      lastConnectedAt: new Date(),
    });
  }

  async requestEmailVerification(_email: string): Promise<requestEmailVerificationResponse> {
    return Promise.resolve({
      issueToken: '171009',
      remainMillisecond: 1000 * 60 * 3,
    });
  }

  async requestVerifyCode(
    _email: string,
    _authCode: string,
    _issueToken: string,
  ): Promise<requestVerifyCodeResponse> {
    return {
      confirmToken: '123456',
    };
  }

  async requestPasswordModification(
    email: string,
    _confirmToken: string,
    _newPassword: string,
    _newPasswordConfirm: string,
  ) {
    return {
      email,
    };
  }
}
