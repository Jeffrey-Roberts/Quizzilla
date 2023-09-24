import { render, screen } from '@testing-library/react-native';

import FlashCardScreen from '../src/Flash-Cards';

test('renders Flash-Card screen', () => {
  render(<FlashCardScreen />);
  expect(screen.getByLabelText('root')).toBeTruthy();
});

test('when no data then no cards are rendered', () => {
  render(<FlashCardScreen />);
  expect(screen.getByText('No cards')).toBeTruthy();
});
