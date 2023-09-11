import { render, userEvent } from '@testing-library/react-native';

import QuizzillaButton from '../../src/components/QuizzillaButton';

test('renders button text', () => {
  const text = 'Test';
  const onPress = jest.fn();
  const { getByText } = render(
    <QuizzillaButton text={text} onPress={onPress} />
  );
  const button = getByText(text);
  expect(button).toBeDefined();
});

test('calls onPress prop when button is pressed', async () => {
  const user = userEvent.setup();
  const text = 'Test';
  const onPress = jest.fn();
  const { getByText } = render(
    <QuizzillaButton text={text} onPress={onPress} />
  );
  const button = getByText(text);
  await user.press(button);
  expect(onPress).toHaveBeenCalled();
});
