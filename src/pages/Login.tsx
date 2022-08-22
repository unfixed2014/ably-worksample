import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDeps } from '../_lib/DepContext';
import { isErrorWithMessage } from '../_lib/Error';

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
    } catch (err) {
      if (isErrorWithMessage(err)) {
        setErrorMessage(err.message);
        return;
      }
      console.log(err);
    }
  };

  return (
    <div
      data-testid="loginWrapper"
      className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
              alt="Workflow"
            /> */}
          <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
            로그인
          </h2>
        </div>
        {errorMessage && <p data-testid="errorMessage">{errorMessage}</p>}

        <form className="mt-8 space-y-6" data-testid="loginForm" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                이메일 주소
              </label>
              <input
                type="email"
                placeholder="이메일 주소"
                data-testid="emailInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                placeholder="password"
                data-testid="passwordInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center"></div>

            <div className="text-sm">
              <Link
                to="/password-reset"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                data-testid="passwordResetBtn"
              >
                비밀번호 재설정
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              data-testid="loginBtn"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
