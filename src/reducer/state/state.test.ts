import {reducer, ActionCreator, ActionType, initialState} from './state';
import {moviesCount, genre} from '../../mocks/test-data';
import {ALL_GENRES} from '../../const';

describe(`Actions work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  
  it(`Reducer should set genre by a given genre`, () => {
    expect(reducer({
      genre: ALL_GENRES,
      shownMoviesCount: moviesCount,
    }, {
      type: ActionType.SET_GENRE,
      payload: genre,
    })).toEqual({
      genre,
      shownMoviesCount: moviesCount,
    });
  
    expect(reducer({
  
      genre,
      shownMoviesCount: moviesCount,
    }, {
      type: ActionType.SET_GENRE,
      payload: ALL_GENRES,
    })).toEqual({
      genre: ALL_GENRES,
      shownMoviesCount: moviesCount,
    });
  });
  
  it(`Reducer should add shown movies`, () => {
    expect(reducer({
      genre: ALL_GENRES,
      shownMoviesCount: moviesCount,
    }, {
      type: ActionType.ADD_SHOWN_MOVIES,
      payload: moviesCount,
    })).toEqual({
      genre: ALL_GENRES,
      shownMoviesCount: moviesCount + moviesCount,
    });
  });
  
  it(`Reducer should reset shown movies`, () => {
    expect(reducer({
  
      genre: ALL_GENRES,
      shownMoviesCount: moviesCount * 5,
    }, {
      type: ActionType.RESET_SHOWN_MOVIES,
    })).toEqual({
      genre: ALL_GENRES,
      shownMoviesCount: moviesCount,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for setting genre returns correct action`, () => {
    expect(ActionCreator.setGenre(genre)).toEqual({
      type: ActionType.SET_GENRE,
      payload: genre,
    });
  });

  it(`Action creator for adding shown movies returns correct action`, () => {
    expect(ActionCreator.addShownMovies()).toEqual({
      type: ActionType.ADD_SHOWN_MOVIES,
      payload: moviesCount,
    });
  });

  it(`Action creator for resetting shown movies returns correct action`, () => {
    expect(ActionCreator.resetShownMovies()).toEqual({
      type: ActionType.RESET_SHOWN_MOVIES,
    });
  });
});
