import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type QuizzillaViewProps = {
  children: React.ReactNode;
};

const QuizzillaView = ({ children }: QuizzillaViewProps) => {
  return (
    <GestureHandlerRootView aria-label={'root'} style={styles.container}>
      {children}
    </GestureHandlerRootView>
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
