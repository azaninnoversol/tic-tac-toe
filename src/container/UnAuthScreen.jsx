import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';

function UnAuthScreen(props) {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{
        ...props?.screenOptions,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Register} />
    </Stack.Navigator>
  );
}

export default React.memo(UnAuthScreen);
