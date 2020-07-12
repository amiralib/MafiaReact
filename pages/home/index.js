import React from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';

import styles from './styles';

export default function Home({ navigation }) {
  return (
    <View style={styles.homePage}>
      <View style={styles.titleView}>
        <Image
          source={require('../../src/images/mafia.png')}
          style={styles.mafiaIcon}
        />
      </View>
      <RoomButtons navigation={navigation} />
    </View>
  );
}

function RoomButtons({ navigation }) {
  return (
    <View style={styles.roomButtons}>
      <TouchableHighlight onPress={() => navigation.navigate('Join')} style={styles.roomButton}>
        <Text style={styles.roomButtonText}>Join Room</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => navigation.navigate('Create')} style={styles.roomButton}>
        <Text style={styles.roomButtonText}>Create Room</Text>
      </TouchableHighlight>
    </View>
  );
}