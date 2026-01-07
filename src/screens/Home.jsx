import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import Button from '../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import Setting from '../components/Setting/Setting';

function Home() {
  const navigation = useNavigation();

  return (
    <View style={[styles?.container]}>
      <ImageBackground
        source={require('../assests/images/tic-tac-toe.png')}
        style={styles?.background}
      >
        <Setting navigation={navigation} />

        <View>
          <Image
            source={require('../assests/images/main-logo.jpg')}
            resizeMode="cover"
            style={styles?.logo}
          />
        </View>

        <View style={styles?.buttonWrapper}>
          <Button
            title={'Play With Computer'}
            onPress={() => navigation.navigate('Selection')}
            containerStyle={{
              backgroundColor: '#114adbff',
              width: '50%',
              alignItems: 'center',
              marginBottom: 10,
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

export default React.memo(Home);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#275EEB',
    height: '100%',
    width: '100%',
  },
  background: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  logo: {
    resizeMode: 'cover',
    width: 400,
    height: 400,
    backgroundColor: 'transparent',
    mixBlendMode: 'color-dodge',
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
});
