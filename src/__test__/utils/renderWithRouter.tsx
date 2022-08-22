import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ReactElement } from 'react';
import { InitialEntry } from 'history';

const renderWithRouter = (
  ui: ReactElement,
  { initialEntries }: { initialEntries: InitialEntry[] } = { initialEntries: ['/'] },
) => {
  return {
    user: userEvent.setup(),
    ...render(<MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>),
  };
};

export default renderWithRouter;
