
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {AddReview} from './add-review';
import {movies, id, Auth, mockFunction, mockString, rating} from '../../mocks/test-data';
import {ReducerName} from '../../const';

const store = configureStore([])({
  [ReducerName.DATA]: {
    movies,
  },
  [ReducerName.USER]: {
    authorizationStatus: Auth.AUTH,
    authInfo: {
      avatar: `hello.jpg`,
    },
  }
});

it(`Should render AddReview component correctly`, () => {
  const node = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <AddReview
            movies={movies}
            isAuth={Auth.AUTH}
            id={id}
            avatar={mockString}
            postComment={mockFunction}
            setRating={mockFunction}
            setComment={mockFunction}
            rating={rating}
            comment={mockString}
          />
        </BrowserRouter>
      </Provider>
  ).toJSON();

  expect(node).toMatchSnapshot();
});
