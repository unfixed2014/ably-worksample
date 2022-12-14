// - [x] wrapper가 표현되어야 합니다.
// - [x] 새로운 비밀번호, 새로운 비밀번호 확인 Input Form과 비밀번호 변경하기 Button을 배치합니다.
// - [x] 새로운 비밀번호, 새로운 비밀번호 확인 input 값이 변경되어야 합니다
// - [x] 잘못된 접근일 경우 메세지를 출력합니다.
// - [x] 새로운 비밀번호가 일치하지 않고 변경하기 버튼을 누르면 에러 메세지를 보여줘야 합니다
// - [x] 비밀번호가 없을 경우 에러 메세지를 보여줘야 합니다.
// - [x] 호출이 성공하면 메세지로 알려줍니다
// - [x] 호출이 실패하면 메시지로 알립니다.

import ModifyPassword from '../pages/ModifyPassword';
import renderWithRouter from './utils/renderWithRouter';
import { screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { defaultProvider, DepsProvider } from '../_lib/DepContext';
import { FakeAuthService } from '../_lib/AuthServices';

const ModifyPasswordWithDep = (providers = {}) => (
  <DepsProvider
    services={{
      ...defaultProvider,
      ...providers,
    }}
  >
    <ModifyPassword />
  </DepsProvider>
);

const ModifyPasswordWithRoute = () => (
  <>
    <Routes>
      <Route path="/" element={<ModifyPassword />}></Route>
    </Routes>
  </>
);

const defaultInitialEntries = [
  {
    pathname: '/',
    state: { email: 'ably@ably.com', confirmToken: '123456' },
  },
];

test('컴포넌트가 렌더링 된다', () => {
  renderWithRouter(<ModifyPassword />);

  expect(screen.getByTestId('modifyPassword')).toBeInTheDocument();
});

test('비밀번호, 비밀번호 확인, 변경하니 버튼이 노출되어야 한다', () => {
  renderWithRouter(<ModifyPassword />, { initialEntries: defaultInitialEntries });

  const passwordInput = screen.getByTestId('passwordInput');
  const passwordConfimInput = screen.getByTestId('passwordConfirmInput');
  const submitBtn = screen.getByTestId('submitBtn');

  expect(passwordInput).toBeInTheDocument();
  expect(passwordConfimInput).toBeInTheDocument();
  expect(submitBtn).toBeInTheDocument();
});

test('비밀번호, 비밀번호 확인 input 값이 변경되어야 합니다', async () => {
  const { user } = renderWithRouter(<ModifyPassword />, { initialEntries: defaultInitialEntries });

  const passwordInput = screen.getByTestId('passwordInput');
  const passwordConfirmInput = screen.getByTestId('passwordConfirmInput');

  await user.click(passwordInput);
  await user.keyboard('12345678');

  await user.click(passwordConfirmInput);
  await user.keyboard('12345678');

  expect(passwordInput).toHaveValue('12345678');
  expect(passwordConfirmInput).toHaveValue('12345678');
});

test('잘못된 접근인 경우 메세지를 출력합니다', async () => {
  renderWithRouter(<ModifyPasswordWithRoute />, {
    initialEntries: ['/'],
  });

  expect(screen.getByTestId('errorMessage')).toHaveTextContent('잘못된 접근입니다.');
});

test('비밀번호, 비밀번호 확인의 값이 다를 경우 에러 메세지를 보여줘야 합니다', async () => {
  const { user } = renderWithRouter(<ModifyPassword />, { initialEntries: defaultInitialEntries });

  const passwordInput = screen.getByTestId('passwordInput');
  const passwordConfirmInput = screen.getByTestId('passwordConfirmInput');

  await user.click(passwordInput);
  await user.keyboard('12345678');

  await user.click(passwordConfirmInput);
  await user.keyboard('1234');

  await user.click(screen.getByTestId('submitBtn'));

  expect(screen.getByTestId('errorMessage')).toHaveTextContent('비밀번호가 일치하지 않습니다.');
});

test('비밀번호가 없을 경우 에러 메세지를 보여줘야 합니다', async () => {
  const { user } = renderWithRouter(<ModifyPassword />, { initialEntries: defaultInitialEntries });

  const passwordInput = screen.getByTestId('passwordInput');

  await user.click(passwordInput);
  await user.keyboard('12345678');

  await user.click(screen.getByTestId('submitBtn'));

  expect(screen.getByTestId('errorMessage')).toHaveTextContent('비밀번호가 일치하지 않습니다.');
});

test('호출이 실패하면 메세지로 보여줍니다', async () => {
  const authService = new FakeAuthService();
  authService.requestPasswordModification = () => Promise.reject({ message: 'error' });
  const { user } = renderWithRouter(ModifyPasswordWithDep({ authService }), {
    initialEntries: defaultInitialEntries,
  });

  const passwordInput = screen.getByTestId('passwordInput');
  const passwordConfirmInput = screen.getByTestId('passwordConfirmInput');
  const submitBtn = screen.getByTestId('submitBtn');

  await user.click(passwordInput);
  await user.keyboard('12345678');

  await user.click(passwordConfirmInput);
  await user.keyboard('12345678');

  await user.click(submitBtn);

  expect(await screen.findByTestId('errorMessage')).toHaveTextContent('error');
});

test('호출이 성공하면 메세지로 보여줍니다', async () => {
  const authService = new FakeAuthService();
  const { user } = renderWithRouter(ModifyPasswordWithDep({ authService }), {
    initialEntries: defaultInitialEntries,
  });

  const passwordInput = screen.getByTestId('passwordInput');
  const passwordConfirmInput = screen.getByTestId('passwordConfirmInput');
  const submitBtn = screen.getByTestId('submitBtn');

  await user.click(passwordInput);
  await user.keyboard('12345678');

  await user.click(passwordConfirmInput);
  await user.keyboard('12345678');

  await user.click(submitBtn);

  expect(await screen.findByTestId('successMessage')).toHaveTextContent(
    '비밀번호가 변경되었습니다.',
  );
});
