import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ModifyPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { state } = useLocation();

  if (!state) {
    return (
      <div data-testid="modifyPassword">
        <p data-testid="errorMessage">잘못된 접근입니다.</p>
      </div>
    );
  }

  return (
    <div data-testid="modifyPassword">
      <form>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          data-testid="passwordInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          data-testid="passwordConfirmInput"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <input type="submit" value="변경하기" data-testid="submitBtn" />
      </form>
    </div>
  );
};

export default ModifyPassword;
