import * as React from 'react';
import * as renderer from 'react-test-renderer';

import withPreview from './with-preview';
import {trailer} from '../../mocks/test-data';

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

const MockComponentWrapped = withPreview(MockComponent);

it(`withPreview is rendered correctly`, () => {
  const tree = renderer.create(
      <MockComponentWrapped trailer={trailer} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
