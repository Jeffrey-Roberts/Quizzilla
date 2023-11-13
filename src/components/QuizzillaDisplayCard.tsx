import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type CardProps = {
  id: number;
  term: string;
  definition: string;
  handleDelete: (id: number) => void;
};

const QuizzillaDisplayCard: FC<CardProps> = ({
  id,
  term,
  definition,
  handleDelete,
}) => {
  return (
    <View aria-label={`card-${id}`} style={styles.flashCard}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fffffe' }}>
          {term}
        </Text>
        <Text style={{ marginTop: 10, color: '#94a1b2' }}>{definition}</Text>
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
          onPress={() => console.log('edit button pressed')}
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
