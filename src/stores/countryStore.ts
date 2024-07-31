import { makeAutoObservable, runInAction } from 'mobx';
import { Country } from '../types/Country';
import { countries_api } from '../../config.json';

class CountryStore {
  countries: Country[];
  loading: boolean = false;
  filter: string = '';
  error: string;

  constructor() {
    makeAutoObservable(this);
    this.loadCountries();
  }

  async loadCountries(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      const response = await fetch(countries_api.api_url
        .concat(`?fields=${countries_api.fields.join(',')}`));
      const countries = await response.json();
      runInAction(() => {
        this.countries = countries.sort((c1: Country, c2: Country) =>
          c1.name.common.localeCompare(c2.name.common));
        this.loading = false;
      });
    } catch (e) { 
      runInAction(() => {
        this.error = "Error fetching countries."
        this.loading = false;
      });
    }
  }

  setFilter = (value: string) => {
    this.filter = value;
  }

  get filteredCountries(): Country[] {
    return this.countries.filter((country) =>
      country.name.common.toLowerCase().startsWith(this.filter.toLowerCase()));
  }

  get refreshing(): boolean {
    return this.loading && Boolean(this.countries);
  }
}

export default new CountryStore();
