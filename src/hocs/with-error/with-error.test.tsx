import * as React from 'react';
import * as renderer from 'react-test-renderer';

import withError from './with-error';

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

const MockComponentWrapped = withError(MockComponent);

it(`withError is rendered correctly`, () => {
  const tree = renderer.create(
      <MockComponentWrapped />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
