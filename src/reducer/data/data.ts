import {extend, moviesAdapter, movieAdapter} from '../../utils';
import {Path} from '../../const';

const initialState = {
  movies: [],
  promo: {},
  comments: [],
  favorites: [],
  error: {},
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO: `LOAD_PROMO`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  GET_ERRORS: `GET_ERRORS`,
};

const ActionCreator = {
  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    };
  },
  loadPromo: (promo) => {
    return {
      type: ActionType.LOAD_PROMO,
      payload: promo,
    };
  },
  loadComments: (comments) => {
    return {
      type: ActionType.LOAD_COMMENTS,
      payload: comments,
    };
  },
  loadFavorites: (favorites) => {
    return {
      type: ActionType.LOAD_FAVORITES,
      payload: favorites,
    };
  },
  getErrors: (error) => {
    return {
      type: ActionType.GET_ERRORS,
      payload: error,
    };
  },
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(Path.FILMS)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(moviesAdapter(response.data)));
      });
  },
  loadPromo: () => (dispatch, getState, api) => {
    return api.get(`${Path.FILMS}/${Path.PROMO}`)
      .then((response) => {
        dispatch(ActionCreator.loadPromo(movieAdapter(response.data)));
      });
  },
  loadComments: (id) => (dispatch, getState, api) => {
    return api.get(`${Path.COMMENTS}/${id}`)
      .then((response) => {
        dispatch(ActionCreator.loadComments(response.data));
      });
  },
  postComment: (id, comment) => (dispatch, getState, api) => {
    return api.post(`${Path.COMMENTS}/${id}`, comment)
      .then((response) => {
        dispatch(ActionCreator.loadComments(response.data));
      })
      .catch((err) => {
        dispatch(ActionCreator.getErrors(err));
      });
  },
  loadFavorites: () => (dispatch, getState, api) => {
    return api.get(Path.FAVORITE)
      .then((response) => {
        dispatch(ActionCreator.loadFavorites(moviesAdapter(response.data)));
      });
  },
  postFavorite: (id, status) => (dispatch, getState, api) => {
    return api.post(`${Path.FAVORITE}/${id}/${status}`)
      .then((response) => {
        const movies = [...getState().data.movies];
        const favorite = response.data;
        const {id: favoriteId} = favorite;
        const index = movies.findIndex((movie) => movie.id === +favoriteId);
        movies[index].isFavorite = !movies[index].isFavorite;
        
        const promo = getState().data.promo;
        if (id === promo.id) {
          promo.isFavorite = !promo.isFavorite;
          dispatch(ActionCreator.loadPromo(promo));
        }
        dispatch(ActionCreator.loadMovies(movies));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload,
      });
    case ActionType.LOAD_PROMO:
      return extend(state, {
        promo: action.payload,
      });
    case ActionType.LOAD_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });
    case ActionType.LOAD_FAVORITES:
      return extend(state, {
        favorites: action.payload,
      });
    case ActionType.GET_ERRORS:
      return extend(state, {
        error: action.payload,
      });
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
