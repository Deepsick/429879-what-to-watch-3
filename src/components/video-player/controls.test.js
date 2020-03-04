import React from 'react';
import renderer from 'react-test-renderer';
import Controls from './controls.jsx';
import {isPlaying, mockFunction} from '../../mocks/test-data';

it(`Should render Controls component correctly`, () => {
  const node = renderer.create(
      <Controls
        onExitButtonClick={mockFunction}
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
