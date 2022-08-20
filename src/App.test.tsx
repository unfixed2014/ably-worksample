import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { MemoryRouter } from 'react-router';

test('App 컴포넌트가 렌더링 외어야 한다', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  expect(screen.getByAltText('logo')).toBeInTheDocument();
});

test('Home으로 가는 Link가 렌더링 되어야 한다', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const linkElement = screen.getByText('Home');
  expect(linkElement).toBeInTheDocument();
});

test('Home으로 가는 Link를 클릭하면 Home으로 이동한다', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const user = userEvent.setup();
  await user.click(screen.getByText('Home'));
  expect(screen.getByText('homepage')).toBeInTheDocument();
});

test('Router에 등록되지 않는 페이지가 나오면 404가 노출되어야 한다', () => {
  render(
    <MemoryRouter initialEntries={['/pwoiejrioq']}>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByText('404')).toBeInTheDocument();
});
