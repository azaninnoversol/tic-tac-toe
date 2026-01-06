import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UnAuthScreen from './UnAuthScreen';
import AuthScreen from './AuthScreen';
import { useAppContext } from '../context-api/AppContext';

function NavigationScreen() {
  const { token, loading } = useAppContext();
  const screenOptions = { headerShown: false };

  if (loading) return null;

  return (
    <NavigationContainer>
      {!token ? (
        <UnAuthScreen screenOptions={screenOptions} />
      ) : (
        <AuthScreen screenOptions={screenOptions} />
      )}
    </NavigationContainer>
  );
}
export default React.memo(NavigationScreen);
