import React from 'react';
import { render, screen } from '@testing-library/react';
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
