import React from 'react';
import renderer from 'react-test-renderer';
import Header from './header.jsx';

it(`Should render Header component correctly`, () => {
  const node = renderer.create(
      <Header />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
