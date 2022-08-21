import { useLocation } from 'react-router-dom';

const VerifyCode = () => {
  const { state } = useLocation();
  return (
    <div data-testid="verifyCodeWrapper">
      <p data-testid="counter">00:00</p>
      <form>
        <input type="text" placeholder="인증 코드를 입력하세요" data-testid="verifyCodeInput" />
        <input type="submit" value="다음" data-testid="nextBtn" />
      </form>
    </div>
  );
};

export default VerifyCode;
