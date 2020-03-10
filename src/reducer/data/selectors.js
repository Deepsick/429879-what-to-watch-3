import {ReducerName} from '../../const';

export const getMovies = (state) => {
  return state[ReducerName.DATA].movies;
};
