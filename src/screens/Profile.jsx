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
import { getLoggedInUser, updateUser } from '../api/service';
import Toast from 'react-native-toast-message';
import { validateEmail } from '../utils/helper';

const Profile = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [originalUser, setOriginalUser] = useState({});
  const [formUser, setFormUser] = useState({});

  const loadUser = async () => {
    setLoading(true);
    try {
      const user = await getLoggedInUser();
      if (user.success) {
        setOriginalUser(user.data);
        setFormUser(user.data);
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!',
        text2: 'Please try again later.',
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    const updates = {
      email: formUser.email,
      username: formUser.username,
      password: formUser.userCode,
    };

    const res = await updateUser(updates);
    if (res.success) {
      Toast.show({
        type: 'success',
        text1: res.message,
        text2: 'Changes Saved Successfully',
      });
      setOriginalUser(formUser);
    } else {
      Toast.show({
        type: 'error',
        text1: res.message,
        text2: 'Something went wrong please try again later!',
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const isChanged = () => {
    return (
      formUser?.email !== originalUser?.email ||
      formUser?.username !== originalUser?.username ||
      formUser?.userCode !== originalUser?.userCode
    );
  };

  if (loading) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator color="#fff" size={50} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assests/images/tic-tac-toe.png')}
        style={styles.background}
      >
        <View style={styles.header}>
          <Icon
            name="left"
            size={32}
            color="#fff"
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
            onLongPress={() => Alert.alert('Go Back')}
          />
          <Text style={styles.headerText}>Profile</Text>
        </View>

        <View style={styles.profileImageWrapper}>
          <Image
            source={require('../assests/images/dr.jpg')}
            resizeMode="cover"
            style={styles.profileImage}
          />
          <Icon
            name="camera"
            size={20}
            color="#fff"
            style={styles.cameraIcon}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Input
            label="Email"
            placeholder="Enter Your Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formUser?.email}
            onChangeText={text =>
              setFormUser(prev => ({ ...prev, email: text }))
            }
            error={
              formUser?.email && !validateEmail(formUser?.email)
                ? 'Invalid Email'
                : null
            }
          />
          <Input
            label="Username"
            placeholder="Enter Your Name"
            value={formUser?.username}
            onChangeText={text =>
              setFormUser(prev => ({ ...prev, username: text }))
            }
          />
          <Input
            label="Password"
            placeholder="Enter Your Password"
            secureTextEntry
            value={formUser?.userCode}
            onChangeText={text =>
              setFormUser(prev => ({ ...prev, userCode: text }))
            }
          />
        </View>

        <Button
          title="Save Changes"
          containerStyle={[
            styles.updateButton,
            { opacity: isChanged() ? 1 : 0.5 },
          ]}
          textStyle={styles.buttonText}
          disabled={!isChanged()}
          onPress={handleSaveChanges}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#275EEB' },
  background: { flex: 1, alignItems: 'center' },
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#275EEB',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: 10,
  },
  backIcon: { position: 'absolute', top: 6, left: 10 },
  headerText: { fontSize: 30, color: 'white', fontWeight: '600' },

  profileImageWrapper: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: 'hidden',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: { width: '100%', height: '100%' },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 50,
  },

  inputWrapper: { width: '90%', marginTop: 20 },
  updateButton: { width: 150, backgroundColor: 'blue', marginBottom: 10 },
  buttonText: { fontSize: 20 },
});

export default Profile;
