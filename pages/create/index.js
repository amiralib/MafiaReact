import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';

import { MAIN_COLOR, TERTIARY_COLOR, ADDITIONAL_ROLES, API_URL } from '../../lib/constants';

import styles from './styles';

export default function Create({ navigation }) {
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
    <ScrollView style={styles.createPage}>
      <GameForm navigation={navigation} />
    </ScrollView>
  );
}

function GameForm({ navigation }) {
  const [villCount, setVillCount] = useState(0);
  const [mafiaCount, setMafiaCount] = useState(0);

  const [addRoles, setAddRoles] = useState(new Set());
  const [mainRoles, setMainRoles] = useState(new Set(['Medic', 'Parity Cop']));

  const [name, setName] = useState('');

  return (
    <View>
      <PlayerName
        setName={setName}
      />
      <MainRoles
        villCount={villCount}
        setVillCount={setVillCount}
        mafiaCount={mafiaCount}
        setMafiaCount={setMafiaCount}
        roles={mainRoles}
        setRoles={setMainRoles}
      />
      <AdditionalRoles
        roles={addRoles}
        setRoles={setAddRoles}
      />
      <TouchableHighlight
        onPress={() => {
          const roomCode = generateCode();
          createRoom(roomCode, mainRoles, addRoles, mafiaCount, villCount, name, navigation);
        }}
        style={styles.submitButton}
      >
        <Text style={styles.submitText}>Create Game</Text>
      </TouchableHighlight>
    </View >
  );
}

function PlayerName({ setName }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionTop}>
        <Text style={styles.sectionHeader}>Player Information</Text>
      </View>
      <View style={styles.playerName}>
        <Text style={styles.playerNameLabel}>Enter your name:</Text>
        <TextInput
          style={styles.playerInput}
          onChangeText={name => setName(name)}
        />
      </View>
    </View>
  );
}

function PlayerCount({ setCount, count, player }) {
  return (
    <View style={styles.playerCount}>
      <Text style={styles.roleLabel}>{player}</Text>
      <Counter
        setCount={setCount}
        count={count}
      />
    </View>
  );
}

function Counter({ setCount, count }) {
  return (
    <View style={styles.counter}>
      <Icon
        name='minuscircleo'
        color={MAIN_COLOR}
        type='antdesign'
        onPress={() => {
          if (count > 0) {
            setCount(count - 1);
          }
        }}
        containerStyle={styles.plusMinus}
      />
      <Text style={styles.countText}>{count}</Text>
      <Icon
        name='pluscircleo'
        color={MAIN_COLOR}
        type='antdesign'
        onPress={() => setCount(count + 1)}
        containerStyle={styles.plusMinus}
      />
    </View>
  );
}

function MainRoles({ villCount, setVillCount, mafiaCount, setMafiaCount, roles, setRoles }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionTop}>
        <Text style={styles.sectionHeader}>Main Roles</Text>
      </View>
      <PlayerCount
        setCount={setVillCount}
        count={villCount}
        player={'Villagers'}
      />
      <PlayerCount
        setCount={setMafiaCount}
        count={mafiaCount}
        player={'Mafia'}
      />
      <PlayerOption
        type='Healer'
        options={['Medic', 'Prostitute']}
        roles={roles}
        setRoles={setRoles}
      />
      <PlayerOption
        type='Authority'
        options={['Parity Cop', 'Detective']}
        roles={roles}
        setRoles={setRoles}
      />
    </View>
  );
}

function PlayerOption({ type, options, roles, setRoles }) {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={styles.playerOption}>
      <Text style={styles.optionType}>{type}</Text>
      <View style={styles.switchOptions}>
        <Text style={styles.optionText}>{options[0]}</Text>
        <View style={styles.switch}>
          <Switch
            onValueChange={() => {
              if (isEnabled) {
                const updateRoles = new Set(roles);
                updateRoles.delete(options[1]);
                updateRoles.add(options[0]);
                setRoles(updateRoles);
              } else {
                const updateRoles = new Set(roles);
                updateRoles.delete(options[0]);
                updateRoles.add(options[1]);
                setRoles(updateRoles);
              }
              setIsEnabled(previousState => !previousState);
            }}
            value={isEnabled}
            thumbColor={MAIN_COLOR}
            trackColor={{ true: TERTIARY_COLOR, false: TERTIARY_COLOR }}
          />
        </View>
        <Text style={styles.optionText}>{options[1]}</Text>
      </View>
    </View>
  );
}

function AdditionalRoles({ roles, setRoles }) {
  const roleChecks = [];
  for (const [key, value] of Object.entries(ADDITIONAL_ROLES)) {
    roleChecks.push(
      <RoleCheck
        role={value.name}
        roles={roles}
        setRoles={setRoles}
      />
    );
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionTop}>
        <Text style={styles.sectionHeader}>Additional Roles</Text>
      </View>
      <>
        {roleChecks}
      </>
    </View>
  );
}

function RoleCheck({ role, roles, setRoles }) {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.roleCheck}>
      <Text style={styles.roleLabel}>{role}</Text>
      <CheckBox
        iconType='font-awesome'
        checkedIcon='square'
        uncheckedIcon='square-o'
        containerStyle={styles.checkbox}
        uncheckedColor={MAIN_COLOR}
        checkedColor={MAIN_COLOR}
        onPress={() => {
          if (!checked) {
            const newRoles = new Set(roles);
            newRoles.add(role);
            setRoles(newRoles);
          } else {
            const newRoles = new Set(roles);
            newRoles.delete(role);
            setRoles(newRoles);
          }
          setChecked(!checked);
        }}
        checked={checked}
      />
    </View>
  );
}

function generateCode() {
  const code = Math.floor(Math.random() * 1000000);
  return code.toString().padStart(6, '0');
}

function createRoom(code, mainRoles, addRoles, mafia_count, villager_count, player, navigation) {
  const roles = Array.from(mainRoles).concat(Array.from(addRoles));

  return fetch(API_URL + '/rooms', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      code,
      mafia_count,
      villager_count,
      roles,
      players: [{ name: player }]
    })
  })
    .then((response) => response.json())
    .then((data) => {
      if (data._id) {
        navigateRoom(navigation, data._id, code, [{ name: player }], player);
      } else {
        console.log(data);
      }
    })
    .catch((error) => console.error(error));
}

function navigateRoom(navigation, roomId, roomCode, players, player) {
  navigation.navigate('New Room', {
    roomCode,
    roomId,
    players,
    player
  });
}