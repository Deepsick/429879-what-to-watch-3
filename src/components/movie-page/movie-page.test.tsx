import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {BrowserRouter} from 'react-router-dom';

import {MoviePage} from './movie-page';
import {movies, id, mockFunction, mockString, Auth, comments} from '../../mocks/test-data';
import {ReducerName} from '../../const';

const store = configureStore([])({
  [ReducerName.DATA]: {
    movies,
    comments,
  },
  [ReducerName.USER]: {
    authorizationStatus: Auth.AUTH,
    authInfo: {
      avatar: `hello.jpg`,
    },
  },
});

it(`Should render MoviePage component correctly`, () => {
  const node = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <MoviePage
            movies={movies}
            id={id}
            active={mockString}
            isAuth={Auth.AUTH}
            avatar={mockString}
            comments={comments}
            loadComments={mockFunction}
            onFavoriteButtonClick={mockFunction}
            setActiveItem={mockFunction}
          />
        </BrowserRouter>
      </Provider>
  ).toJSON();

  expect(node).toMatchSnapshot();
});
