import { act, render, screen, waitFor } from '@testing-library/react-native';
import {
  fireGestureHandler,
  getByGestureTestId,
} from 'react-native-gesture-handler/jest-utils';
import { TapGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/tapGesture';

import QuizzillaFlashCard from '../../src/components/QuizzillaFlashCard';

jest.useFakeTimers();

test('renders QuizzillaFlashCard component on screen', () => {
  const cards = [{ id: 1, term: 'Term', definition: 'Definition' }];
  const { getByLabelText } = render(<QuizzillaFlashCard cards={cards} />, {});
  const card = getByLabelText(`card-${cards[0].id}`);
  expect(card).toBeTruthy();
  expect(screen.getByText('Term')).toBeTruthy();
});

test('when user taps on card then definition is shown', async () => {
  const cards = [{ id: 1, term: 'Term', definition: 'Definition' }];

  render(<QuizzillaFlashCard cards={cards} />, {});

  await act(async () => {
    await waitFor(async () => {
      fireGestureHandler<TapGesture>(getByGestureTestId('tap-gesture'));
      expect(screen.getByText('Definition')).toBeTruthy();
    });
  });
});

test('when user swipes on card then next card is shown', async () => {
  const cards = [
    { id: 1, term: 'Term', definition: 'Definition' },
    { id: 2, term: 'Term 2', definition: 'Definition 2' },
  ];

  render(<QuizzillaFlashCard cards={cards} />, {});

  expect(screen.getByText('Term')).toBeTruthy();

  await act(async () => {
    await waitFor(async () => {
      fireGestureHandler<TapGesture>(getByGestureTestId('swipe-gesture'));
      expect(screen.getByText('Term 2')).toBeTruthy();
    });
  });
});
