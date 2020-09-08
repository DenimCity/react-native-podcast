import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListenNowScreen from '../components/listenNow/ListenNow';
import {createStackNavigator} from '@react-navigation/stack';

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
const MainTabNavigator = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        options={{title: 'Listen Now Tab'}}
        name="Listen Now"
        component={ListenNowStackNavigator}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;
