import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from './video-player.jsx';
import {trailer, muted, isPlaying, mockFunction, mockBool} from '../../mocks/test-data';

it(`Should render VideoPlayer component correctly`, () => {
  const node = renderer.create(
      <VideoPlayer
        src={trailer}
        isPlaying={isPlaying}
        isControls={mockBool}
        muted={muted}
        onExitButtonClick={mockFunction}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(node).toMatchSnapshot();
});
