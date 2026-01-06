import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import NavigationScreen from './src/container/NavigationScreen';
import { AuthProvider } from './src/context-api/AppContext';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-url-polyfill/auto';
import { enableScreens } from 'react-native-screens';

enableScreens();

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <AppContent />
          <Toast />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function AppContent() {
  const token = AsyncStorage.getItem('TOKEN');

  return (
    <SafeAreaView style={token ? styles?.authcontainer : styles?.container}>
      <View
        style={{
          flex: 1,
        }}
      >
        <NavigationScreen initRoute={'Login'} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0171',
  },
  authcontainer: {
    flex: 1,
    backgroundColor: 'transparent',
    height: '100%',
  },
});

export default App;
