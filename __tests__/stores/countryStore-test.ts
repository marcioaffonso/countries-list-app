import { jest, expect, test } from '@jest/globals';
import { countries } from '../mocks/countries';
import countryStore from '../../src/stores/countryStore';

// @ts-expect-error: should expect Response
jest.spyOn(global, 'fetch').mockReturnValue(Promise.resolve({ json: () => Promise.resolve(countries)}));

test('loads countries correctly', async () => {
  await countryStore.loadCountries();
  expect(countryStore.filteredCountries).toEqual(countries);
});

test('filters countries correctly', async () => {
  await countryStore.loadCountries();
  countryStore.setFilter('Country1');
  expect(countryStore.filteredCountries.length).toEqual(1);
});
