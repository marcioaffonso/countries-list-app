import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { observer } from 'mobx-react-lite';
import CountriesFilter from './src/components/CountriesFilter';
import CountriesList from './src/components/CountriesList';
import countryStore from './src/stores/countryStore';
import AppLoader from './src/components/AppLoader';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {countryStore.loading && !countryStore.refreshing ?
        <AppLoader /> :
        <>
          <CountriesFilter onFilterChange={countryStore.setFilter} />
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

export default observer(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    paddingTop: StatusBar.currentHeight
  }
});
