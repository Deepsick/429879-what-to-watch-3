import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import Controls from './controls';
import {isPlaying, mockFunction, duration} from '../../mocks/test-data';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should call callback on play button click`, () => {
  const onClick = jest.fn((...args) => [...args]);

  const wrapper = Enzyme.shallow(
      <Controls
        duration={duration}
        progress={duration}
        onPlayButtonClick={onClick}
        onFullScreenButtonClick={mockFunction}
        isPlaying={isPlaying}
      />
  );

  const playButton = wrapper.find(`.player__play`);
  playButton.simulate(`click`);

  expect(onClick.mock.calls.length).toBe(1);
});

it(`Should call callback on fullscreen button click`, () => {
  const onClick = jest.fn((...args) => [...args]);

  const wrapper = Enzyme.shallow(
      <Controls
        duration={duration}
        progress={duration}
        onPlayButtonClick={mockFunction}
        onFullScreenButtonClick={onClick}
        isPlaying={isPlaying}
      />
  );

  const playButton = wrapper.find(`.player__full-screen`);
  playButton.simulate(`click`);

  expect(onClick.mock.calls.length).toBe(1);
});
