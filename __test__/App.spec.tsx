import { act, render, screen, userEvent } from '@testing-library/react-native';
import React from 'react';

import App from '../src/App';
import { QuizzillaCProvider } from '../src/modules/QuizzillaContext';

describe('App', () => {
  test('renders the app', () => {
    render(<App />);
    expect(screen.getByLabelText('root')).toBeTruthy();
  });

  test('given term and definition when user submits form then card is added', async () => {
    render(
      <QuizzillaCProvider>
        <App />
      </QuizzillaCProvider>
    );
    const user = userEvent.setup();
    const termInput = screen.getByLabelText('term input');
    const definitionInput = screen.getByLabelText('definition input');
    const submitButton = screen.getByLabelText('submit button');
    const term = 'Test Term';
    const definition = 'Test Definition';

    await act(async () => {
      await user.type(termInput, term);
      await user.type(definitionInput, definition);
      await user.press(submitButton);

      expect(screen.getByLabelText('card-1')).toBeTruthy();
    });
  });

  test('given no term with definition when user submits form then no card is added', async () => {
    render(
      <QuizzillaCProvider>
        <App />
      </QuizzillaCProvider>
    );
    const user = userEvent.setup();
    const termInput = screen.getByLabelText('term input');
    const definitionInput = screen.getByLabelText('definition input');
    const submitButton = screen.getByLabelText('submit button');
    const term = '';
    const definition = 'Test Definition';

    await act(async () => {
      await user.type(termInput, term);
      await user.type(definitionInput, definition);
      await user.press(submitButton);

      expect(screen.queryByLabelText('card-1')).toBeFalsy();
    });
  });

  test('given term with no definition when user submits form then no card is added', async () => {
    render(
      <QuizzillaCProvider>
        <App />
      </QuizzillaCProvider>
    );
    const user = userEvent.setup();
    const termInput = screen.getByLabelText('term input');
    const definitionInput = screen.getByLabelText('definition input');
    const submitButton = screen.getByLabelText('submit button');
    const term = 'Test Term';
    const definition = '';

    await act(async () => {
      await user.type(termInput, term);
      await user.type(definitionInput, definition);
      await user.press(submitButton);

      expect(screen.queryByLabelText('card-1')).toBeFalsy();
    });
  });
});
