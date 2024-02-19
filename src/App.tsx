import { StatusBar } from 'expo-status-bar';
import { useContext, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { postTerm } from './api/endpoints';
import QuizzillaButton from './components/QuizzillaButton';
import QuizzillaDisplayCard from './components/QuizzillaDisplayCard';
import QuizzillaTextBox from './components/QuizzillaTextBox';
import QuizzillaView from './components/QuizzillaView';
import { QuizzillaCard } from './models/QuizzillaCard';
import { QuizzillaContext } from './modules/QuizzillaContext';

export default function App() {
  const { data, setData } = useContext(QuizzillaContext);

  const [termInputValue, setTermInputValue] = useState('');
  const [definitionInputValue, setDefinitionInputValue] = useState('');

  const definitionTextInputRef = useRef<TextInput>(null);

  const handleAdd = () => {
    if (termInputValue && definitionInputValue) {
      const newData: QuizzillaCard = {
        id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
        term: termInputValue,
        definition: definitionInputValue,
      };
      postTerm(newData).then((response) => {
        setData({ type: 'ADD_CARD', payload: response });
      });
      setTermInputValue('');
      setDefinitionInputValue('');
    }
    Keyboard.dismiss();
  };

  const handleDelete = (id: number) => {
    setData({ type: 'REMOVE_CARD', payload: id });
  };

  const handleEdit = (card: QuizzillaCard) => {
    setData({ type: 'UPDATE_CARD', payload: card });
  };

  const focusTextInput = () => {
    if (definitionTextInputRef.current) {
      definitionTextInputRef.current.focus();
    }
  };

  return (
    <QuizzillaView>
      <View style={{ width: '80%' }}>
        <QuizzillaTextBox
          aria-label={'term input'}
          placeholder={'Enter term'}
          placeholderTextColor={'#94a1b2'}
          value={termInputValue}
          onChange={(e) => setTermInputValue(e.nativeEvent.text)}
          onSubmitEditing={focusTextInput}
          blurOnSubmit={false}
        />
        <QuizzillaTextBox
          aria-label={'definition input'}
          ref={definitionTextInputRef}
          style={{ height: 100 }}
          placeholder={'Enter definition'}
          placeholderTextColor={'#94a1b2'}
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
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.innerContainer}
      >
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <QuizzillaDisplayCard
              id={item.id}
              term={item.term}
              definition={item.definition}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            marginTop: 20,
            alignItems: 'center',
            flexGrow: 1,
          }}
          extraData={data}
          removeClippedSubviews={false}
          keyboardShouldPersistTaps={'always'}
        />
      </KeyboardAvoidingView>
      <StatusBar style={'light'} />
    </QuizzillaView>
  );
}

const styles = StyleSheet.create({
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
