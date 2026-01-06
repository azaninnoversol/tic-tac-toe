import React from 'react';
import { Modal, View, TouchableWithoutFeedback, Pressable } from 'react-native';
import styles from './styles';

const CustomModal = ({
  visible = false,
  onClose,
  children,
  position = 'center',
  backdropOpacity = 0.5,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType={position === 'bottom' ? 'slide' : 'fade'}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={[
            styles.backdrop,
            { backgroundColor: `rgba(0,0,0,${backdropOpacity})` },
          ]}
        />
      </TouchableWithoutFeedback>

      <View
        style={[
          styles.container,
          position === 'bottom' && styles.bottomContainer,
        ]}
      >
        <Pressable style={styles.content}>{children}</Pressable>
      </View>
    </Modal>
  );
};

export default React.memo(CustomModal);
