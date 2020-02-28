import {reducer, ActionCreator, ActionType, initialState} from './reducer.js';
import {detailedMovies} from './mocks/test-data';
import {ALL_GENRES} from './const';
import {genre} from './mocks/test-data';

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it(`Reducer should set genre by a given genre`, () => {
  expect(reducer({
    movies: detailedMovies,
    genre: ALL_GENRES,
  }, {
    type: ActionType.SET_GENRE,
    payload: genre,
  })).toEqual({
    movies: detailedMovies,
    genre,
  });

  expect(reducer({
    movies: detailedMovies,
    genre,
  }, {
    type: ActionType.SET_GENRE,
    payload: ALL_GENRES,
  })).toEqual({
    movies: detailedMovies,
    genre: ALL_GENRES,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for setting genre returns correct action`, () => {
    expect(ActionCreator.setGenre(genre)).toEqual({
      type: ActionType.SET_GENRE,
      payload: genre,
    });
  });
});
