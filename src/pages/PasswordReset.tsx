import { FormEvent, useState } from 'react';
import { useDeps } from '../_lib/DepContext';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const { authService } = useDeps();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      return;
    }

    try {
      const state = await authService.requestEmailVerification(email);
      navigate('/verify-code', { replace: true, state });
    } catch (err: any) {
      setErrorMessage(err.message);
      console.log(err);
    }
  };

  return (
    <>
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
