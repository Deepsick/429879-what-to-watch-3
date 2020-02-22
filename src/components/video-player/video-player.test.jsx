import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from './video-player.jsx';
import {trailer, muted, isPlaying} from '../../mocks/test-data';

it(`Should render VideoPlayer component correctly`, () => {
  const node = renderer.create(
      <VideoPlayer
        src={trailer}
        isPlaying={isPlaying}
        muted={muted}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(node).toMatchSnapshot();
});
