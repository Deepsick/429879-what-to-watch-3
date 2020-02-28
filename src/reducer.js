import {extend} from './utils.js';
import movies from './mocks/films';
import {ALL_GENRES} from './const';

const initialState = {
  movies,
  genre: ALL_GENRES,
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return extend(state, {
        genre: action.payload,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator, initialState};
