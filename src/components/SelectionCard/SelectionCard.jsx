import React from 'react';
import { Image, Text, View } from 'react-native';

const SelectionCard = ({ image, text = '', styles }) => {
  return (
    <View style={styles?.card}>
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} />
      </View>
      <Text style={styles?.cardText} ellipsizeMode="tail" numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
};

export default React.memo(SelectionCard);
