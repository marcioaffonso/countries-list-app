import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function AppLoader() {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
