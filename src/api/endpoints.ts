import api from './index';
import { QuizzillaCard, QuizzillaCardDTO } from '../models/QuizzillaCard';

const transformData = (data: QuizzillaCardDTO[]): QuizzillaCard[] => {
  return data.map((item) => ({
    id: item.id,
    term: item.name,
    definition: item.description,
  }));
};

const transformDataBack = (data: QuizzillaCard): QuizzillaCardDTO => {
  return {
    id: data.id,
    name: data.term,
    description: data.definition,
  };
};

export const fetchTerms = async (): Promise<QuizzillaCard[]> => {
  const response = await api.get('http://localhost:8080/terms');
  return transformData(response.data);
};

export const postTerm = async (term: QuizzillaCard): Promise<QuizzillaCard> => {
  const response = await api.post(
    'http://localhost:8080/term',
    transformDataBack(term)
  );
  return transformData([response.data])[0];
};

export const deleteTerm = async (id: number): Promise<void> => {
  await api.delete(`http://localhost:8080/term/${id}`);
};

export const editTerm = async (term: QuizzillaCard): Promise<QuizzillaCard> => {
  const response = await api.put(
    `http://localhost:8080/term/${term.id}`,
    transformDataBack(term)
  );
  return transformData([response.data])[0];
};
