import {ReducerName} from "../../const";

const NAME_SPACE = ReducerName.STATE;

export const getGenre = (state) => {
  return state[NAME_SPACE].genre;
};

export const getShownMoviesCount = (state) => {
  return state[NAME_SPACE].shownMoviesCount;
};
