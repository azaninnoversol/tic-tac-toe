import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button/Button';
import CustomModal from '../components/CustomModal/CustomModal';
import { useAppContext } from '../context-api/AppContext';
import { useNavigation } from '@react-navigation/native';

function Home() {
  const navigation = useNavigation();
  const { logout } = useAppContext();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleLogut = async () => {
    setIsOpenModal(false);
    await logout();
  };

  return (
    <View style={[styles?.container]}>
      <ImageBackground
        source={require('../assests/images/tic-tac-toe.png')}
        style={styles?.background}
      >
        <View>
          <Image
            source={require('../assests/images/main-logo.jpg')}
            resizeMode="cover"
            style={styles?.logo}
          />
        </View>

        <View style={styles?.buttonWrapper}>
          <Button
            title={'Play'}
            onPress={() => navigation.navigate('Selection')}
            containerStyle={{
              backgroundColor: '#114adbff',
              width: '40%',
              alignItems: 'center',
              marginBottom: 10,
            }}
          />

          <Button
            title={'Logout'}
            onPress={() => setIsOpenModal(true)}
            containerStyle={{
              backgroundColor: '#2C53B7',
              width: '40%',
              alignItems: 'center',
            }}
          />

          <CustomModal
            visible={isOpenModal}
            onClose={() => setIsOpenModal(false)}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Signout</Text>
            <Text style={{ marginVertical: 10 }}>Do You Want To Logout?</Text>
            <Button
              title="Yes"
              onPress={() => handleLogut()}
              containerStyle={{ marginBottom: 10, backgroundColor: 'red' }}
            />
            <Button title="No" onPress={() => setIsOpenModal(false)} />
          </CustomModal>
        </View>
      </ImageBackground>
    </View>
  );
}

export default React.memo(Home);

const styles = StyleSheet.create({
  container: {
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
