import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {AddReview} from './add-review';
import {movies, id, Auth, review, mockString, mockFunction} from '../../mocks/test-data';
import {ReducerName} from '../../const';

Enzyme.configure({
  adapter: new Adapter(),
});

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

it(`Should call callback on form submit`, () => {
  const onFormSubmit = jest.fn((...args) => [...args]);
  const {rating, comment} = review;

  const wrapper = Enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <AddReview
            movies={movies}
            isAuth={Auth.AUTH}
            id={id}
            avatar={mockString}
            postComment={onFormSubmit}
          />
        </BrowserRouter>
      </Provider>
  );

  const addReview = wrapper.find(AddReview);
  addReview.setState({comment, rating});
  addReview.update();
  const form = addReview.find(`.add-review__form`);
  form.simulate(`submit`, {
    preventDefault: mockFunction,
  });

  expect(onFormSubmit.mock.calls.length).toBe(1);
  expect(onFormSubmit.mock.calls[0][0]).toBe(id);
  expect(onFormSubmit.mock.calls[0][1]).toMatchObject(review);
});
