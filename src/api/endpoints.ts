import api from './index';
import { QuizzillaCard, QuizzillaCardDTO } from '../models/QuizzillaCard';

const transformData = (data: QuizzillaCardDTO[]): QuizzillaCard[] => {
  return data.map((item) => ({
    id: item.id,
    term: item.name,
    definition: item.description,
  }));
};

export const fetchTerms = async (): Promise<QuizzillaCard[]> => {
  const response = await api.get('http://localhost:8080/terms');
  return transformData(response.data);
};
