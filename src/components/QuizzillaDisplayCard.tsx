import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FC, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import QuizzillaButton from './QuizzillaButton';
import QuizzillaTextBox from './QuizzillaTextBox';
import { QuizzillaCard } from '../models/QuizzillaCard';

export type CardProps = {
  id: number;
  term: string;
  definition: string;
  handleDelete: (id: number) => void;
  handleEdit: (card: QuizzillaCard) => void;
};

const QuizzillaDisplayCard: FC<CardProps> = ({
  id,
  term,
  definition,
  handleDelete,
  handleEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [termInputValue, setTermInputValue] = useState(term);
  const [definitionInputValue, setDefinitionInputValue] = useState(definition);
  const definitionTextInputRef = useRef<TextInput>(null);

  const focusTextInput = () => {
    if (definitionTextInputRef.current) {
      definitionTextInputRef.current.focus();
    }
  };

  return (
    <View aria-label={`card-${id}`} style={styles.flashCard}>
      {!isEditing ? (
        <>
          <View style={{ width: '80%' }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#fffffe',
              }}
            >
              {term}
            </Text>
            <Text style={{ marginTop: 10, color: '#94a1b2' }}>
              {definition}
            </Text>
          </View>
          <View
            style={{
              flexGrow: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              flexShrink: 0,
              flexBasis: 'auto',
            }}
          >
            <FontAwesome.Button
              name="edit"
              aria-label={`edit card ${id}`}
              backgroundColor="#242629"
              color="#94a1b2"
              size={20}
              iconStyle={{ marginRight: 0 }}
              onPress={() => setIsEditing(true)}
            />
            <FontAwesome.Button
              name="trash"
              aria-label={`delete card ${id}`}
              backgroundColor="#242629"
              color="#94a1b2"
              size={20}
              iconStyle={{ marginRight: 0 }}
              onPress={() => handleDelete(id)}
            />
          </View>
        </>
      ) : (
        <>
          <View style={{ flex: 1 }}>
            <QuizzillaTextBox
              aria-label={'edit term input'}
              placeholder={'Enter term'}
              value={termInputValue}
              onChange={(e) => setTermInputValue(e.nativeEvent.text)}
              onSubmitEditing={focusTextInput}
              blurOnSubmit={false}
            />
            <QuizzillaTextBox
              aria-label={'edit definition input'}
              style={{ height: 100 }}
              placeholder={'Enter definition'}
              multiline
              numberOfLines={4}
              value={definitionInputValue}
              onChange={(e) => setDefinitionInputValue(e.nativeEvent.text)}
              ref={definitionTextInputRef}
            />
            <QuizzillaButton
              text={'Submit'}
              label={'submit edits button'}
              onPress={() => {
                if (termInputValue && definitionInputValue) {
                  const updatedCard: QuizzillaCard = {
                    id,
                    term: termInputValue,
                    definition: definitionInputValue,
                  };
                  handleEdit(updatedCard);
                  setIsEditing(false);
                }
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default QuizzillaDisplayCard;

const styles = StyleSheet.create({
  flashCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#242629',
    padding: 20,
    borderRadius: 5,
    minWidth: '90%',
    maxWidth: '90%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
});
