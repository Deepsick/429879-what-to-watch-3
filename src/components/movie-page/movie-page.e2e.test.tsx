import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {BrowserRouter} from 'react-router-dom';

import {MoviePage} from './movie-page';
import {movies, id, mockFunction, mockString, Auth, comments} from '../../mocks/test-data';
import {ReducerName} from '../../const';

Enzyme.configure({
  adapter: new Adapter(),
});

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

it(`Should call callback MoviePage component mount`, () => {
  const onMount = jest.fn((...args) => [...args]);

  const wrapper = Enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <MoviePage
            movies={movies}
            id={id}
            active={mockString}
            isAuth={Auth.AUTH}
            avatar={mockString}
            comments={comments}
            loadComments={onMount}
            onFavoriteButtonClick={mockFunction}
            setActiveItem={mockFunction}
          />
        </BrowserRouter>
      </Provider>
  );
  wrapper.update();

  expect(onMount.mock.calls.length).toBe(1);
});
