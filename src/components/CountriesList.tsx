import React, { useDeferredValue } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default function CountriesList({ countries, onRefresh, refreshing }) {
  const deferredCustomers = useDeferredValue(countries);
  return (
    <FlatList
      data={deferredCustomers}
      renderItem={({ item }) => (
        <View style={styles.countryCard}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{item.name.common}</Text>
            <Text style={styles.flag}>{item.flag}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailsText}>🌎 Name: { item.name.official }</Text>
            <Text style={styles.detailsText}>🏠 Capital: { item.capital.join(', ') }</Text>
            <Text style={styles.detailsText}>
              💵 Currency: { Object.keys(item.currencies).map((key) => {
                const currency = item.currencies[key];
                return `${key} (${currency.symbol}) - ${currency.name}`;
              }).join(', ') }
            </Text>
          </View>
        </View>
      )}
      ListEmptyComponent={() => (
        <View style={styles.countryCard}>
          <Text style={styles.detailsText}>No countries matching the filter criteria.</Text>
        </View>
      )}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
};

CountriesList.propTypes = {
  countries: PropTypes.array,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool
};

const styles = StyleSheet.create({
  countryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    margin: 10,
    padding: 16
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    flexWrap: 'wrap'
  },
  flag: {
    fontSize: 30
  },
  details: {
    marginBottom: 10
  },
  detailsText: {
    fontSize: 18
  },
});
