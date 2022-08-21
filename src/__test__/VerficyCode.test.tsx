// - [x] 인증 코드를 입력 할 수 있는 Input Form과 인증 만료 시간 Counter, 다음 Button을 배치합니다.
// - [] 인증 만료 시간 Counter는 앞서 저장한 남은 인증 시간을 활용해서 mm:ss로 표현합니다.
// - [] 다음 Button을 클릭하면 인증 코드를 검증합니다.
// - [x] 인증 input에 값을 넣을 경우 input 값이 변경되어야 합니다
// - [] 인증 버튼의 값을 넣지 않고 버튼을 누를경우 아무일도 발생하지 않아야 합니다
// - [] [5. 인증 코드 검증 API] 를 호출하고 응답 결과에 따라 처리합니다.
// - [] 호출에 실패하면 메시지로 알립니다.
// - [] 호출이 성공하면 [C. 비밀번호 변경 페이지] 로 이동합니다.

import { screen } from '@testing-library/react';
import VerifyCode from '../pages/VerifyCode';
import { FakeAuthService } from '../_lib/AuthServices';
import { defaultProvider, DepsProvider } from '../_lib/DepContext';
import renderWithRouter from './utils/renderWithRouter';

const VerifyCodeWithDep = (providers = {}) => (
  <DepsProvider
    services={{
      ...defaultProvider,
      ...providers,
    }}
  >
    <VerifyCode />
  </DepsProvider>
);

test('VerifyCode 컴포넌트가 보여줘야 한다', () => {
  renderWithRouter(<VerifyCode />);

  expect(screen.getByTestId('verifyCodeWrapper')).toBeInTheDocument();
});

test('인증 코드를 입력할 수 있는 input과 만료시간 counter 다음 버튼을 배치합니다', () => {
  renderWithRouter(<VerifyCode />);

  expect(screen.getByTestId('verifyCodeInput')).toBeInTheDocument();
  expect(screen.getByTestId('counter')).toBeInTheDocument();
  expect(screen.getByTestId('nextBtn')).toBeInTheDocument();
});

test('input에 verifyCode를 입력하면 input 값이 변경되어야 합니다', async () => {
  const { user } = renderWithRouter(<VerifyCode />);

  await user.click(screen.getByTestId('verifyCodeInput'));
  await user.keyboard('123456');

  expect(screen.getByTestId('verifyCodeInput')).toHaveValue('123456');
});
