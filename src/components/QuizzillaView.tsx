import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type QuizzillaViewProps = {
  children: React.ReactNode;
};

const QuizzillaView = ({ children }: QuizzillaViewProps) => {
  return (
    <View aria-label={'root'} style={styles.container}>
      {children}
    </View>
  );
};

export default QuizzillaView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: '#242629',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
