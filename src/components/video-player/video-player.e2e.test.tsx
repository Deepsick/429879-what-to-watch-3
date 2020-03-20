import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {VideoPlayer} from './video-player';
import {movies, id, mockBool, mockFunction} from '../../mocks/test-data';
import {ReducerName} from '../../const';

Enzyme.configure({
  adapter: new Adapter(),
});

interface Window {
  HTMLMediaElement: {
    prototype: {
      play: () => void;
      pause: () => void;
    };
  };
}
declare const window: Window;

const store = configureStore([])({
  [ReducerName.DATA]: {
    movies,
  }
});

it(`Should VideoPlayer component work correctly - play/pause`, () => {
  window.HTMLMediaElement.prototype.play = mockFunction;
  window.HTMLMediaElement.prototype.pause = mockFunction;

  const wrapper = Enzyme.mount(
      <Provider store={store}>
        <VideoPlayer
          films={movies}
          isControls={mockBool}
          id={id}
        />
      </Provider>
  );

  const player = wrapper.find(VideoPlayer);
  player.setState({isLoading: false});
  expect(player.state().isPlaying).toBe(true);

  player.setState({isPlaying: false});
  player.update();
  expect(player.state().isPlaying).toBe(false);
});
