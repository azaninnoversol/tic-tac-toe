import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { validateEmail } from '../utils/helper';
import { RegisterUser } from '../api/service';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const defaultStates = {
  email: '',
  username: '',
  password: '',
};

function Register() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState(defaultStates);
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { email, password, username } = formData;

    try {
      const res = await RegisterUser(email, password, username);

      if (!res?.success) {
        setFormData(defaultStates);
        Toast.show({
          type: 'error',
          text1: 'Signup Failed',
          text2: res?.message || 'Please try again later.',
          visibilityTime: 4000,
        });
      } else {
        AsyncStorage.setItem('TOKEN', res?.token);
        setFormData(defaultStates);
        Toast.show({
          type: 'success',
          text1: 'Account Created',
          text2: 'Your account has been successfully created!',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.error(error?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assests/images/logo.png')}
        style={styles?.image}
      />
      <Text style={styles.text}>Create Your Account</Text>
      <Text style={styles.paragraph}>
        Sign up to get started with your new account
      </Text>

      <View style={styles?.form}>
        <Input
          label="Email"
          placeholder="Enter Your Email"
          value={formData?.email}
          onChangeText={text => handleChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
          error={
            formData.email && !validateEmail(formData.email)
              ? 'Invalid Email'
              : null
          }
        />
        <Input
          label="Username"
          placeholder="Enter Your Name"
          value={formData?.username}
          onChangeText={text => handleChange('username', text)}
        />
        <Input
          label="Password"
          placeholder="Enter Your Password"
          value={formData?.password}
          onChangeText={text => handleChange('password', text)}
          secureTextEntry
        />

        <View style={{ marginTop: 6, marginBottom: 6 }}>
          <Button
            title={'Create Account'}
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
          />
        </View>

        <Text style={styles.link}>
          have an account?{' '}
          <Text
            style={{
              color: '#87CEEB',
              textDecorationLine: 'underline',
            }}
            onPress={() => navigation?.navigate('Login')}
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}

export default React.memo(Register);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: '#0A0171',
  },
  text: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'semibold',
  },
  paragraph: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
    paddingTop: 15,
  },
  image: {
    width: 220,
    height: 220,
    objectFit: 'cover',
    marginBottom: 20,
  },
  form: {
    width: '90%',
    height: '100%',
    margin: '0 auto',
    paddingTop: 20,
  },
  link: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
});
