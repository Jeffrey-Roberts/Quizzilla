import React, { createContext, Dispatch, useReducer } from 'react';

import { QuizzillaCard } from '../models/QuizzillaCard';

type QuizzillaContextType = {
  data: QuizzillaCard[];
  setData: Dispatch<any>;
};
export const QuizzillaContext = createContext<QuizzillaContextType>({
  data: [],
  setData: () => {},
});

const dataReducer = (state: QuizzillaCard[], action: any) => {
  switch (action.type) {
    case 'ADD_CARD':
      return [...state, action.payload];
    case 'REMOVE_CARD':
      return state.filter((card) => card.id !== action.payload);
    case 'UPDATE_CARD':
      return state.map((card) => {
        if (card.id === action.payload.id) {
          return action.payload;
        }
        return card;
      });
    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};
export const QuizzillaCProvider = ({ children }: Props) => {
  const [data, setData] = useReducer(dataReducer, []);
  return (
    <QuizzillaContext.Provider value={{ data, setData }}>
      {children}
    </QuizzillaContext.Provider>
  );
};
