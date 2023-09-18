import { render } from '@testing-library/react-native';
import React from 'react';

import QuizzillaDisplayCard from '../../src/components/QuizzillaDisplayCard';

test('renders card text and definition', () => {
  const card = {
    term: 'Test Term',
    definition: 'Test Definition',
  };
  const { getByText } = render(
    <QuizzillaDisplayCard
      id={1}
      term={card.term}
      definition={card.definition}
    />
  );
  const term = getByText(card.term);
  const definition = getByText(card.definition);
  expect(term).toBeDefined();
  expect(definition).toBeDefined();
});
