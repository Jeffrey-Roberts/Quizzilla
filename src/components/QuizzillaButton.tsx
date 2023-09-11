import React, { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';

export type QuizzillaButtonProps = {
  text: string;
  onPress: () => void;
};

const QuizzillaButton: FC<QuizzillaButtonProps> = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: '#000' }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default QuizzillaButton;
