import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import ListenNowScreen from '../components/listenNow/ListenNow';
import SearchScreen from '../components/search/SearchScreen';
import LibraryScreen from '../components/library/LibraryScreen';

const MainTab = createBottomTabNavigator();
const ListenNowStack = createStackNavigator();

const ListenNowStackNavigator = () => {
  return (
    <ListenNowStack.Navigator>
      <ListenNowStack.Screen
        options={{
          title: 'Listen Now Screen Header',
        }}
        name="Listen Now"
        component={ListenNowScreen}
      />
    </ListenNowStack.Navigator>
  );
};
const SearchStack = createStackNavigator();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} />
    </SearchStack.Navigator>
  );
};
const LibraryStack = createStackNavigator();

const LibraryStackNavigator = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen name="Library" component={LibraryScreen} />
    </LibraryStack.Navigator>
  );
};
const MainTabNavigator = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        options={{title: 'Listen Now Tab'}}
        name="Listen Now"
        component={ListenNowStackNavigator}
      />
      <MainTab.Screen name="Library" component={LibraryStackNavigator} />
      <MainTab.Screen name="Search" component={SearchStackNavigator} />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
