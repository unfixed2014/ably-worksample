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
    <div data-testid="modifyPassword" onSubmit={handleSubmit}>
      {successMessage && <p data-testid="successMessage">{successMessage}</p>}
      {errorMessage && <p data-testid="errorMessage">{errorMessage}</p>}
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
