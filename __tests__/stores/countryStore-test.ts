import { jest, expect, test } from '@jest/globals';
import { mockCountries } from '../mocks/mockCountries';
import countryStore from '../../src/stores/countryStore';

let mockFetchData: object;

// @ts-expect-error: mock global fetch 
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(mockFetchData)
}));

test('loads countries correctly', async () => {
  mockFetchData = mockCountries;
  await countryStore.loadCountries();
  expect(countryStore.filteredCountries).toEqual(mockCountries);
});

test('filters countries correctly', async () => {
  await countryStore.loadCountries();
  countryStore.setFilter('Country1');
  expect(countryStore.filteredCountries.length).toEqual(1);
});

test('loads country details correctly', async () => {
  const mockCountryName = mockCountries[0].name.common;
  mockFetchData = mockCountries.filter((_) => _.name.common === mockCountryName);
  await countryStore.loadCountryDetails(mockCountryName);
  expect(countryStore.countryDetails).toEqual(mockCountries[0]);
});
