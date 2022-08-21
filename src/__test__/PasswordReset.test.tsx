// - [x] 이메일을 입력 할 수 있는 Input Form과 다음(next) Button을 배치합니다.
// - [] 다음 Button을 클릭하면 이메일을 검증합니다.
// - [] [4. 인증 코드 발급 요청 API] 를 호출하고 응답 결과에 따라 처리합니다.
// - [] 호출에 실패하면 메시지로 알립니다.
// - [] 호출이 성공하면 [B. 인증 코드 검증 페이지] 로 이동합니다.

import { screen } from '@testing-library/dom';
import PasswordReset from '../pages/PasswordReset';
import { AuthService, FakeAuthService } from '../_lib/AuthServices';
import { defaultProvider, DepsProvider } from '../_lib/DepContext';
import renderWithRouter from './utils/renderWithRouter';

const PasswordResetWithDep = (providers = {}) => (
  <DepsProvider
    services={{
      ...defaultProvider,
      ...providers,
    }}
  >
    <PasswordReset />
  </DepsProvider>
);

test('컴포넌트가 렌더링 되어야 한다.', async () => {
  renderWithRouter(<PasswordReset />);
  expect(screen.getByTestId('passwordResetWapper')).toBeInTheDocument();
});

test('email 입력이 가능한 input버튼과 다음 버튼이 렌더링 되어야 한다', () => {
  renderWithRouter(<PasswordReset />);

  expect(screen.getByTestId('emailInput')).toBeInTheDocument();
  expect(screen.getByTestId('nextBtn')).toBeInTheDocument();
});

test('email을 입력하면 emailInput 값이 변경되어야 한다', async () => {
  const { user } = renderWithRouter(<PasswordResetWithRoute />);

  const emailInput = screen.getByTestId('emailInput');

  await user.keyboard('cannalee90@gmail.com');

  expect(emailInput).toHaveValue('cannalee90@gmail.com');
});
