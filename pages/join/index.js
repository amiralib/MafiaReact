import React, { useState } from 'react';
import { Text, View, TouchableHighlight, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

import { API_URL } from '../../lib/constants';

import styles from './styles';

export default function Join({ navigation }) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        style={{ paddingLeft: 10 }}
        onPress={navigation.goBack}
      >
        <Icon type='antdesign' name='arrowleft' />
      </TouchableOpacity>
    )
  });

  return (
    <View style={styles.joinPage}>
      <PlayerName setName={setName} />
      <CodeInput setCode={setCode} />
      <TouchableHighlight
        onPress={() => getRoom(code, name, navigation)}
        style={styles.codeButton}
      >
        <Text style={styles.codeButtonText}>Join Game</Text>
      </TouchableHighlight>
    </View>
  );
}

function PlayerName({ setName }) {
  return (
    <View style={styles.playerName}>
      <Text style={styles.playerNameLabel}>Enter your name:</Text>
      <TextInput
        style={styles.playerInput}
        onChangeText={name => setName(name)}
      />
    </View>
  );
}

function CodeInput({ setCode }) {
  return (
    <View style={styles.codeInput}>
      <Text style={styles.roomText}>Enter room code to join:</Text>
      <TextInput
        onChangeText={code => setCode(code)}
        style={styles.playerInput}
      />
    </View>
  );
}

function getRoom(code, player, navigation) {
  fetch(API_URL + '/rooms/code/' + code)
    .then(res => res.json())
    .then(data => {
      if (data) {
        if (data.players.map(player => player.name).includes(player)) {
          Alert.alert('Name Error', 'The entered name is already taken');
        } else {
          joinRoom(code, data._id, player, data.players, navigation);
        }
      } else {
        Alert.alert('Code Error', 'The entered room code does not exist');
      }
    })
    .catch(err => console.log(err));
}

function joinRoom(roomCode, roomId, player, players, navigation) {
  fetch(API_URL + '/rooms/players/' + roomId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      player
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        console.log(data);
        navigation.navigate('New Room', {
          roomCode,
          roomId,
          players: players.concat([{ name: player }]),
          player
        });
      } else {
        console.log(data);
      }
    })
    .catch(err => console.log(err));
}