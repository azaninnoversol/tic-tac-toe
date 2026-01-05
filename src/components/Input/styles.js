import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    marginBottom: 6,
    fontSize: 14,
    color: '#fff',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },

  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#000',
  },

  eye: {
    fontSize: 18,
  },

  errorBorder: {
    borderColor: 'red',
  },

  errorText: {
    marginTop: 4,
    color: 'red',
    fontSize: 12,
  },
});
