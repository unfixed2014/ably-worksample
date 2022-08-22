import { FormEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDeps } from '../_lib/DepContext';
import { isErrorWithMessage } from '../_lib/Error';

const ModifyPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { state } = useLocation();
  const { authService } = useDeps();

  if (!state) {
    return (
      <div data-testid="modifyPassword">
        <p data-testid="errorMessage">잘못된 접근입니다.</p>
      </div>
    );
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!password) {
      setErrorMessage('비밀번호를 입력해주세요.');
    }

    if (password !== passwordConfirm) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const { confirmToken, email } = state as { confirmToken: string; email: string };
      await authService.requestPasswordModification(email, confirmToken, password, passwordConfirm);
      setSuccessMessage('비밀번호가 변경되었습니다.');
    } catch (err: unknown) {
      if (isErrorWithMessage(err)) {
        setErrorMessage(err.message);
        return;
      }
      console.log(err);
    }
  };

  return (
    <div
      data-testid="modifyPassword"
      className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8">
        {successMessage && <p data-testid="successMessage">{successMessage}</p>}
        {errorMessage && <p data-testid="errorMessage">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  비밀 번호
                </label>
                <input
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  data-testid="passwordInput"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  비밀번호 확인
                </label>
                <input
                  type="password"
                  placeholder="비밀번호 확인"
                  value={passwordConfirm}
                  data-testid="passwordConfirmInput"
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                data-testid="submitBtn"
              >
                다음
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyPassword;
