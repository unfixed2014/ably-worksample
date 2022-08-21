// ### 회원 정보 조회 페이지

// - [x] 회원 정보를 보여줄 수 있는 Card를 배치합니다.
//   - [x] 이름, 이메일, 프로필 이미지
// - [x] 페이지 진입 시 [3. 회원 정보 조회 API] 를 호출합니다.
// - [x] 호출에 실패하면 [1. 로그인 페이지] 로 이동합니다.
// - [x] 호출이 성공하면 [3. 회원 정보 조회 API] 의 응답 결과를 화면에 렌더링 합니다.
// - [x] 로그아웃 Button을 배치합니다.
//   - [x] 클릭하면 [2. 로그아웃 API] 를 호출하고 응답 결과에 따라 처리합니다.
//   - [x] 호출에 실패하면 메시지로 알립니다.
//   - [x] 호출이 성공하면 [1. 로그인 페이지] 로 이동합니다.

import { cleanup, screen, waitFor } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import MemberInfo from '../pages/MemberInfo';
import { IAuthService, FakeAuthService } from '../_lib/AuthServices';
import { defaultProvider, DepsProvider } from '../_lib/DepContext';
import renderWithRouter from './utils/renderWithRouter';

const MemberInfoWithRoutes = () => (
  <>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/member-info" element={<MemberInfo />} />
    </Routes>
  </>
);

const MemberInfoWithDep = (providers = {}) => (
  <DepsProvider
    services={{
      ...defaultProvider,
      ...providers,
    }}
  >
    <MemberInfoWithRoutes />
  </DepsProvider>
);

test('컴포넌트가 렌더링 되어야 한다.', async () => {
  renderWithRouter(<MemberInfo />);

  await waitFor(async () =>
    expect(await screen.findByTestId('memberInfoWrapper')).toBeInTheDocument(),
  );
});

describe('GetUserInfo 관련 테스트', () => {
  let authService: IAuthService = new FakeAuthService();

  beforeEach(() => {
    authService = new FakeAuthService();
  });

  test('유저 정보를 받아오는데 성공하면 정보가 보여진다', async () => {
    renderWithRouter(<MemberInfo />);

    await waitFor(() => {
      expect(screen.getByTestId('memberName').textContent).toEqual('ably');
    });
  });

  test('유저 정보를 받아오는대 로그인 페이지로 이동한다', async () => {
    authService.reqeustUserInfo = jest.fn().mockRejectedValue({ message: 'error', status: 500 });

    renderWithRouter(MemberInfoWithDep({ authService: authService }), {
      initialEntries: ['/member-info'],
    });

    await waitFor(async () =>
      expect(await screen.findByTestId('loginWrapper')).toBeInTheDocument(),
    );
  });
});

describe('로그아웃 관련 테스트', () => {
  let authService: IAuthService = new FakeAuthService();

  beforeEach(() => {
    authService = new FakeAuthService();
  });

  test('로그아웃 버튼이 렌더링 되어야 한다', async () => {
    await waitFor(() => renderWithRouter(<MemberInfo />));

    expect(await screen.findByTestId('logoutBtn')).toBeInTheDocument();
  });

  test('로그아웃이 버튼을 클릭했을 경우 로그아웃 요청이 진행되어야 한다', async () => {
    authService.requestLogout = jest.fn().mockResolvedValue(null);

    const { user } = renderWithRouter(MemberInfoWithDep({ authService: authService }), {
      initialEntries: ['/member-info'],
    });

    await user.click(screen.getByTestId('logoutBtn'));

    expect(authService.requestLogout).toBeCalled();
  });

  test('로그아웃이 성공했을 경우 로그인 페이지로 이동해야 한다', async () => {
    authService.requestLogout = jest.fn().mockResolvedValue(null);

    const { user } = renderWithRouter(MemberInfoWithDep({ authService: authService }), {
      initialEntries: ['/member-info'],
    });

    await user.click(screen.getByTestId('logoutBtn'));

    await waitFor(async () =>
      expect(await screen.findByTestId('loginWrapper')).toBeInTheDocument(),
    );
  });

  test('로그아웃이 실패했을 경우 에러 메세지를 보여줘야 한다', async () => {
    authService.requestLogout = jest.fn().mockRejectedValue({ message: '에러', status: 500 });

    const { user } = renderWithRouter(MemberInfoWithDep({ authService: authService }), {
      initialEntries: ['/member-info'],
    });

    await user.click(screen.getByTestId('logoutBtn'));

    await waitFor(async () =>
      expect((await screen.findByTestId('errorMessage')).textContent).toEqual('에러'),
    );
  });
});
