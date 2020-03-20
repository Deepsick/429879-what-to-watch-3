import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Controls from './controls';
import {isPlaying, mockFunction, duration} from '../../mocks/test-data';

it(`Should render Controls component correctly`, () => {
  const node = renderer.create(
      <Controls
        duration={duration}
        progress={duration}
        onPlayButtonClick={mockFunction}
        onFullScreenButtonClick={mockFunction}
        isPlaying={isPlaying}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(node).toMatchSnapshot();
});
