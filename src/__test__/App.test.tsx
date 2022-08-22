import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

test('App 컴포넌트가 렌더링 외어야 한다', () => {
  renderWithRouter(<App />);
  expect(screen.getByTestId('app-wrapper')).toBeInTheDocument();
});

test('Router에 등록되지 않는 페이지가 나오면 404가 노출되어야 한다', () => {
  renderWithRouter(<App />, { initialEntries: ['/not-found'] });
  expect(screen.getByText('404')).toBeInTheDocument();
});

test('Abount 페이지로 처음에 진입하면 About 페이지가 노출되어야 한다', () => {
  renderWithRouter(<App />, { initialEntries: ['/about'] });
  expect(screen.getByText('aboutpage')).toBeInTheDocument();
});
