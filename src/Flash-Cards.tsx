import React, { useContext } from 'react';
import { Text, View } from 'react-native';

import QuizzillaFlashCard from './components/QuizzillaFlashCard';
import QuizzillaView from './components/QuizzillaView';
import { QuizzillaContext } from './modules/QuizzillaContext';

export default function FlashCardScreen() {
  const { data } = useContext(QuizzillaContext);

  return (
    <QuizzillaView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {data.length > 0 ? (
          <QuizzillaFlashCard cards={data} />
        ) : (
          <Text style={{ color: '#FFF' }}>No cards</Text>
        )}
      </View>
    </QuizzillaView>
  );
}
