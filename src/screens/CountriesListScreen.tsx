import React, { useMemo, useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useDebounce } from 'use-debounce';
import CountriesFilter from '../components/CountriesFilter';
import CountriesList from '../components/CountriesList';
import countryStore from '../stores/countryStore';
import CustomLoader from '../components/CustomLoader';

const CountriesListScreen = () => {
  const countriesFilter = useMemo(() =>
    <CountriesFilter onFilterChange={countryStore.setFilter} />,
    [countryStore.setFilter]
  );
  const countriesList = useMemo(() =>
    <CountriesList
      countries={countryStore.countries}
      onRefresh={countryStore.loadCountries}
      refreshing={countryStore.refreshing}
    />,
    [countryStore.countries]
  );
  const [filter] = useDebounce(countryStore.filter, 200);
  useEffect(() => {
    countryStore.loadCountries()
  }, [filter]);
  return (
    <SafeAreaView style={styles.container}>
      {countryStore.loading && !countryStore.refreshing ?
        <CustomLoader /> :
        <>
          { countriesFilter }
          { countriesList }
        </>
      }
    </SafeAreaView>
  );
};

export default observer(CountriesListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    paddingTop: StatusBar.currentHeight
  }
});
