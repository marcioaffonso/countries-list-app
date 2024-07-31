export interface Country {
  name: CountryName;
  flag: string;
  capital: string[];
  currencies: CountryCurrencies;
};

export interface CountryName {
  common: string;
  official: string;
};

export interface CountryCurrencies {
  [name: string]: CountryCurrency;
};

export interface CountryCurrency {
  name: string;
  symbol: string;
};
