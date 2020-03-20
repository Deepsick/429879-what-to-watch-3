import * as React from 'react';
import * as renderer from 'react-test-renderer';

import withActiveItem from './with-active-item';
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

const MockComponentWrapped = withActiveItem(MockComponent);

it(`withActiveItem is rendered correctly`, () => {
  const tree = renderer.create(
      <MockComponentWrapped
        activeTab={mockString}
        id={id}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
