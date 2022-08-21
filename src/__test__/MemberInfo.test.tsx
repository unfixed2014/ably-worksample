import { screen } from '@testing-library/react';
import MemberInfo from '../pages/MemberInfo';
import renderWithRouter from './utils/renderWithRouter';

test('컴포넌트가 렌더링 되어야 한다.', () => {
  renderWithRouter(<MemberInfo />);

  expect(screen.getByTestId('memberInfoWrapper')).toBeInTheDocument();
});
