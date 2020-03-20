import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {BrowserRouter} from 'react-router-dom';

import {MyList} from './my-list';
import {movies, Auth, mockString, mockFunction} from '../../mocks/test-data';
import {ReducerName} from '../../const';

const store = configureStore([])({
  [ReducerName.USER]: {
    authorizationStatus: Auth.AUTH,
    authInfo: {
      avatar: `hello.jpg`,
    },
  },
  [ReducerName.DATA]: {
    favorites: movies,
  },
});

it(`Should render MyList component correctly`, () => {
  const node = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <MyList
            favorites={movies}
            isAuth={Auth.NO_AUTH}
            avatar={mockString}
            loadFavorites={mockFunction}
          />
        </BrowserRouter>
      </Provider>
  ).toJSON();

  expect(node).toMatchSnapshot();
});
