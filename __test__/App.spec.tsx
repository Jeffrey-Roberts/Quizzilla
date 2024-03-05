import { render, act, screen, userEvent } from '@testing-library/react-native';
import { UserEventInstance } from '@testing-library/react-native/build/user-event/setup';
import axios from 'axios';
import React from 'react';

import App from '../src/App';
import { QuizzillaCProvider } from '../src/modules/QuizzillaContext';

jest.mock('axios');

describe('App', () => {
  let mockPost: jest.MockedFunction<typeof axios.post>;
  let mockDelete: jest.MockedFunction<typeof axios.delete>;
  let mockEdit: jest.MockedFunction<typeof axios.put>;

  let user: ReturnType<typeof userEvent.setup>;
  let termInput: HTMLElement;
  let definitionInput: HTMLElement;
  let submitButton: HTMLElement;

  beforeEach(() => {
    mockPost = axios.post as jest.MockedFunction<typeof axios.post>;
    mockPost.mockResolvedValue({
      data: { id: 1, name: 'Test Term', description: 'Test Definition' },
    });

    mockDelete = axios.delete as jest.MockedFunction<typeof axios.delete>;
    mockDelete.mockResolvedValue({});

    mockEdit = axios.put as jest.MockedFunction<typeof axios.put>;
    mockEdit.mockResolvedValue({
      data: { id: 1, name: 'Updated Term', description: 'Updated Definition' },
    });

    const { getByLabelText } = render(
      <QuizzillaCProvider>
        <App />
      </QuizzillaCProvider>
    );
    user = userEvent.setup();
    termInput = getByLabelText('term input');
    definitionInput = getByLabelText('definition input');
    submitButton = getByLabelText('submit button');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the app', () => {
    render(<App />);
    expect(screen.getByLabelText('root')).toBeTruthy();
  });

  test('given valid term and definition when user submits form then axios post request is sent and context is updated', async () => {
    const term = 'Test Term';
    const definition = 'Test Definition';

    await submitForm(
      user,
      termInput,
      definitionInput,
      submitButton,
      term,
      definition
    );

    await act(async () => {
      expect(mockPost).toHaveBeenCalledWith('http://localhost:8080/term', {
        id: 1,
        name: term,
        description: definition,
      });
    });
    expect(screen.getByLabelText('card-1')).toBeTruthy();
    expect(screen.getByText(term)).toBeTruthy();
    expect(screen.getByText(definition)).toBeTruthy();
  });

  test('given no term with definition when user submits form then no card is added', async () => {
    const term = '';
    const definition = 'Test Definition';

    await submitForm(
      user,
      termInput,
      definitionInput,
      submitButton,
      term,
      definition
    );

    await act(async () => {
      expect(mockPost).not.toHaveBeenCalledWith('http://localhost:8080/term', {
        id: 1,
        name: term,
        description: definition,
      });
    });
    expect(screen.queryByLabelText('card-1')).toBeFalsy();
  });

  test('given term with no definition when user submits form then no card is added', async () => {
    const term = 'Test Term';
    const definition = '';

    await submitForm(
      user,
      termInput,
      definitionInput,
      submitButton,
      term,
      definition
    );

    await act(async () => {
      expect(mockPost).not.toHaveBeenCalledWith('http://localhost:8080/term', {
        id: 1,
        name: term,
        description: definition,
      });
    });
    expect(screen.queryByLabelText('card-1')).toBeFalsy();
  });

  test('when user deletes card then card is removed', async () => {
    const id = 1;
    const term = 'Test Term';
    const definition = 'Test Definition';

    await submitForm(
      user,
      termInput,
      definitionInput,
      submitButton,
      term,
      definition
    );

    await user.press(screen.getByLabelText('delete card 1'));

    await act(async () => {
      expect(mockDelete).toHaveBeenCalledWith(
        `http://localhost:8080/term/${id}`
      );
    });
    expect(screen.queryByLabelText('card-1')).toBeFalsy();
  });

  test('when user edits card then card is updated', async () => {
    const id = 1;
    const term = 'Test Term';
    const definition = 'Test Definition';

    await submitForm(
      user,
      termInput,
      definitionInput,
      submitButton,
      term,
      definition
    );

    await act(async () => {
      await user.press(screen.getByLabelText('edit card 1'));
      const editTermInput = screen.getByLabelText('edit term input');
      const editDefinitionInput = screen.getByLabelText(
        'edit definition input'
      );
      const submitEditsButton = screen.getByLabelText('submit edits button');

      const newTerm = 'Updated Term';
      const newDefinition = 'Updated Definition';

      await act(async () => {
        await user.clear(editTermInput);
        await user.type(editTermInput, newTerm);
        await user.clear(editDefinitionInput);
        await user.type(editDefinitionInput, newDefinition);

        await user.press(submitEditsButton);
      });

      await act(async () => {
        expect(mockEdit).toHaveBeenCalledWith(
          `http://localhost:8080/term/${id}`,
          {
            id: 1,
            name: newTerm,
            description: newDefinition,
          }
        );
      });
      expect(screen.getByText(newTerm)).toBeTruthy();
      expect(screen.getByText(newDefinition)).toBeTruthy();
    });
  });
});

async function submitForm(
  user: UserEventInstance,
  termInput: HTMLElement,
  definitionInput: HTMLElement,
  submitButton: HTMLElement,
  term: string,
  definition: string
) {
  await act(async () => {
    await user.type(termInput, term);
    await user.type(definitionInput, definition);
    await user.press(submitButton);
  });
}
