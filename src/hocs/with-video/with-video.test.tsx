import * as React from 'react';
import * as renderer from 'react-test-renderer';

import withVideo from './with-video';
import {id} from '../../mocks/test-data';

interface MockComponentProps {
  children: React.ReactNode;
}

const MockComponent = (props: MockComponentProps) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

const MockComponentWrapped = withVideo(MockComponent);

it(`withVideo is rendered correctly`, () => {
  const tree = renderer.create(
      <MockComponentWrapped id={id} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
