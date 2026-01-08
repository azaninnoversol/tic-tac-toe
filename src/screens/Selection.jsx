import React, { useState } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, View } from 'react-native';
import SelectionCard from '../components/SelectionCard/SelectionCard';
import SelectionCardTool from '../components/SelectionCardTool/SelectionCardTool';
import { selectionTools } from '../utils/helper';
import Button from '../components/Button/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

function Selection() {
  const navigation = useNavigation();
  const [isActive, setIsActive] = useState(null);

  const selectTool = type => {
    setIsActive(prev => (prev === type ? null : type));
  };

  return (
    <View style={[styles?.container]}>
      <ImageBackground
        source={require('../assests/images/tic-tac-toe.png')}
        style={styles?.background}
      >
        <Icon
          name="left"
          size={30}
          color="#fff"
          style={{ position: 'absolute', top: 35, left: 10 }}
          onPress={() => navigation.goBack()}
          onLongPress={() => Alert.alert('Go Back')}
        />

        <View
          style={{
            backgroundColor: '#40529b',
            width: '60%',
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 15,
            marginTop: 18,
            filter: 'drop-shadow(1px 1px 18px black)',
          }}
        >
          <Text style={[styles?.text]}>Choose Your Side</Text>
        </View>

        <View style={styles?.cardWrapper}>
          <SelectionCard
            image={require('../assests/images/chris.jpg')}
            text="You"
            styles={styles}
          />
          <Text style={[styles?.cardWrapperVs]}>vs</Text>
          <SelectionCard
            image={require('../assests/images/avatar.png')}
            text="Computer"
            styles={styles}
          />
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 30,
            backgroundColor: '#231465',
            padding: 30,
            paddingLeft: 35,
            paddingRight: 35,
            marginTop: 30,
            borderRadius: 20,
          }}
        >
          {selectionTools?.map((single, idx) => (
            <SelectionCardTool
              key={idx || single?.type}
              image={single?.image}
              type={single?.type}
              isActive={isActive}
              onPress={() => selectTool(single?.type)}
            />
          ))}
        </View>

        <Button
          title={'Start Game'}
          disabled={!isActive}
          containerStyle={{
            backgroundColor: '#114adbff',
            width: '40%',
            alignItems: 'center',
            marginTop: 30,
          }}
          onPress={() =>
            navigation?.navigate('Game', {
              name: isActive,
            })
          }
        />
      </ImageBackground>
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
    justifyContent: 'start',
    position: 'relative',
  },
  background: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    position: 'relative',
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    color: 'white',
    fontWeight: '800',
  },
  card: {
    backgroundColor: '#231465',
    height: 200,
    width: 150,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 40,
  },
  cardWrapperVs: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    backgroundColor: '#40529b',
    width: 35,
    height: 35,
    borderRadius: 100,
    fontWeight: '600',
    paddingTop: 2,
  },
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cardText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    writingDirection: 'auto',
    paddingTop: 8,
    width: 100,
    textAlign: 'center',
  },
});
