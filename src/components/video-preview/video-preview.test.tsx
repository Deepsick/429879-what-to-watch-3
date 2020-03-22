import * as React from 'react';
import * as renderer from 'react-test-renderer';

import VideoPreview from './video-preview';
import {mockString, mockBool, mockFunction} from '../../mocks/test-data';

it(`Should render VideoPreview component correctly`, () => {
  const node = renderer.create(
      <VideoPreview
        trailer={mockString}
        setLoading={mockFunction}
        muted={mockBool}
        isLoading={mockBool}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(node).toMatchSnapshot();
});
