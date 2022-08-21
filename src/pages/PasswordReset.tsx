import { useState } from 'react';

const PasswordReset = () => {
  const [email, setEmail] = useState('');

  return (
    <div data-testid="passwordResetWapper">
      <form>
        <input
          type="email"
          placeholder="email"
          autoFocus
          data-testid="emailInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" value="다음" data-testid="nextBtn" />
      </form>
    </div>
  );
};

export default PasswordReset;
