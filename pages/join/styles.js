import { StyleSheet } from 'react-native';

import { MAIN_COLOR, SECONDARY_COLOR } from '../../lib/constants';

const styles = StyleSheet.create({
  joinPage: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  codeInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  roomText: {
    flex: 1,
    color: MAIN_COLOR,
    fontSize: 15
  },
  playerName: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  playerInput: {
    flex: 0,
    borderColor: MAIN_COLOR,
    borderWidth: 1,
    paddingLeft: 5,
    color: MAIN_COLOR,
    fontSize: 15,
    width: 125
  },
  playerNameLabel: {
    flex: 1,
    color: MAIN_COLOR,
    fontSize: 15
  },
  codeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MAIN_COLOR,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  codeButtonText: {
    color: SECONDARY_COLOR,
    fontSize: 20
  },
});

export default styles;
