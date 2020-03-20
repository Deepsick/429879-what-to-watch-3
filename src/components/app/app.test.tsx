import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import App from './app';
import {movies, genre, Auth} from '../../mocks/test-data';
import {ReducerName} from '../../const';

const store = configureStore([])({
  [ReducerName.DATA]: {
    movies,
    promo: movies[0],
  },
  [ReducerName.STATE]: {
    activeGenre: genre,
    shownMoviesCount: 3,
  },
  [ReducerName.USER]: {
    authorizationStatus: Auth.AUTH,
    authInfo: {
      avatar: `hello.jpg`,
    },
  }
});

it(`Should render App component correctly`, () => {
  const node = renderer.create(
      <Provider store={store}>
        <App/>
      </Provider>
  ).toJSON();

  expect(node).toMatchSnapshot();
});
