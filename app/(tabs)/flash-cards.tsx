import { useContext } from 'react';
import { Text, View } from 'react-native';

import QuizzillaView from '../../src/components/QuizzillaView';
import { QuizzillaContext } from '../../src/modules/QuizzillaContext';

export default function FlashCardScreen() {
  const { data } = useContext(QuizzillaContext);

  return (
    <QuizzillaView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {data.length > 0 ? (
          <Text style={{ color: '#FFF' }}>{data[0].term}</Text>
        ) : (
          <Text>No data</Text>
        )}
      </View>
    </QuizzillaView>
  );
}
