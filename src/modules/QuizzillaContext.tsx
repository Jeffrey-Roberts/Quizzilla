import React, { createContext, Dispatch, useEffect, useReducer } from 'react';

import { fetchTerms } from '../api/endpoints';
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
    case 'SET_DATA':
      return action.payload;
    default:
      return state;
  }
};

type Props = {
  children: React.ReactNode;
};
export const QuizzillaCProvider = ({ children }: Props) => {
  const [data, setData] = useReducer(dataReducer, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTerms();
        setData({ type: 'SET_DATA', payload: response });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <QuizzillaContext.Provider value={{ data, setData }}>
      {children}
    </QuizzillaContext.Provider>
  );
};
