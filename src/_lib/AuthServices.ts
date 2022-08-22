import { HttpClient, IHttpClient } from './httpClient';

export interface RequestLoginResponse {
  accessToken: string;
}

export interface RequestUserInfoResponse {
  name: string;
  email: string;
  profileImage: string;
  lastConnectedAt: Date;
}

export interface RequestEmailVerificationResponse {
  issueToken: string;
  remainMillisecond: number;
}

export interface RequestVerifyCodeResponse {
  confirmToken: string;
}

export interface RequestPasswordModification {
  email: string;
}

export interface IAuthService {
  requestLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<RequestLoginResponse>;
  requestLogout(): Promise<void>;
  reqeustUserInfo(): Promise<RequestUserInfoResponse>;
  requestEmailVerification(email: string): Promise<RequestEmailVerificationResponse>;
  requestVerifyCode(
    email: string,
    authCode: string,
    issueToken: string,
  ): Promise<RequestVerifyCodeResponse>;
  requestPasswordModification(
    email: string,
    confirmToken: string,
    newPassword: string,
    newPasswordConfirm: string,
  ): Promise<RequestPasswordModification>;
}

export class AuthService implements IAuthService {
  constructor(private client: IHttpClient = HttpClient()) {}

  async requestLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<RequestLoginResponse> {
    const res = await this.client.post<RequestLoginResponse>('/api/login', { email, password });
    return res.data;
  }

  async requestLogout(): Promise<void> {
    await this.client.post<void>('/api/logout', {});
  }

  async reqeustUserInfo() {
    const res = await this.client.get<RequestUserInfoResponse>('/api/user');
    return res.data;
  }

  async requestEmailVerification(email: string): Promise<RequestEmailVerificationResponse> {
    const res = await this.client.get<RequestEmailVerificationResponse>(
      `/api/reset-password?email=${email}`,
    );
    return res.data;
  }

  async requestVerifyCode(
    email: string,
    authCode: string,
    issueToken: string,
  ): Promise<RequestVerifyCodeResponse> {
    const res = await this.client.post<RequestVerifyCodeResponse>('/api/reset-password', {
      email,
      authCode,
      issueToken,
    });
    return res.data;
  }

  async requestPasswordModification(
    email: string,
    confirmToken: string,
    newPassword: string,
    newPasswordConfirm: string,
  ): Promise<RequestPasswordModification> {
    const res = await this.client.patch<RequestPasswordModification>('/api/reset-password', {
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

  async requestEmailVerification(_email: string): Promise<RequestEmailVerificationResponse> {
    return Promise.resolve({
      issueToken: '171009',
      remainMillisecond: 1000 * 60 * 3,
    });
  }

  async requestVerifyCode(
    _email: string,
    _authCode: string,
    _issueToken: string,
  ): Promise<RequestVerifyCodeResponse> {
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
