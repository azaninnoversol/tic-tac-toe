import React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const Button = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  containerStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles?.button,
        disabled && styles?.disabledButton,
        containerStyle,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={'#fff'} />
      ) : (
        <Text style={[styles?.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(Button);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
