import React from 'react';
import renderer from 'react-test-renderer';
import { jest, expect, test } from '@jest/globals';
import CountriesFilter from '../../src/components/CountriesFilter';
import CountriesList from '../../src/components/CountriesList';
import CountriesListScreen from '../../src/screens/CountriesListScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('../../src/stores/countryStore', () => {
  return {
    loading: false,
    refreshing: false,
    countries: [],
    loadCountries: jest.fn()
  };
});

test('renders correctly', () => {
  const tree = renderer.create(<CountriesListScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders App loading correctly', () => {
  const tree = renderer.create(<CountriesListScreen />);
  expect(tree.root.findByType(CountriesFilter)).not.toBeNull;
  expect(tree.root.findByType(CountriesList)).not.toBeNull;
});
