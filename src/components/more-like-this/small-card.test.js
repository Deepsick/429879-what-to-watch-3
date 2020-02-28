import React from 'react';
import renderer from 'react-test-renderer';
import {movies} from '../../mocks/test-data';
import SmallCard from './small-card.jsx';

it(`Should render SmallCard component correctly`, () => {
  const {picture, name} = movies[0];
  const node = renderer.create(
      <SmallCard
        picture={picture}
        name={name}
      />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
