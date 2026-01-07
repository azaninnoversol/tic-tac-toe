import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Selection from '../screens/Selection';
import Profile from '../screens/Profile';

function AuthScreen(props) {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        ...props?.screenOptions,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Selection" component={Selection} />
    </Stack.Navigator>
  );
}

export default React.memo(AuthScreen);
