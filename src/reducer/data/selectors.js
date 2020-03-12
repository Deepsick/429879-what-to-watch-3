import {ReducerName} from '../../const';

export const getMovies = (state) => {
  return state[ReducerName.DATA].movies;
};

export const getPromo = (state) => {
  return state[ReducerName.DATA].promo;
};

export const getComments = (state) => {
  return state[ReducerName.DATA].comments;
};

export const getFavorites = (state) => {
  return state[ReducerName.DATA].favorites;
};
