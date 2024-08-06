import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { observer } from 'mobx-react-lite';
import CountriesFilter from '../components/CountriesFilter';
import CountriesList from '../components/CountriesList';
import countryStore from '../stores/countryStore';
import CustomLoader from '../components/CustomLoader';

const CountriesListScreen = () => {
  const countriesFilter = useMemo(() =>
    <CountriesFilter onFilterChange={countryStore.setFilter} />,
    [countryStore.setFilter]
  );
  return (
    <SafeAreaView style={styles.container}>
      {countryStore.loading && !countryStore.refreshing ?
        <CustomLoader /> :
        <>
          {countriesFilter}
          <CountriesList
            countries={countryStore.filteredCountries}
            onRefresh={countryStore.loadCountries}
            refreshing={countryStore.refreshing}
          />
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
