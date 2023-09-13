import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FlatList, TextInput, StyleSheet, View, Keyboard } from 'react-native';

import Card from './components/Card';
import QuizzillaButton from './components/QuizzillaButton';

export default function App() {
  const DATA = [
    {
      id: 1,
      term: 'Term 1',
      definition:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod, turpis id tristique porttitor, odio nisl luctus libero, eu efficitur ex dolor eu velit. Duis vel tortor auctor, cursus diam a, maximus lectus. Praesent euismod, mi nec aliquet ornare, diam libero eleifend tortor, sed luctus neque arcu vel orci. Nam euismod, turpis a rutrum viverra, est dolor ultricies nunc, sed eleifend orci elit non enim. Duis id risus euismod, efficitur nunc et, tincidunt lectus. Proin et odio eu diam posuere aliquam. Nulla facilisi. Mauris auctor, nunc vitae fringilla faucibus, massa urna consectetur eros, eu placerat nunc ipsum in diam. Donec pellentesque, nibh sed efficitur pharetra, lectus nunc dapibus odio, ac posuere quam nunc nec massa. Proin euismod, elit a mollis tincidunt, enim nisl faucibus odio, nec consectetur sapien neque vitae lacus. Aliquam vitae elit auctor, pharetra nisl at, aliquet turpis. Morbi eget turpis auctor, pretium lorem a, vestibulum dui.',
    },
  ];

  const [termInputValue, setTermInputValue] = useState('');
  const [definitionInputValue, setDefinitionInputValue] = useState('');
  const [data, setData] = useState(DATA);

  const handleAdd = () => {
    if (termInputValue && definitionInputValue) {
      const newData = [
        ...data,
        {
          id: data.length + 1,
          term: termInputValue,
          definition: definitionInputValue,
        },
      ];
      setData(newData);
      setTermInputValue('');
      setDefinitionInputValue('');
      Keyboard.dismiss();
    }
  };

  return (
    <View aria-label={'root'} style={styles.container}>
      <TextInput
        aria-label={'term input'}
        style={styles.textInput}
        placeholder={'Enter term'}
        value={termInputValue}
        onChange={(e) => setTermInputValue(e.nativeEvent.text)}
      />
      <TextInput
        aria-label={'definition input'}
        style={[styles.textInput, { height: 100 }]}
        placeholder={'Enter definition'}
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
            <Card id={item.id} term={item.term} definition={item.definition} />
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
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: '#242629',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
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
