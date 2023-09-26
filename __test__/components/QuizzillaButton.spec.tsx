import { act, render, userEvent } from '@testing-library/react-native';

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

test('when button is pressed then onPress prop is called', async () => {
  const user = userEvent.setup();
  const text = 'Test';
  const onPress = jest.fn();
  const { getByText } = render(
    <QuizzillaButton text={text} onPress={onPress} />
  );
  const button = getByText(text);
  await act(async () => {
    await user.press(button);
    expect(onPress).toHaveBeenCalled();
  });
});
