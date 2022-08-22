// - [x] 인증 코드를 입력 할 수 있는 Input Form과 인증 만료 시간 Counter, 다음 Button을 배치합니다.
// - [] 인증 만료 시간 Counter는 앞서 저장한 남은 인증 시간을 활용해서 mm:ss로 표현합니다.
// - [x] 인증 input에 값을 넣을 경우 input 값이 변경되어야 합니다
// - [x] 인증 버튼의 값을 넣지 않고 버튼을 에러 메세지가 아무일도 발생하지 않아야 합니다
// - [x] [5. 인증 코드 검증 API] 를 호출하고 응답 결과에 따라 처리합니다.
// - [x] 호출에 실패하면 메시지로 알립니다.
// - [x] 호출이 성공하면 [C. 비밀번호 변경 페이지] 로 이동합니다.

import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import ModifyPassword from '../pages/ModifyPassword';
import VerifyCode from '../pages/VerifyCode';
import { FakeAuthService } from '../_lib/AuthServices';
import { defaultProvider, DepsProvider } from '../_lib/DepContext';
import renderWithRouter from './utils/renderWithRouter';

const VerifyCodeWithRoute = () => (
  <>
    <Routes>
      <Route path="/" element={<VerifyCode />}></Route>
      <Route path="/modify-password" element={<ModifyPassword />} />
    </Routes>
  </>
);

const VerifyCodeWithDep = (providers = {}) => (
  <DepsProvider
    services={{
      ...defaultProvider,
      ...providers,
    }}
  >
    <VerifyCodeWithRoute />
  </DepsProvider>
);

const defaultInitialEntries = [
  {
    pathname: '/',
    state: { email: 'ably@ably.com', authCode: '123456', issueToken: '123456' },
  },
];

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

test('인증 요청이 실패하면 error 메세지를 출력합니다.', async () => {
  const authService = new FakeAuthService();
  authService.requestVerifyCode = () => Promise.reject({ message: 'error' });
  const { user } = renderWithRouter(VerifyCodeWithDep({ authService }), {
    initialEntries: defaultInitialEntries,
  });

  await user.keyboard('123456');
  await user.click(screen.getByTestId('nextBtn'));

  expect(await screen.findByTestId('errorMessage')).toHaveTextContent('error');
});

test('인증 요청이 성공하면 패스워드 수정 페이지로 이동합니다.', async () => {
  const { user } = renderWithRouter(VerifyCodeWithDep(), {
    initialEntries: defaultInitialEntries,
  });

  await user.keyboard('123456');
  await user.click(screen.getByTestId('nextBtn'));

  expect(await screen.findByTestId('modifyPassword')).toBeInTheDocument();
});

test('인증 버튼의 값을 넣지 않고 버튼을 에러 메세지가 발생해야 합니다', async () => {
  const { user } = renderWithRouter(VerifyCodeWithDep(), {
    initialEntries: defaultInitialEntries,
  });

  await user.click(screen.getByTestId('nextBtn'));

  expect(screen.getByTestId('errorMessage')).toHaveTextContent('인증 코드를 입력해주세요.');
});
