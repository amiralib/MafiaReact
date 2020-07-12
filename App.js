import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/home';
import Join from './pages/join';
import Create from './pages/create';
import NewRoom from './pages/new-room';

import { MAIN_COLOR, SECONDARY_COLOR } from './lib/constants';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
          options={setHeaderOptions('Mafia Simulator')}
        />
        <Stack.Screen
          name='Join'
          component={Join}
          options={setHeaderOptions('Join Room')}
        />
        <Stack.Screen
          name='Create'
          component={Create}
          options={setHeaderOptions('Create Room')}
        />
        <Stack.Screen
          name='New Room'
          component={NewRoom}
          options={setHeaderOptions('')}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function setHeaderOptions(title) {
  const headerStyle = {
    backgroundColor: MAIN_COLOR
  };

  const headerTitleStyle = {
    color: SECONDARY_COLOR,
    alignSelf: 'center'
  };

  const headerTitleContainerStyle = {
    left: 0
  };

  return ({
    title,
    headerStyle,
    headerTitleStyle,
    headerTitleContainerStyle
  });
}