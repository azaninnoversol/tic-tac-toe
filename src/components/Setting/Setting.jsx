import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomModal from '../CustomModal/CustomModal';
import Button from '../Button/Button';
import { useAppContext } from '../../context-api/AppContext';

function Setting({ navigation }) {
  const { logout } = useAppContext();
  const [settingModalOpen, setSettingModalOpen] = React.useState(false);
  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const handleLogut = async () => {
    setIsOpenModal(false);
    await logout();
  };
  return (
    <View>
      <Icon
        name="setting"
        size={50}
        color="#fff"
        onPress={() => setSettingModalOpen(true)}
        style={{ position: 'absolute', right: 10, top: 10, zIndex: 30 }}
      />

      <CustomModal
        position="bottom"
        visible={settingModalOpen}
        onClose={() => setSettingModalOpen(false)}
      >
        <View
          style={{
            width: '100%',
            height: 110,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Button
            title={'Profile'}
            onPress={() => {
              setSettingModalOpen(false);
              navigation?.navigate('Profile');
            }}
            containerStyle={{
              backgroundColor: '#2C53B7',
              width: '100%',
              alignItems: 'center',
            }}
          />

          <Button
            title={'Logout'}
            onPress={() => {
              setIsOpenModal(true);
              setSettingModalOpen(false);
            }}
            containerStyle={{
              backgroundColor: '#0f38a1ff',
              width: '100%',
              alignItems: 'center',
              marginTop: 10,
            }}
          />
        </View>
      </CustomModal>

      <CustomModal visible={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Signout</Text>
        <Text style={{ marginVertical: 10 }}>Do You Want To Logout?</Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'center',
          }}
        >
          <Button
            title="Yes"
            onPress={() => handleLogut()}
            containerStyle={{
              marginBottom: 10,
              backgroundColor: 'red',
              width: 60,
            }}
          />

          <Button
            title="No"
            onPress={() => setIsOpenModal(false)}
            containerStyle={{
              width: 60,
              marginBottom: 10,
            }}
          />
        </View>
      </CustomModal>
    </View>
  );
}

export default React.memo(Setting);
