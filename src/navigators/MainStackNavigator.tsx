import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../components/home/HomeScreen';

const MainStack = createStackNavigator();

export default function MainStackNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={HomeScreen} />
    </MainStack.Navigator>
  );
}
