import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ReactElement } from 'react';

const renderWithRouter = (ui: ReactElement, { initialEntries = ['/'] } = {}) => {
  return {
    user: userEvent.setup(),
    ...render(<MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>),
  };
};

export default renderWithRouter;
