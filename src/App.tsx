import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { FlatList, TextInput, StyleSheet, View } from 'react-native';

import Card from './components/Card';
import QuizzillaButton from './components/QuizzillaButton';

export default function App() {
  const DATA = [
    {
      id: '1',
      term: 'Term 1',
      definition:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod, turpis id tristique porttitor, odio nisl luctus libero, eu efficitur ex dolor eu velit. Duis vel tortor auctor, cursus diam a, maximus lectus. Praesent euismod, mi nec aliquet ornare, diam libero eleifend tortor, sed luctus neque arcu vel orci. Nam euismod, turpis a rutrum viverra, est dolor ultricies nunc, sed eleifend orci elit non enim. Duis id risus euismod, efficitur nunc et, tincidunt lectus. Proin et odio eu diam posuere aliquam. Nulla facilisi. Mauris auctor, nunc vitae fringilla faucibus, massa urna consectetur eros, eu placerat nunc ipsum in diam. Donec pellentesque, nibh sed efficitur pharetra, lectus nunc dapibus odio, ac posuere quam nunc nec massa. Proin euismod, elit a mollis tincidunt, enim nisl faucibus odio, nec consectetur sapien neque vitae lacus. Aliquam vitae elit auctor, pharetra nisl at, aliquet turpis. Morbi eget turpis auctor, pretium lorem a, vestibulum dui.',
    },
    {
      id: '2',
      term: 'Term 2',
      definition: 'Definition 2',
    },
    {
      id: '3',
      term: 'Term 3',
      definition: 'Definition 3',
    },
    {
      id: '4',
      term: 'Term 4',
      definition: 'Definition 4',
    },
    {
      id: '5',
      term: 'Term 5',
      definition: 'Definition 5',
    },
    {
      id: '6',
      term: 'Term 6',
      definition: 'Definition 6',
    },
    {
      id: '7',
      term: 'Term 7',
      definition: 'Definition 7',
    },
  ];
  return (
    <View aria-label={'root'} style={styles.container}>
      <TextInput style={styles.textInput} placeholder={'Enter term'} />
      <TextInput
        style={[styles.textInput, { height: 100 }]}
        placeholder={'Enter definition'}
        multiline
        numberOfLines={4}
      />
      <QuizzillaButton text={'Test'} onPress={() => console.log('test')} />
      <View style={styles.innerContainer}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <Card term={item.term} definition={item.definition} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            marginTop: 20,
            alignItems: 'center',
            flexGrow: 1,
          }}
        />
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#25292e',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  textInput: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  innerContainer: {
    width: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 20,
    padding: 10,
    backgroundColor: 'purple',
  },
});
