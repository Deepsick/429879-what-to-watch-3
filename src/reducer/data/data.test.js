import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api.js';
import {reducer, ActionType, Operation} from './data.js';
import {movies} from '../../mocks/test-data';
import {Path, Status} from '../../const';

const api = createAPI(() => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    movies: [],
  });
});

it(`Reducer should update movies by load movies`, () => {
  expect(reducer({
    movies: [],
  }, {
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  })).toEqual({
    movies,
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMovies();

    apiMock
      .onGet(`/${Path.FILMS}`)
      .reply(Status.OK, [{fake: true}]);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIES,
          payload: [{fake: true}],
        });
      });
  });
});
