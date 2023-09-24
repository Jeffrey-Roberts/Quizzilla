import { act, render, screen, userEvent } from '@testing-library/react-native';

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

test('when user taps on card then definition is shown', async () => {
  const user = userEvent.setup();
  const { getByLabelText } = render(
    <QuizzillaFlashCard
      cards={[{ id: 1, term: 'Term', definition: 'Definition' }]}
    />,
    {}
  );
  const card = getByLabelText('card-0');

  await act(async () => {
    await user.press(card);
    expect(screen.getByText('Definition')).toBeTruthy();
  });
});
