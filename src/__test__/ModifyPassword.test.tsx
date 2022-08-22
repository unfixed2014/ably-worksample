// - [x] wrapper가 표현되어야 합니다.
// - [x] 새로운 비밀번호, 새로운 비밀번호 확인 Input Form과 비밀번호 변경하기 Button을 배치합니다.
// - [] 새로운 비밀번호, 새로운 비밀번호 확인 input 값이 변경되어야 합니다
// - [] 잘못된 접근일 경우 메세지를 출력합니다.
// - [] 새로운 비밀번호가 일치하지 않을 경우 에러 메세지를 보여줘야 합니다
// - [] 각각의 비밀번호가 없을 경우 에러 메세지를 보여줘야 합니다.
// - [] 비밀번호 변경하기 Button을 클릭하면 새로운 비밀번호와 새로운 비밀번호 확인을 검증합니다.
// - [] 호출이 성공하면 메세지로 알려줍니다
// - [] 호출이 실패하면 메시지로 알립니다.

import ModifyPassword from '../pages/ModifyPassword';
import renderWithRouter from './utils/renderWithRouter';
import { screen } from '@testing-library/react';

test('컴포넌트가 렌더링 된다', () => {
  renderWithRouter(<ModifyPassword />);

  expect(screen.getByTestId('modifyPassword')).toBeInTheDocument();
});

test('비밀번호, 비밀번호 확인, 변경하니 버튼이 노출되어야 한다', () => {
  const { user } = renderWithRouter(<ModifyPassword />);

  const passwordInput = screen.getByTestId('passwordInput');
  const passwordConfimInput = screen.getByTestId('passwordConfirmInput');
  const submitBtn = screen.getByTestId('submitBtn');

  expect(passwordInput).toBeInTheDocument();
  expect(passwordConfimInput).toBeInTheDocument();
  expect(submitBtn).toBeInTheDocument();
});

test('비밀번호, 비밀번호 확인 input 값이 변경되어야 합니다', async () => {
  const { user } = renderWithRouter(<ModifyPassword />);

  const passwordInput = screen.getByTestId('passwordInput');
  const passwordConfirmInput = screen.getByTestId('passwordConfirmInput');

  await user.click(passwordInput);
  await user.keyboard('12345678');

  await user.click(passwordConfirmInput);
  await user.keyboard('12345678');

  expect(passwordInput).toHaveValue('12345678');
  expect(passwordConfirmInput).toHaveValue('12345678');
});
