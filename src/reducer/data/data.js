import {extend} from '../../utils.js';
import {Path} from '../../const';

const initialState = {
  movies: [],
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
};

const ActionCreator = {
  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    };
  },
};

const moviesAdapter = (movies) => {
  return movies.map((movie) => {
    const {
      name,
      description,
      rating,
      id,
      genre,
      released,
      starring,
      director,
    } = movie;
    return {
      name,
      poster: movie[`poster_image`],
      preview: movie[`preview_image`],
      genre,
      id,
      rating,
      scoresCount: movie[`scores_count`],
      isFavorite: movie[`is_favorite`],
      trailer: movie[`preview_video_link`],
      video: movie[`video_link`],
      duration: movie[`run_time`],
      year: released,
      cover: movie[`background_image`],
      bgColor: movie[`background_color`],
      director,
      starring,
      description,
    };
  });
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/${Path.FILMS}`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(moviesAdapter(response.data)));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
