import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';

export default function CountriesFilter({ onFilterChange }) {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.filterText}>Filter by name:</Text>
      <TextInput
        style={styles.filterInput}
        onChangeText={onFilterChange}
      />
    </View>
  );
};

CountriesFilter.propTypes = {
  onFilterChange: PropTypes.func,
};

const styles = StyleSheet.create({
  filterContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    marginTop: 30,
    minHeight: 30,
    maxHeight: 30,
    height: 30,
  },
  filterText: {
    flex: 1,
    fontSize: 20
  },
  filterInput: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#000',
    fontSize: 20,
    padding: 2
  },
});
