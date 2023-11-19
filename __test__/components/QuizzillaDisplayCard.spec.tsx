import { act, render, userEvent } from '@testing-library/react-native';
import { getTextInputValue } from '@testing-library/react-native/build/helpers/text-input';

import QuizzillaDisplayCard from '../../src/components/QuizzillaDisplayCard';

test('renders display card', () => {
  const id = 0;
  const term = 'test term';
  const definition = 'test definition';
  const handleDelete = jest.fn();
  const handleEdit = jest.fn();
  const { getByLabelText } = render(
    <QuizzillaDisplayCard
      id={id}
      term={term}
      definition={definition}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
  const card = getByLabelText(`card-${id}`);
  expect(card).toBeDefined();
});

test('when delete button is pressed then handleDelete prop is called', async () => {
  const user = userEvent.setup();
  const id = 0;
  const term = 'test term';
  const definition = 'test definition';
  const handleDelete = jest.fn();
  const handleEdit = jest.fn();
  const { getByLabelText } = render(
    <QuizzillaDisplayCard
      id={id}
      term={term}
      definition={definition}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
  const deleteButton = getByLabelText(`delete card ${id}`);
  await act(async () => {
    await user.press(deleteButton);
    expect(handleDelete).toHaveBeenCalled();
  });
});

test('when edit button is pressed then input boxes appear with current values', async () => {
  const user = userEvent.setup();
  const id = 0;
  const term = 'test term';
  const definition = 'test definition';
  const handleDelete = jest.fn();
  const handleEdit = jest.fn();
  const { getByLabelText } = render(
    <QuizzillaDisplayCard
      id={id}
      term={term}
      definition={definition}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
  const editButton = getByLabelText(`edit card ${id}`);
  await act(async () => {
    await user.press(editButton);
    const termInput = getByLabelText('edit term input');
    const definitionInput = getByLabelText('edit definition input');
    expect(termInput).toBeDefined();
    expect(definitionInput).toBeDefined();
    expect(getTextInputValue(termInput)).toBe(term);
    expect(getTextInputValue(definitionInput)).toBe(definition);
  });
});

test('when submit button in edit mode is pressed then handleEdit is called', async () => {
  const user = userEvent.setup();
  const id = 0;
  const term = 'test term';
  const definition = 'test definition';
  const handleDelete = jest.fn();
  const handleEdit = jest.fn();
  const { getByLabelText } = render(
    <QuizzillaDisplayCard
      id={id}
      term={term}
      definition={definition}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
  const editButton = getByLabelText(`edit card ${id}`);
  await act(async () => {
    await user.press(editButton);
    const submitButton = getByLabelText('submit edits button');
    await user.press(submitButton);
    expect(handleEdit).toHaveBeenCalled();
  });
});
