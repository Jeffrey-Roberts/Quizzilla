import { FC } from 'react';
import { Text, View } from 'react-native';

export type CardProps = {
  id: number;
  term: string;
  definition: string;
};

const Card: FC<CardProps> = ({ id, term, definition }) => {
  return (
    <View
      aria-label={`card-${id}`}
      style={{
        backgroundColor: '#fff',
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
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{term}</Text>
      <Text style={{ marginTop: 10 }}>{definition}</Text>
    </View>
  );
};

export default Card;
