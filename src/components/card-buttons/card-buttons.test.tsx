import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import CardButtons from './card-buttons';
import {id, mockFunction} from '../../mocks/test-data';

const isFavorite = true;
const isAddReview = true;

it(`Should render CardButtons component for film page correctly`, () => {
  const node = renderer.create(
      <BrowserRouter>
        <CardButtons
          id={id}
          isAddReview={isAddReview}
          isFavorite={isFavorite}
          onClick={mockFunction}
        />
      </BrowserRouter>
  ).toJSON();

  expect(node).toMatchSnapshot();
});

it(`Should render CardButtons component for main page correctly`, () => {
  const node = renderer.create(
      <BrowserRouter>
        <CardButtons
          id={id}
          isAddReview={!isAddReview}
          isFavorite={isFavorite}
          onClick={mockFunction}
        />
      </BrowserRouter>
  ).toJSON();

  expect(node).toMatchSnapshot();
});

it(`Should render CardButtons component for favorite film correctly`, () => {
  const node = renderer.create(
      <BrowserRouter>
        <CardButtons
          id={id}
          isAddReview={isAddReview}
          isFavorite={isFavorite}
          onClick={mockFunction}
        />
      </BrowserRouter>
  ).toJSON();

  expect(node).toMatchSnapshot();
});

it(`Should render CardButtons component for non-favorite film correctly`, () => {
  const node = renderer.create(
      <BrowserRouter>
        <CardButtons
          id={id}
          isAddReview={isAddReview}
          isFavorite={!isFavorite}
          onClick={mockFunction}
        />
      </BrowserRouter>
  ).toJSON();

  expect(node).toMatchSnapshot();
});

