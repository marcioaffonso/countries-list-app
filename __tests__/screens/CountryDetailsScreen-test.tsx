import React from 'react';
import renderer from 'react-test-renderer';
import { jest, expect, test } from '@jest/globals';
import CountryDetailsScreen from '../../src/screens/CountryDetailsScreen';
import { mockCountries }  from '../mocks/mockCountries';

const mockRouteParams = {
  params: {
    country: mockCountries[0].name.common
  }
};

jest.mock('../../src/stores/countryStore', () => {
  return {
    loadingDetails: false,
    refreshingDetails: false,
    countryDetails: {
      name: { common: 'Country1', official: 'Official1' },
      flag: '🇧🇷',
      capital: ['Capital1'],
      currencies: { "C1": { name: "currenycy1", symbol: '$' }}
    },
    loadCountryDetails: jest.fn()
  };
});

test('renders country details correctly', () => {
  const tree = renderer.create(<CountryDetailsScreen route={mockRouteParams} />).toJSON();
  expect(tree).toMatchSnapshot();
});
