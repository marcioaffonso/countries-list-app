import React from 'react';
import renderer from 'react-test-renderer';
import { expect, test } from '@jest/globals';
import CountriesList from '../../src/components/CountriesList';
import { countries } from '../mocks/countries';

test('renders empty countries list correctly', () => {
  const tree = renderer.create(<CountriesList countries={[]} />).toJSON;
  expect(tree).toMatchSnapshot();
});

test('renders filled countries list correctly', () => {
  const tree = renderer.create(<CountriesList countries={countries} />);
  expect(tree).toMatchSnapshot();
});
