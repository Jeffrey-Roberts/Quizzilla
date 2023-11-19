import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FC, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import QuizzillaButton from './QuizzillaButton';
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

  return (
    <View aria-label={`card-${id}`} style={styles.flashCard}>
      {!isEditing ? (
        <>
          <View>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', color: '#fffffe' }}
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
              text={'Submit'}
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
  textInput: {
    width: '100%',
    fontWeight: 'bold',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
});
