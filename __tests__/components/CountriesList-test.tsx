import React from 'react';
import renderer from 'react-test-renderer';
import { expect, test, jest } from '@jest/globals';
import CountriesList from '../../src/components/CountriesList';
import { mockCountries } from '../mocks/mockCountries';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

test('renders empty list of countries correctly', () => {
  const tree = renderer.create(<CountriesList countries={[]} />).toJSON;
  expect(tree).toMatchSnapshot();
});

test('renders filled list of countries correctly', () => {
  const tree = renderer.create(<CountriesList countries={mockCountries} />);
  expect(tree).toMatchSnapshot();
});
