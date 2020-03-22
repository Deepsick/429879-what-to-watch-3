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
            setRating={mockFunction}
            setComment={mockFunction}
            rating={rating}
            comment={comment}
          />
        </BrowserRouter>
      </Provider>
  );

  const addReview = wrapper.find(AddReview);
  addReview.update();
  const form = addReview.find(`.add-review__form`);
  form.simulate(`submit`, {
    preventDefault: mockFunction,
  });

  expect(onFormSubmit.mock.calls.length).toBe(1);
  expect(onFormSubmit.mock.calls[0][0]).toBe(id);
  expect(onFormSubmit.mock.calls[0][1]).toMatchObject(review);
});

it(`Should call callback on rating input change`, () => {
  const onInputChange = jest.fn((...args) => [...args]);
  const {rating, comment} = review;

  const wrapper = Enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <AddReview
            movies={movies}
            isAuth={Auth.AUTH}
            id={id}
            avatar={mockString}
            postComment={mockFunction}
            setRating={onInputChange}
            setComment={mockFunction}
            rating={rating}
            comment={comment}
          />
        </BrowserRouter>
      </Provider>
  );

  const addReview = wrapper.find(AddReview);
  addReview.update();
  const ratingInput = addReview.find(`.rating__input`).at(0).instance();
  const ratingBlock = addReview.find(`.rating__stars`);
  ratingBlock.simulate(`change`, {target: ratingInput});

  expect(onInputChange.mock.calls.length).toBe(1);
  expect(onInputChange.mock.calls[0][0]).toBe(+ratingInput.value);
});


it(`Should call callback on comment input change`, () => {
  const onInputChange = jest.fn((...args) => [...args]);
  const {rating, comment} = review;

  const wrapper = Enzyme.mount(
      <Provider store={store}>
        <BrowserRouter>
          <AddReview
            movies={movies}
            isAuth={Auth.AUTH}
            id={id}
            avatar={mockString}
            postComment={mockFunction}
            setRating={mockFunction}
            setComment={onInputChange}
            rating={rating}
            comment={comment}
          />
        </BrowserRouter>
      </Provider>
  );

  const addReview = wrapper.find(AddReview);
  addReview.update();
  const commentInput = addReview.find(`.add-review__textarea`);
  commentInput.instance().value = comment;
  commentInput.simulate(`change`);

  expect(onInputChange.mock.calls.length).toBe(1);
  expect(onInputChange.mock.calls[0][0]).toBe(comment);
});
