// hooks/useFetchBreeds.ts
import useSWR from 'swr';
import axios from 'axios';

export interface Breed {
  id: number;
  name: string;
  weight: { metric: string };
  temperament: string;
  origin: string;
  life_span: string;
  reference_image_id: string | null;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useFetchBreeds = () => {
  const { data, error } = useSWR<Breed[]>('https://api.thedogapi.com/v1/breeds', fetcher);
  return {
    data,
    error,
    isLoading: !error && !data,
  };
};
