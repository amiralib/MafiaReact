import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, BackHandler, TouchableHighlight, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

import { API_URL } from '../../lib/constants';

import styles from './styles';

export default function NewRoom({ route, navigation }) {
  const { roomCode } = route.params;
  const { roomId } = route.params;
  const { players } = route.params;
  const { player } = route.params;
  const [gamePlayers, setGamePlayers] = useState(players);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => backAction(roomId, player)
    );

    return () => backHandler.remove();
  }, []);

  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        style={{ paddingLeft: 10 }}
        onPress={() => {
          navigation.goBack();
          backAction(roomId, player);
        }}
      >
        <Icon type='antdesign' name='arrowleft' />
      </TouchableOpacity>
    )
  });

  navigation.setOptions({ title: 'Room ' + roomCode });

  useEffect(() => {
    const interval = setInterval(() => {
      getPlayers(roomId, setGamePlayers);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.newRoomPage}>
      <View>{
        gamePlayers.map(player => {
          return (
            <View style={styles.playerListing}>
              <Text style={styles.playerName}>{player.name}</Text>
            </View>
          );
        })
      }</View>
      <View style={styles.createGame}>
        <TouchableHighlight
          onPress={() => {
            fetch(API_URL + '/rooms/' + roomId)
              .then(res => res.json())
              .then(data => {
                const roles = getRandomRoles(data.roles, data.mafia_count, data.villager_count);
                if (data.players.length === roles.length) {
                  setRoles(roles, data.players, roomId, player);
                } else {
                  Alert.alert('', 'Not enough players have joined the game');
                }
              })
              .catch(err => console.log(err));
          }}
          style={styles.startButton}
        >
          <Text style={styles.startText}>Start Game</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}

function getPlayers(roomId, setPlayers) {
  fetch(API_URL + '/rooms/' + roomId)
    .then(response => response.json())
    .then(data => setPlayers(data.players))
    .catch(err => console.log(err));
}

function backAction(roomId, player) {
  fetch(API_URL + '/rooms/players/' + roomId, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      player: player
    })
  });

  return false;
}

function getRandomRoles(roles, mafiaCount, villCount) {
  const mafia = new Array(mafiaCount).fill('Mafia');
  const villagers = new Array(villCount).fill('Villager');
  const allRoles = roles.concat(mafia, villagers);

  for (let i = allRoles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = allRoles[i];
    allRoles[i] = allRoles[j];
    allRoles[j] = temp;
  }

  return allRoles;
}

function setRoles(roles, players, roomId, playerName) {
  players.forEach((player, index) => {
    fetch(API_URL + '/rooms/players/role/' + roomId, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: player.name,
        role: roles[index]
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          notifyRoles(players, roles, playerName);
        } else {
          console.log(data);
        }
      })
      .catch(err => console.log(err));
  });
}

function notifyRoles(players, roles, playerName) {
  players.forEach((player, index) => {
    if (player.name === playerName) {
      Alert.alert('Game Role', 'Your role is ' + roles[index]);
    }
  });
}