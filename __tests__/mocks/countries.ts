import { Country } from "../../src/types/Country";

export const countries: Country[] = [
  {
    name: { common: 'Country1', official: 'Official1' },
    flag: '🇧🇷',
    capital: ['Capital1'],
    currencies: { "C1": { name: "currenycy1", symbol: '$' }}
  },
  {
    name: { common: 'Country2', official: 'Official2' },
    flag: '🇺🇸',
    capital: ['Capital2'],
    currencies: { "C2": { name: "currenycy2", symbol: '$' }}
  }
];
