import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {VideoPlayer} from './video-player';
import {movies, id, mockBool} from '../../mocks/test-data';

it(`Should render VideoPlayer component with controls correctly`, () => {
  const node = renderer.create(
      <VideoPlayer
        films={movies}
        isControls={mockBool}
        id={id}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(node).toMatchSnapshot();
});

it(`Should render VideoPlayer component without controls correctly`, () => {
  const node = renderer.create(
      <VideoPlayer
        films={movies}
        isControls={!mockBool}
        id={id}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(node).toMatchSnapshot();
});
