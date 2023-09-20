import {
  render,
  screen,
  userEvent,
  waitFor,
} from '@testing-library/react-native';

import QuizzillaFlashCard from '../../src/components/QuizzillaFlashCard';

test('renders QuizzillaFlashCard component on screen', () => {
  const { getByLabelText } = render(
    <QuizzillaFlashCard
      cards={[{ id: 1, term: 'Term', definition: 'Definition' }]}
    />,
    {}
  );
  const card = getByLabelText('card-0');
  expect(card).toBeTruthy();
  expect(screen.getByText('Term')).toBeTruthy();
});

test.skip('on press of card, definition of card is shown', async () => {
  const user = userEvent.setup();
  const { getByLabelText } = render(
    <QuizzillaFlashCard
      cards={[{ id: 1, term: 'Term', definition: 'Definition' }]}
    />,
    {}
  );
  const card = getByLabelText('card-0');
  await waitFor(() => {
    user.press(card);
    expect(screen.getByText('Definition')).toBeTruthy();
  });
});
