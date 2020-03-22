import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import Main from './main';
import {movies, genre, mockFunction, moviesCount, Auth} from '../../mocks/test-data';
import {ReducerName} from '../../const';
import history from '../../history';

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

it(`Should render Main component correctly`, () => {
  const node = renderer.create(
      <Provider store={store}>
        <Router history={history}>
          <Main
            movie={movies[0]}
            movies={movies}
            onMovieTitleClick={mockFunction}
            activeGenre={genre}
            isAuth={Auth.AUTH}
            setGenre={mockFunction}
            onShowMoreButtonClick={mockFunction}
            onFavoriteButtonClick={mockFunction}
            shownMoviesCount={moviesCount}
          />
        </Router>
      </Provider>
  ).toJSON();

  expect(node).toMatchSnapshot();
});
