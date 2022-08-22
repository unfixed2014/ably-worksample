import { FormEvent, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeps } from '../_lib/DepContext';
import { isErrorWithMessage } from '../_lib/Error';

const VerifyCode = () => {
  const { state } = useLocation();
  const [authCode, setAuthCode] = useState('');
  const { authService } = useDeps();
  const [errorMessage, setError] = useState('');
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const savedCallback = useRef<() => void>(() => null);
  const timerId = useRef<number>(0);

  function callback() {
    setCount(count + 1);
  }

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    timerId.current = window.setInterval(tick, 1000);
    return () => clearInterval(timerId.current);
  }, []);

  const padding = (num: number) => {
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  };

  const handleSubmit = async (e: FormEvent, timeInSecond: number) => {
    e.preventDefault();

    const { email, issueToken } = state as {
      email: string;
      issueToken: string;
    };

    if (!authCode) {
      setError('인증 코드를 입력해주세요.');
      return;
    }

    if (timeInSecond === 0) {
      setError('인증 시간이 초과되었습니다.');
      return;
    }

    try {
      const { confirmToken } = await authService.requestVerifyCode(email, authCode, issueToken);
      navigate('/modify-password', { state: { email, confirmToken } });
    } catch (err) {
      if (isErrorWithMessage(err)) {
        setError(err.message);
        return;
      }
      console.log(err);
    }
  };

  if (!state) {
    return (
      <div data-testid="verifyCodeWrapper">
        <p data-testid="errorMessage">잘못된 접근입니다.</p>
      </div>
    );
  }

  const timeInSecond = Math.floor((state as any).remainMillisecond) / 1000 - count;
  const displaySecond = padding(Math.floor(timeInSecond % 60));
  const displayMinute = padding(Math.floor(timeInSecond / 60));

  if (timeInSecond === 0) {
    window.clearInterval(timerId.current);
  }

  return (
    <div
      data-testid="verifyCodeWrapper"
      className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8">
        <p data-testid="counter">
          {displayMinute}:{displaySecond}
        </p>
        {errorMessage && <div data-testid="errorMessage">{errorMessage}</div>}
        <form onSubmit={(e) => handleSubmit(e, timeInSecond)}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  인증 코드
                </label>
                <input
                  type="text"
                  placeholder="인증 코드를 입력하세요"
                  autoFocus
                  data-testid="verifyCodeInput"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
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

export default VerifyCode;
