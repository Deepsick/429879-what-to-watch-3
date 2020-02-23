import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './footer.jsx';

it(`Should render Footer component correctly`, () => {
  const node = renderer.create(
      <Footer />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
