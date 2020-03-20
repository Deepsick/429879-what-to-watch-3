import MockAdapter from 'axios-mock-adapter';

import {createAPI} from '../../api';
import {reducer, ActionType, Operation, ActionCreator} from './data';
import {movies, comments, error, mockFunction} from '../../mocks/test-data';
import {Path, Status} from '../../const';
import {moviesAdapter, movieAdapter} from '../../utils';

const api = createAPI(mockFunction);

describe(`Actions work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      movies: [],
      promo: {},
      comments: [],
      favorites: [],
      error: {},
    });
  });
  
  it(`Reducer should update movies by load movies`, () => {
    expect(reducer({
      movies: [],
      promo: {},
      comments: [],
      favorites: [],
      error: {},
    }, {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    })).toEqual({
      movies,
      promo: {},
      comments: [],
      favorites: [],
      error: {},
    });
  });
  
  it(`Reducer should update promo by load promo`, () => {
    expect(reducer({
      movies: [],
      promo: {},
      comments: [],
      favorites: [],
      error: {},
    }, {
      type: ActionType.LOAD_PROMO,
      payload: movies[0],
    })).toEqual({
      movies: [],
      promo: movies[0],
      comments: [],
      favorites: [],
      error: {},
    });
  });
  
  it(`Reducer should update comments by load comments`, () => {
    expect(reducer({
      movies: [],
      promo: {},
      comments: [],
      favorites: [],
      error: {},
    }, {
      type: ActionType.LOAD_COMMENTS,
      payload: comments,
    })).toEqual({
      movies: [],
      promo: {},
      comments,
      favorites: [],
      error: {},
    });
  });
  
  it(`Reducer should update favorites by load favorites`, () => {
    expect(reducer({
      movies: [],
      promo: {},
      comments: [],
      favorites: [],
      error: {},
    }, {
      type: ActionType.LOAD_FAVORITES,
      payload: movies,
    })).toEqual({
      movies: [],
      promo: {},
      comments: [],
      favorites: movies,
      error: {},
    });
  });
  
  it(`Reducer should update error by get errors`, () => {
    expect(reducer({
      movies: [],
      promo: {},
      comments: [],
      favorites: [],
      error: {},
    }, {
      type: ActionType.GET_ERRORS,
      payload: error,
    })).toEqual({
      movies: [],
      promo: {},
      comments: [],
      favorites: [],
      error,
    });
  });
});

describe(`Action creators work correctly`, () => { 
  it(`Action creator for loading movies returns correct action`, () => {
    expect(ActionCreator.loadMovies(movies)).toEqual({
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    });
  });

  it(`Action creator for loading promo returns correct action`, () => {
    expect(ActionCreator.loadPromo(movies[0])).toEqual({
      type: ActionType.LOAD_PROMO,
      payload: movies[0],
    });
  });

  it(`Action creator for loading comments returns correct action`, () => {
    expect(ActionCreator.loadComments(comments)).toEqual({
      type: ActionType.LOAD_COMMENTS,
      payload: comments,
    });
  });

  it(`Action creator for loading favorites returns correct action`, () => {
    expect(ActionCreator.loadFavorites(movies)).toEqual({
      type: ActionType.LOAD_FAVORITES,
      payload: movies,
    });
  });

  it(`Action creator for getting errors returns correct action`, () => {
    expect(ActionCreator.getErrors(error)).toEqual({
      type: ActionType.GET_ERRORS,
      payload: error,
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMovies();

    apiMock
      .onGet(`/${Path.FILMS}`)
      .reply(Status.OK, movies);

    return moviesLoader(dispatch, mockFunction, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIES,
          payload: moviesAdapter(movies),
        });
      });
  });

  it(`Should make a correct API call to /promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoLoader = Operation.loadPromo();

    apiMock
      .onGet(`${Path.FILMS}/${Path.PROMO}`)
      .reply(Status.OK, movies[0]);

    return promoLoader(dispatch, mockFunction, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO,
          payload: movieAdapter(movies[0]),
        });
      });
  });

  it(`Should make a correct API call to /comments/1`, function () {
    const id = 1;
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsLoader = Operation.loadComments(id);

    apiMock
      .onGet(`/${Path.COMMENTS}/1`)
      .reply(Status.OK, [{fake: true}]);

    return commentsLoader(dispatch, mockFunction, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_COMMENTS,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoritesLoader = Operation.loadFavorites();

    apiMock
      .onGet(`/${Path.FAVORITE}`)
      .reply(Status.OK, movies);

    return favoritesLoader(dispatch, mockFunction, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITES,
          payload: moviesAdapter(movies),
        });
      });
  });
});
