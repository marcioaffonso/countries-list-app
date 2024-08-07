import React, { useDeferredValue } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { ScreensParams } from '../types/ScreensParams';

export default function CountriesList({ countries, onRefresh, refreshing }) {
  const deferredCountries = useDeferredValue(countries);
  const navigation = useNavigation<NavigationProp<ScreensParams>>();
  return (
    <FlatList
      data={deferredCountries}
      renderItem={({ item }) => (
        <View style={styles.countryContainer}>
          <Pressable onPress={() =>
              navigation.navigate('CountryDetails', { countryName: item.name.common })}>
            <View style={styles.countryCard}>
              <Text style={styles.name}>{item.name.common}</Text>
              <Text style={styles.flag}>{item.flag}</Text>
            </View>
          </Pressable>
        </View>
      )}
      ListEmptyComponent={() => (
        <View style={styles.countryContainer}>
          <View style={styles.countryCard}>
            <Text style={styles.countryText}>
              No countries matching the filter criteria.
            </Text>
          </View>
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
  countryContainer: {
    padding: 10,
  },
  countryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 2,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    maxWidth: '80%'
  },
  flag: {
    fontSize: 30
  },
  countryText: {
    fontSize: 18
  },
});
