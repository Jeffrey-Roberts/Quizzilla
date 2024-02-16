import axios from 'axios';
import React, { createContext, Dispatch, useEffect, useReducer } from 'react';

import { QuizzillaCard, QuizzillaCardDTO } from '../models/QuizzillaCard';

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

const transformData = (data: QuizzillaCardDTO[]): QuizzillaCard[] => {
  return data.map((item) => ({
    id: item.id,
    term: item.name,
    definition: item.description,
  }));
};

type Props = {
  children: React.ReactNode;
};
export const QuizzillaCProvider = ({ children }: Props) => {
  const [data, setData] = useReducer(dataReducer, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/terms');
        const transformedData = transformData(response.data);
        setData({ type: 'SET_DATA', payload: transformedData });
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
