import { render } from '@testing-library/react-native';

import QuizzillaTextBox from '../../src/components/QuizzillaTextBox';

test('should render text box with given value', () => {
  const { getByLabelText } = render(
    <QuizzillaTextBox value={'test'} label={'test label'} />
  );
  const textBox = getByLabelText('test label');
  expect(textBox).toBeDefined();
  expect(textBox.props.value).toBe('test');
});
