import { forwardRef } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

const QuizzillaTextBox = forwardRef<TextInput, TextInputProps>((props, ref) => {
  return (
    <TextInput {...props} style={[styles.textInput, props.style]} ref={ref} />
  );
});

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
