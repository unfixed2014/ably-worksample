// ### 로그인 페이지

// - [x] 이메일과 비밀번호를 입력 할 수 있는 Input Form과 로그인 Button을 배치합니다.
// - [x] 비밀번호 재설정 Button을 배치합니다.
// - [x] 비밀번호 재설정을 클릭하면 [3. 비밀번호 재설정 > A. 인증 코드 발급 요청 페이지] 로 이동합니다.
// - [] 로그인 Button을 클릭하면 이메일과 비밀번호를 검증 & 처리합니다.
// - [] [1. 로그인 API] 를 호출하고 응답 결과에 따라 처리합니다.
// - [] 호출에 실패하면 메시지로 알립니다.
// - [] 호출이 성공하면 [2. 회원 정보 조회 페이지] 로 이동합니다.

import { screen } from '@testing-library/react';
import Login from '../pages/Login';
import renderWithRouter from './utils/renderWithRouter';
import { Route, Routes } from 'react-router-dom';
import PasswordReset from '../pages/Password-reset';

test('로그인 form이 표시되어야 한다', () => {
  renderWithRouter(<Login />);
  expect(screen.getByTestId('loginForm')).toBeInTheDocument();
  expect(screen.getByTestId('loginBtn')).toBeInTheDocument();
});

test('비밀번호 재설정 button이 표시되어야 한다', () => {
  renderWithRouter(<Login />);
  expect(screen.getByTestId('passwordResetBtn')).toBeInTheDocument();
});

test('비밀번호 재설정 버튼을 누를 경우 패스워드 초기화 페이지로 이동한다', async () => {
  const { user } = renderWithRouter(
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/password-reset" element={<PasswordReset />} />
      </Routes>
    </>,
    { initialEntries: ['/login'] },
  );

  await user.click(screen.getByTestId('passwordResetBtn'));

  expect(screen.getByTestId('passwordResetWapper')).toBeInTheDocument();
});

test('email을 입력할 경우, email input의 value가 변경된다', async () => {
  const { user } = renderWithRouter(<Login />);
  const emailInput = screen.getByTestId('emailInput');

  await user.click(emailInput);
  await user.keyboard('cannalee90@gmail.com');

  expect(emailInput).toHaveValue('cannalee90@gmail.com');
});

test('password를 입력할 경우, password input value가 변경된다', async () => {
  const { user } = renderWithRouter(<Login />);
  const passwordInput = screen.getByTestId('passwordInput');

  await user.click(passwordInput);
  await user.keyboard('asdf1234');

  expect(passwordInput).toHaveValue('asdf1234');
});

test('바로 입력할 수 있도록 email에 포커스가 되어있어야 한다', async () => {
  renderWithRouter(<Login />);

  const emailInput = screen.getByTestId('emailInput');
  expect(emailInput).toHaveFocus();
});
