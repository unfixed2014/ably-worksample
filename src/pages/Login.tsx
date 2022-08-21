import { FormEvent, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDeps } from '../_lib/DepContext';

const Login = () => {
  const { authService, httpClient } = useDeps();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    try {
      const { accessToken } = await authService.requestLogin({ email, password });
      setEmail('');
      setPassword('');
      setIsAuthorized(true);
      httpClient.setHeader('Authorization', `Bearer ${accessToken}`);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      {isAuthorized && <Navigate to="/member-info" replace={true} />}
      <h1>Login</h1>
      {errorMessage && <p data-testid="errorMessage">{errorMessage}</p>}
      <form data-testid="loginForm" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          data-testid="emailInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <input
          type="password"
          placeholder="password"
          data-testid="passwordInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Login" data-testid="loginBtn" />
      </form>
      <Link to="/password-reset">
        <button type="button" data-testid="passwordResetBtn">
          비밀번호 재설정
        </button>
      </Link>
    </>
  );
};

export default Login;
