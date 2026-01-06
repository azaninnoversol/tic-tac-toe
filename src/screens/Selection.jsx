import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Selection() {
  return (
    <View style={[styles?.container]}>
      <View
        style={{
          backgroundColor: '#40529b',
          width: '60%',
          paddingTop: 10,
          paddingBottom: 10,
          borderRadius: 15,
          marginTop: 18,
        }}
      >
        <Text style={[styles?.text]}>Choose Your Side</Text>
      </View>
    </View>
  );
}

export default React.memo(Selection);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#275EEB',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    color: 'white',
    fontWeight: '800',
  },
});
