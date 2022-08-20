import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import httpClient from '../_lib/httpClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    try {
      const res = await httpClient.post('/api/login', { email, password });
      setEmail('');
      setPassword('');
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form data-testId="loginForm" onSubmit={handleSubmit}>
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
        <button type="button" data-testId="passwordResetBtn">
          비밀번호 재설정
        </button>
      </Link>
    </>
  );
};

export default Login;
