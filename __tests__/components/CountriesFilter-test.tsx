import React from 'react';
import { TextInput } from 'react-native';
import renderer from 'react-test-renderer';
import { jest, expect, test } from '@jest/globals';
import CountriesFilter from '../../src/components/CountriesFilter';

const onFilterhMock = jest.fn();

test('renders correctly', () => {
  const tree = renderer.create(<CountriesFilter onFilterChange={onFilterhMock} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders App loading correctly', () => {
  const mockValue = 'the-value';
  const tree = renderer.create(<CountriesFilter onFilterChange={onFilterhMock} />);
  tree.root.findByType(TextInput).props.onChangeText(mockValue);
  expect(onFilterhMock).toBeCalledWith(mockValue);
});
