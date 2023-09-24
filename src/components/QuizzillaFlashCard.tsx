import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

import { QuizzillaCard } from '../models/QuizzillaCard';

type QuizzillaFlashCardProps = {
  cards: QuizzillaCard[];
};

const QuizzillaFlashCard = ({ cards }: QuizzillaFlashCardProps) => {
  const [showDefinition, setShowDefinition] = useState(false);
  const [index, setIndex] = useState(0);

  const { term, definition } = cards[index];
  const handlePress = () => {
    setShowDefinition(!showDefinition);
  };

  const handleSwipe = () => {
    setShowDefinition(false);
    setIndex((index + 1) % cards.length);
  };

  const swipeGesture = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(handleSwipe);

  return (
    <GestureDetector gesture={swipeGesture}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '100%',
        }}
      >
        <TouchableOpacity
          aria-label={`card-${index}`}
          style={styles.card}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <View style={styles.cardInner}>
            <Text style={styles.text}>
              {showDefinition ? definition : term}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </GestureDetector>
  );
};

export default QuizzillaFlashCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 20,
    minWidth: '80%',
    maxWidth: '80%',
    minHeight: '80%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
  },
  cardInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});
