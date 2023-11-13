import { act, render, userEvent } from '@testing-library/react-native';

import QuizzillaDisplayCard from '../../src/components/QuizzillaDisplayCard';

test('renders display card', () => {
  const id = 0;
  const term = 'test term';
  const definition = 'test definition';
  const handleDelete = jest.fn();
  const { getByLabelText } = render(
    <QuizzillaDisplayCard
      id={id}
      term={term}
      definition={definition}
      handleDelete={handleDelete}
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
  const { getByLabelText } = render(
    <QuizzillaDisplayCard
      id={id}
      term={term}
      definition={definition}
      handleDelete={handleDelete}
    />
  );
  const deleteButton = getByLabelText(`delete card ${id}`);
  await act(async () => {
    await user.press(deleteButton);
    expect(handleDelete).toHaveBeenCalled();
  });
});
