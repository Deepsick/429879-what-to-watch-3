import {extend} from '../../utils';
import {ALL_GENRES, MOVIES_COUNT} from '../../const';

const initialState = {
  genre: ALL_GENRES,
  shownMoviesCount: MOVIES_COUNT,
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  ADD_SHOWN_MOVIES: `ADD_SHOWN_MOVIES`,
  RESET_SHOWN_MOVIES: `RESET_SHOWN_MOVIES`,
};

const ActionCreator = {
  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre,
  }),
  addShownMovies: () => ({
    type: ActionType.ADD_SHOWN_MOVIES,
    payload: MOVIES_COUNT,
  }),
  resetShownMovies: () => ({
    type: ActionType.RESET_SHOWN_MOVIES,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return extend(state, {
        genre: action.payload,
      });
    case ActionType.ADD_SHOWN_MOVIES:
      return extend(state, {
        shownMoviesCount: state.shownMoviesCount + action.payload,
      });
    case ActionType.RESET_SHOWN_MOVIES:
      return extend(state, {
        shownMoviesCount: MOVIES_COUNT,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, initialState};
