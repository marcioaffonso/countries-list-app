import React from 'react';
import renderer from 'react-test-renderer';
import { jest, expect, test } from '@jest/globals';
import App from '../App';

jest.mock('../src/stores/countryStore', () => {
  return {
    loading: false,
    refreshing: false,
    countries: []
  };
});

test('renders App correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
