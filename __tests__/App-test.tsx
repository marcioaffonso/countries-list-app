import React from 'react';
import renderer from 'react-test-renderer';
import { jest, expect, test } from '@jest/globals';
import App from '../App';
import CountriesFilter from '../src/components/CountriesFilter';
import CountriesList from '../src/components/CountriesList';

jest.mock('../src/stores/countryStore', () => {
  return {
    loading: false,
    filteredCountries: []
  };
});

test('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders App loading correctly', () => {
  const tree = renderer.create(<App />);
  expect(tree.root.findByType(CountriesFilter)).not.toBeNull;
  expect(tree.root.findByType(CountriesList)).not.toBeNull;
});
