import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
  Gesture,
  GestureDetector,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { QuizzillaCard } from '../models/QuizzillaCard';

type QuizzillaFlashCardProps = {
  cards: QuizzillaCard[];
};

const QuizzillaFlashCard = ({ cards }: QuizzillaFlashCardProps) => {
  const [showDefinition, setShowDefinition] = useState(false);
  const [index, setIndex] = useState(0);

  const { id, term, definition } = cards[index];

  const positionX = useSharedValue(0);

  const handlePress = () => {
    setShowDefinition(!showDefinition);
  };
  const handleSwipe = () => {
    setShowDefinition(false);
    setIndex((index + 1) % cards.length);
  };

  const swipeGesture = Gesture.Pan()
    .withTestId('swipe-gesture')
    .runOnJS(true)
    .onChange((event) => {
      positionX.value = event.translationX;
    })
    .onFinalize((event) => {
      positionX.value = withSpring(0, { stiffness: 50 });
      if (event.translationX > 20 || event.translationX < -20) {
        handleSwipe();
      }
    });

  const tapGesture = Gesture.Tap()
    .withTestId('tap-gesture')
    .runOnJS(true)
    .maxDistance(20)
    .onEnd(() => {
      handlePress();
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: positionX.value }],
  }));

  const composed = Gesture.Simultaneous(swipeGesture, tapGesture);

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '100%',
            maxHeight: '80%',
          },
          animatedStyle,
        ]}
      >
        <TouchableOpacity style={styles.card} activeOpacity={0.8}>
          <View style={styles.cardInner} aria-label={`card-${id}`}>
            <Text style={styles.text}>
              {showDefinition ? definition : term}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
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
    minHeight: '100%',
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
