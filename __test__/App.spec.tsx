import {
  render,
  screen,
  userEvent,
  waitFor,
} from '@testing-library/react-native';
import React from 'react';

import App from '../src/App';

describe('App', () => {
  test('renders the app', () => {
    render(<App />);
    expect(screen.getByLabelText('root')).toBeTruthy();
  });

  test.skip('handleAdd adds a new card', async () => {
    render(<App />);
    const user = userEvent.setup();
    const termInput = screen.getByLabelText('term input');
    const definitionInput = screen.getByLabelText('definition input');
    const submitButton = screen.getByLabelText('submit button');
    const term = 'Test Term';
    const definition = 'Test Definition';

    await waitFor(() => {
      user.type(termInput, term);
      user.type(definitionInput, definition);
    });
    await user.press(submitButton);
    expect(screen.getByLabelText('card-2')).toBeTruthy();
  });

  test.skip('handleAdd does not add a new card if term is empty', async () => {
    render(<App />);
    const user = userEvent.setup();
    const termInput = screen.getByLabelText('term input');
    const definitionInput = screen.getByLabelText('definition input');
    const submitButton = screen.getByLabelText('submit button');
    const term = '';
    const definition = 'Test Definition';

    await waitFor(() => {
      user.type(termInput, term);
      user.type(definitionInput, definition);
      user.press(submitButton);
      expect(screen.queryByLabelText('card-2')).toBeFalsy();
    });
  });

  test.skip('handleAdd does not add a new card if definition is empty', async () => {
    render(<App />);
    const user = userEvent.setup();
    const termInput = screen.getByLabelText('term input');
    const definitionInput = screen.getByLabelText('definition input');
    const submitButton = screen.getByLabelText('submit button');
    const term = 'Test Term';
    const definition = '';

    await waitFor(() => {
      user.type(termInput, term);
      user.type(definitionInput, definition);
      user.press(submitButton);
      expect(screen.queryByLabelText('card-2')).toBeFalsy();
    });
  });
});
