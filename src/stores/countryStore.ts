import { makeAutoObservable, runInAction } from 'mobx';
import { Country } from '../types/Country';
import { countries_api } from '../../config.json';

class CountryStore {
  countries: Country[];
  countryDetails: Country;
  loading: boolean = false;
  loadingDetails: boolean = false;
  filter: string = '';
  error: string;

  constructor() {
    makeAutoObservable(this);
  }

  async loadCountries(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      const path = this.filter ? `name/${this.filter}` : 'all';
      const response = await fetch(`${countries_api.api_url}/${path}?fields=name,flag`);
      const countries = response.ok ? await response.json() : [];
      runInAction(() => {
        this.countries = countries.sort((c1: Country, c2: Country) =>
          c1.name.common.localeCompare(c2.name.common));
        this.loading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.error = "Error fetching countries.";
        this.loading = false;
      });
    }
  }

  async loadCountryDetails(countryName: string): Promise<void> {
    this.countryDetails = null;
    this.loadingDetails = true;
    this.error = null;
    try {
      const url = `${countries_api.api_url}/name/${countryName}?fields=${countries_api.fields.join(',')}`;
      const response = await fetch(url);
      const countries = await response.json();
      runInAction(() => {
        this.countryDetails = countries[0];
        this.loadingDetails = false;
      });
    } catch (e) { 
      runInAction(() => {
        this.error = "Error loading country.";
        this.loadingDetails = false;
      });
    }
  }

  setFilter = (value: string) => {
    this.filter = value;
  }

  get refreshing(): boolean {
    return this.loading && Boolean(this.countries);
  }

  get refreshingDetails(): boolean {
    return this.loadingDetails && Boolean(this.countryDetails);
  }
}

export default new CountryStore();
