import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

test('App 컴포넌트가 렌더링 외어야 한다', () => {
  renderWithRouter(<App />);
  expect(screen.getByAltText('logo')).toBeInTheDocument();
});

test('Home으로 가는 Link가 렌더링 되어야 한다', () => {
  renderWithRouter(<App />);
  const linkElement = screen.getByText('Home');
  expect(linkElement).toBeInTheDocument();
});

test('Home으로 가는 Link를 클릭하면 Home으로 이동한다', async () => {
  const { user } = renderWithRouter(<App />);

  await user.click(screen.getByText('Home'));
  expect(screen.getByText('homepage')).toBeInTheDocument();
});

test('Router에 등록되지 않는 페이지가 나오면 404가 노출되어야 한다', () => {
  renderWithRouter(<App />, { initialEntries: ['/not-found'] });
  expect(screen.getByText('404')).toBeInTheDocument();
});

test('Abount 페이지로 처음에 진입하면 About 페이지가 노출되어야 한다', () => {
  renderWithRouter(<App />, { initialEntries: ['/about'] });
  expect(screen.getByText('aboutpage')).toBeInTheDocument();
});
