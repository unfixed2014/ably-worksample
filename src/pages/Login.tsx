import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <form data-testId="loginForm">
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <input type="submit" value="Login" data-testId="loginBtn" />
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
