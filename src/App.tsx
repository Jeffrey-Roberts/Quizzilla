import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { FlatList, TextInput, StyleSheet, View, Keyboard } from 'react-native';

import QuizzillaButton from './components/QuizzillaButton';
import QuizzillaDisplayCard from './components/QuizzillaDisplayCard';
import QuizzillaView from './components/QuizzillaView';
import { QuizzillaContext } from './modules/QuizzillaContext';

export default function App() {
  const { data, setData } = useContext(QuizzillaContext);

  const [termInputValue, setTermInputValue] = useState('');
  const [definitionInputValue, setDefinitionInputValue] = useState('');

  const handleAdd = () => {
    if (termInputValue && definitionInputValue) {
      const newData = {
        id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
        term: termInputValue,
        definition: definitionInputValue,
      };
      setData({ type: 'ADD_CARD', payload: newData });
      setTermInputValue('');
      setDefinitionInputValue('');
      Keyboard.dismiss();
    }
  };

  const handleDelete = (id: number) => {
    setData({ type: 'REMOVE_CARD', payload: id });
  };

  return (
    <QuizzillaView>
      <TextInput
        aria-label={'term input'}
        style={styles.textInput}
        placeholder={'Enter term'}
        placeholderTextColor={'#000'}
        value={termInputValue}
        onChange={(e) => setTermInputValue(e.nativeEvent.text)}
      />
      <TextInput
        aria-label={'definition input'}
        style={[styles.textInput, { height: 100 }]}
        placeholder={'Enter definition'}
        placeholderTextColor={'#000'}
        multiline
        numberOfLines={4}
        value={definitionInputValue}
        onChange={(e) => setDefinitionInputValue(e.nativeEvent.text)}
      />
      <QuizzillaButton
        text={'Add'}
        label={'submit button'}
        onPress={handleAdd}
      />
      <View style={styles.innerContainer}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <QuizzillaDisplayCard
              id={item.id}
              term={item.term}
              definition={item.definition}
              handleDelete={handleDelete}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            marginTop: 20,
            alignItems: 'center',
            flexGrow: 1,
          }}
          extraData={data}
        />
      </View>
      <StatusBar style={'light'} />
    </QuizzillaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: '80%',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 20,
    padding: 10,
    backgroundColor: '#16161a',
  },
});
