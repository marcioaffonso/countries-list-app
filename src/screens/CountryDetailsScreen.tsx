import React, { useEffect } from 'react';
import { View, Text, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import countryStore from '../stores/countryStore';
import CustomLoader from '../components/CustomLoader';

const CountryDetailsScreen = ({ route }) => {
  const { countryName } = route.params;
  const { loadingDetails, refreshingDetails, countryDetails } = countryStore;
  const loadCountryInfo = () => {
    countryStore.loadCountryDetails(countryName);
  }
  useEffect(loadCountryInfo, [countryName]);
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshingDetails} onRefresh={loadCountryInfo} />
      }
    >
      { loadingDetails || !countryDetails ? <CustomLoader /> :
        <>
          <Text style={styles.flag}>{ countryDetails.flag }</Text>
          <Text style={styles.name}>{ countryDetails.name.common }</Text>
          <View style={styles.details}>
            <Text style={styles.detailsText}>🌎 Name: { countryDetails.name.official }</Text>
            <Text style={styles.detailsText}>🏠 Capital: { countryDetails.capital.join(', ') }</Text>
            <Text style={styles.detailsText}>
              💵 Currency: { Object.keys(countryDetails.currencies).map((key) => {
                const currency = countryDetails.currencies[key];
                return `${key} (${currency.symbol}) - ${currency.name}`;
              }).join(', ') }
            </Text>
          </View>
        </>
      }
    </ScrollView>
  );
};

CountryDetailsScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.any,
  }).isRequired,
};

export default observer(CountryDetailsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  name: {
    fontSize: 40,
    textAlign: 'center',
  },
  flag: {
    textAlign: 'center',
    fontSize: 200
  },
  details: {
    marginTop: 60,
    paddingHorizontal: 10
  },
  detailsText: {
    fontSize: 24
  }
});
