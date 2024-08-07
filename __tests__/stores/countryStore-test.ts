import { jest, expect, test } from '@jest/globals';
import { mockCountries } from '../mocks/mockCountries';
import countryStore from '../../src/stores/countryStore';

// @ts-expect-error: mock global fetch
global.fetch = jest.fn((url: string) => Promise.resolve({
  json: () => Promise.resolve(url.includes('/all') ? mockCountries : [mockCountries[0]]),
  ok: true
}));

test('loads countries correctly', async () => {
  await countryStore.loadCountries();
  expect(countryStore.countries).toEqual(mockCountries);
});

test('filters countries correctly', async () => {
  countryStore.setFilter('Country1');
  await countryStore.loadCountries();
  expect(countryStore.countries.length).toEqual(1);
});

test('loads country details correctly', async () => {
  const mockCountryName = mockCountries[0].name.common;
  await countryStore.loadCountryDetails(mockCountryName);
  expect(countryStore.countryDetails).toEqual(mockCountries[0]);
});
