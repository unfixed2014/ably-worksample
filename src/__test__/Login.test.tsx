// ### 로그인 페이지

// - [x] 이메일과 비밀번호를 입력 할 수 있는 Input Form과 로그인 Button을 배치합니다.
// - [x] 비밀번호 재설정 Button을 배치합니다.
// - [] 로그인 Button을 클릭하면 이메일과 비밀번호를 검증 & 처리합니다.
// - [] [1. 로그인 API] 를 호출하고 응답 결과에 따라 처리합니다.
// - [] 호출에 실패하면 메시지로 알립니다.
// - [] 호출이 성공하면 [2. 회원 정보 조회 페이지] 로 이동합니다.
// - [] 클릭하면 [3. 비밀번호 재설정 > A. 인증 코드 발급 요청 페이지] 로 이동합니다.

import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';
import renderWithRouter from './utils/renderWithRouter';

test('로그인 form이 표시되어야 한다', () => {
  render(<Login />);
  expect(screen.getByTestId('loginForm')).toBeInTheDocument();
  expect(screen.getByTestId('loginBtn')).toBeInTheDocument();
});

test('비밀번호 재설정 button이 표시되어야 한다', () => {
  renderWithRouter(<Login />);
  expect(screen.getByTestId('passwordResetBtn')).toBeInTheDocument();
});
