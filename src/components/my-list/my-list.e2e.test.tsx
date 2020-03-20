import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {BrowserRouter} from 'react-router-dom';

import {MyList} from './my-list';
import {movies, Auth, mockString} from '../../mocks/test-data';
import {ReducerName} from '../../const';

Enzyme.configure({
  adapter: new Adapter(),
});

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

it(`Should call callback on myList component mount`, () => {
  const onMount = jest.fn((...args) => [...args]);

  Enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <MyList
            favorites={movies}
            isAuth={Auth.NO_AUTH}
            avatar={mockString}
            loadFavorites={onMount}
          />
        </BrowserRouter>
      </Provider>
  );

  expect(onMount.mock.calls.length).toBe(1);
});
