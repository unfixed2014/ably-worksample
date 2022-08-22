import { FormEvent, useState } from 'react';
import { useDeps } from '../_lib/DepContext';
import { useNavigate } from 'react-router-dom';
import { isErrorWithMessage } from '../_lib/Error';

const PasswordReset = () => {
  const { authService } = useDeps();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      return;
    }

    try {
      const state = await authService.requestEmailVerification(email);
      navigate('/verify-code', {
        replace: true,
        state: {
          ...state,
          email,
        },
      });
    } catch (err: unknown) {
      if (isErrorWithMessage(err)) {
        setErrorMessage(err.message);
        return;
      }
      return;
    }
  };

  return (
    <div
      className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      data-testid="passwordResetWapper"
    >
      <div className="max-w-md w-full space-y-8">
        {errorMessage && <div data-testid="errorMessage">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  이메일
                </label>
                <input
                  type="email"
                  placeholder="이메일"
                  autoFocus
                  data-testid="emailInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                data-testid="nextBtn"
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

export default PasswordReset;
