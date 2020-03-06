import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VideoPlayer from './video-player.jsx';
import {trailer, isPlaying, muted, mockBool, mockFunction} from '../../mocks/test-data';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should VideoPlayer component work correctly - play/pause`, () => {
  const player = mount(
      <VideoPlayer
        src={trailer}
        isPlaying={isPlaying}
        muted={muted}
        isControls={mockBool}
        onExitButtonClick={mockFunction}
      />
  );
  window.HTMLMediaElement.prototype.play = () => {};
  window.HTMLMediaElement.prototype.pause = () => {};

  player.setState({isLoading: false});
  expect(player.state().isPlaying).toBe(true);

  player.setState({isPlaying: true});
  expect(player.state().isPlaying).toBe(true);
});
