import { FormEvent, useState } from 'react';
import { useDeps } from '../_lib/DepContext';
import { Navigate } from 'react-router-dom';

const PasswordReset = () => {
  const { authService } = useDeps();
  const [email, setEmail] = useState('');
  const [isRequestSuccess, setIsRequestSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      return;
    }
    try {
      const ret = await authService.requestEmailVerification(email);
      setIsRequestSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isRequestSuccess && <Navigate to="/verify-code" replace={true} />}
      <div data-testid="passwordResetWapper">
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
