import React from 'react';
import renderer from 'react-test-renderer';
import {detailedMovies} from '../../mocks/test-data';
import MoreLikeThis from './more-like-this.jsx';

it(`Should render MoreLikeThis component correctly`, () => {
  const node = renderer.create(
      <MoreLikeThis
        movies={detailedMovies.slice(4)}
      />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
