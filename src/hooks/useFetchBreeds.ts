import useSWR from 'swr';
import axios from 'axios';
import { Breed } from '../types/Breed';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useFetchBreeds = () => {
  const { data, error } = useSWR<Breed[]>('https://api.thedogapi.com/v1/breeds', fetcher);
  return {
    data,
    error,
    isLoading: !error && !data,
  };
};
