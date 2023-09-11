import { render } from '@testing-library/react-native';
import React from 'react';

import Card from '../../src/components/Card';

test('renders card text and definition', () => {
  const card = {
    term: 'Test Term',
    definition: 'Test Definition',
  };
  const { getByText } = render(
    <Card term={card.term} definition={card.definition} />
  );
  const term = getByText(card.term);
  const definition = getByText(card.definition);
  expect(term).toBeDefined();
  expect(definition).toBeDefined();
});
