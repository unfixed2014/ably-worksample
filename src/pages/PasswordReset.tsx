import { FormEvent, useState } from 'react';
import { useDeps } from '../_lib/DepContext';
import { Navigate } from 'react-router-dom';
import { requestEmailVerificationResponse } from '../_lib/AuthServices';

const PasswordReset = () => {
  const { authService } = useDeps();
  const [email, setEmail] = useState('');
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [verifyReponse, setVerifyReponse] = useState<requestEmailVerificationResponse | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      return;
    }
    try {
      const ret = await authService.requestEmailVerification(email);
      setVerifyReponse(ret);
      setIsRequestSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message);
      console.log(err);
    }
  };

  return (
    <>
      {isRequestSuccess && <Navigate to="/verify-code" replace={true} state={{ verifyReponse }} />}
      <div data-testid="passwordResetWapper">
        {errorMessage && <div data-testid="errorMessage">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            autoFocus
            data-testid="emailInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="submit" value="다음" data-testid="nextBtn" />
        </form>
      </div>
    </>
  );
};

export default PasswordReset;
