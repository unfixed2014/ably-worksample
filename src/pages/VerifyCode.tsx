import { FormEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDeps } from '../_lib/DepContext';

const VerifyCode = () => {
  const { state } = useLocation();
  const [verifyCode, setVerifyCode] = useState('');
  const { authService } = useDeps();
  const [errorMessage, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { email, authCode, issueToken } = state as any;
      const { confirmToken } = await authService.requestVerifyCode(email, authCode, issueToken);
    } catch (e: any) {
      setError(e.message);
      console.log(e);
    }
  };

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
