import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { getLoggedInUser } from '../api/service';
import Toast from 'react-native-toast-message';

const Profile = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({
    user: {},
    loading: false,
  });

  const loadUser = async () => {
    setProfile(prev => ({ ...prev, loading: true }));
    try {
      const user = await getLoggedInUser();
      setProfile(prev => ({ ...prev, user: user }));
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'something went wrong!',
        text2: 'Please try again later.',
        visibilityTime: 2000,
      });
    } finally {
      setProfile(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  console.log(profile, 'profile');

  if (profile?.loading) {
    return <ActivityIndicator color={'#fff'} size={40} />;
  }

  return (
    <View style={styles?.container}>
      <ImageBackground
        source={require('../assests/images/tic-tac-toe.png')}
        style={styles?.background}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Icon
            name="left"
            size={32}
            color="#fff"
            style={{ position: 'absolute', top: 6, left: 10 }}
            onPress={() => navigation.goBack()}
            onLongPress={() => Alert.alert('Go Back')}
          />

          <Text style={{ fontSize: 30, color: 'white', fontWeight: '600' }}>
            Profile
          </Text>
        </View>

        <View>
          <View
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              overflow: 'hidden',
              marginTop: 10,
            }}
          >
            <Image
              source={require('../assests/images/dr.jpg')}
              resizeMode="cover"
              style={{ width: '100%', height: '100%' }}
            />
          </View>

          <Icon
            name="camera"
            size={18}
            color="#fff"
            style={{
              position: 'absolute',
              top: 122,
              right: 10,
              backgroundColor: 'black',
              padding: 8,
              borderRadius: 100,
            }}
          />
        </View>

        <View style={{ width: '90%' }}>
          <Input
            label="Email"
            placeholder="Enter Your Email"
            // value={formData?.email}
            // onChangeText={text => handleChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
            // error={
            //   formData.email && !validateEmail(formData.email)
            //     ? 'Invalid Email'
            //     : null
            // }
          />
          <Input
            label="Username"
            placeholder="Enter Your Name"
            // value={formData?.username}
            // onChangeText={text => handleChange('username', text)}
          />
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            gap: 10,
            marginTop: 10,
          }}
        >
          <Button
            title="Update"
            containerStyle={{
              marginBottom: 10,
              backgroundColor: 'red',
              width: 100,
            }}
            textStyle={{
              fontSize: 20,
            }}
          />

          <Button
            title="Change Password"
            containerStyle={{
              width: 200,
              marginBottom: 10,
              backgroundColor: 'purple',
            }}
            textStyle={{
              fontSize: 20,
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
  },
});

export default Profile;
