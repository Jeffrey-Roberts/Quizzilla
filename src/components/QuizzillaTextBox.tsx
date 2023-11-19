import { FC } from 'react';
import { StyleSheet, TextInput } from 'react-native';

export type QuizzillaTextBoxProps = {
  value: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  style?: object;
  onChange?: (e: any) => void;
};

const QuizzillaTextBox: FC<QuizzillaTextBoxProps> = ({
  value,
  label,
  placeholder,
  multiline,
  numberOfLines,
  style,
  onChange,
}) => {
  return (
    <TextInput
      aria-label={label}
      style={[styles.textInput, style]}
      placeholder={placeholder}
      placeholderTextColor={'#000'}
      multiline={multiline}
      numberOfLines={numberOfLines}
      value={value}
      onChange={onChange}
    />
  );
};

export default QuizzillaTextBox;

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
});
