import * as React from 'react';
import * as renderer from 'react-test-renderer';

import withReviewState from './with-review-state';

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

const MockComponentWrapped = withReviewState(MockComponent);

it(`withReviewState is rendered correctly`, () => {
  const tree = renderer.create(
      <MockComponentWrapped />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
