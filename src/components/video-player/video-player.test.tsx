import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {VideoPlayer} from './video-player';
import {movies, id, duration, mockBool, mockFunction} from '../../mocks/test-data';

it(`Should render VideoPlayer component with controls correctly`, () => {
  const node = renderer.create(
      <VideoPlayer
        films={movies}
        setLoading={mockFunction}
        setPlaying={mockFunction}
        setProgress={mockFunction}
        setDuration={mockFunction}
        isLoading={mockBool}
        isPlaying={mockBool}
        duration={duration}
        progress={duration}
        id={id}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(node).toMatchSnapshot();
});
