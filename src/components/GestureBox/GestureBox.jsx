import React from 'react';
import { View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';

function GestureBox() {
  const onGestureEvent = event => {
    console.log('Gesture:', event.nativeEvent);
  };

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <View style={{ width: 150, height: 150, backgroundColor: 'tomato' }} />
    </PanGestureHandler>
  );
}

export default React.memo(GestureBox);
