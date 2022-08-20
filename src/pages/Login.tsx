import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
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
          onChange={(e) => setEmail((_) => (_ = e.target.value))}
          autoFocus
        />
        <input
          type="password"
          placeholder="password"
          data-testid="passwordInput"
          value={password}
          onChange={(e) => setPassword((_) => (_ = e.target.value))}
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
