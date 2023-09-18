import { FC } from 'react';
import { Text, View } from 'react-native';

export type CardProps = {
  id: number;
  term: string;
  definition: string;
};

const QuizzillaDisplayCard: FC<CardProps> = ({ id, term, definition }) => {
  return (
    <View
      aria-label={`card-${id}`}
      style={{
        backgroundColor: '#242629',
        padding: 20,
        borderRadius: 5,
        minWidth: '90%',
        maxWidth: '90%',
        marginBottom: 20,
        // shadow
        shadowColor: '#000',
        shadowOffset: {
          width: 5,
          height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 2,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fffffe' }}>
        {term}
      </Text>
      <Text style={{ marginTop: 10, color: '#94a1b2' }}>{definition}</Text>
    </View>
  );
};

export default QuizzillaDisplayCard;
