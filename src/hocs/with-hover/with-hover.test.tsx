import * as React from 'react';
import * as renderer from 'react-test-renderer';

import withHover from './with-hover';
import {id, mockString} from '../../mocks/test-data';

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

const MockComponentWrapped = withHover(MockComponent);

it(`withHover is rendered correctly`, () => {
  const tree = renderer.create(
      <MockComponentWrapped
        picture={mockString}
        id={id}
        name={mockString}
        trailer={mockString}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
