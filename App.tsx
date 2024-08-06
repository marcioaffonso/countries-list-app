import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CountriesListScreen from './src/screens/CountriesListScreen';
import CountryDetailsScreen from './src/screens/CountryDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Countries" component={CountriesListScreen} />
        <Stack.Screen name="CountryDetails"
          component={CountryDetailsScreen}
          options={({ route }) => ({ title: route.params['countryName'] })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
