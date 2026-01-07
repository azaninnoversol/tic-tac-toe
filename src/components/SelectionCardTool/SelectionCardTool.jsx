import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

function SelectionCardTool({ image, isActive, onPress, type }) {
  return (
    <TouchableOpacity onPress={onPress} focusable={false}>
      <View
        style={{
          backgroundColor: isActive === type ? '#fff' : '#275EEB',
          padding: 10,
          width: 130,
          height: 130,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
        }}
      >
        <Image
          source={image}
          style={{ width: '80%', height: '80%', resizeMode: 'contain' }}
        />
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(SelectionCardTool);
