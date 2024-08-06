import React from 'react';
import renderer from 'react-test-renderer';
import { expect, test } from '@jest/globals';
import CustomLoader from '../../src/components/CustomLoader';

test('renders loader correctly', () => {
  const tree = renderer.create(<CustomLoader />).toJSON();
  expect(tree).toMatchSnapshot();
});
