import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDeps } from '../_lib/DepContext';

const Login = () => {
  const { authService, httpClient } = useDeps();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    try {
      const { accessToken } = await authService.requestLogin({ email, password });
      httpClient.setHeader('Authorization', `Bearer ${accessToken}`);
      navigate('/member-info', { replace: true });
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      <div data-testid="loginWrapper">
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
      </div>
    </>
  );
};

export default Login;
