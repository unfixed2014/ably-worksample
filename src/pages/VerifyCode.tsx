import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeps } from '../_lib/DepContext';

const VerifyCode = () => {
  const { state } = useLocation();
  const [verifyCode, setVerifyCode] = useState('');
  const { authService } = useDeps();
  const [errorMessage, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!verifyCode) {
      setError('인증 코드를 입력해주세요.');
      return;
    }

    try {
      const { email, authCode, issueToken } = state as any;
      const { confirmToken } = await authService.requestVerifyCode(email, authCode, issueToken);
      navigate('/modify-password', { state: { email, confirmToken } });
    } catch (e: any) {
      setError(e.message);
      console.log(e);
    }
  };

  if (!state) {
    return (
      <div data-testid="verifyCodeWrapper">
        <p data-testid="errorMessage">잘못된 접근입니다.</p>
      </div>
    );
  }

  return (
    <div data-testid="verifyCodeWrapper">
      <p data-testid="counter">00:00</p>
      <p data-testid="errorMessage">{errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="인증 코드를 입력하세요"
          autoFocus
          data-testid="verifyCodeInput"
          value={verifyCode}
          onChange={(e) => setVerifyCode(e.target.value)}
        />
        <input type="submit" value="다음" data-testid="nextBtn" />
      </form>
    </div>
  );
};

export default VerifyCode;
