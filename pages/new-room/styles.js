import { StyleSheet } from 'react-native';
import { MAIN_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../lib/constants';

const styles = StyleSheet.create({
  newRoomPage: {
    backgroundColor: SECONDARY_COLOR
  },
  playerListing: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderColor: TERTIARY_COLOR,
    borderBottomWidth: 5
  },
  playerName: {
    color: MAIN_COLOR,
    fontSize: 20
  },
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MAIN_COLOR,
    height: 50
  },
  startText: {
    color: SECONDARY_COLOR,
    fontSize: 17
  },
  createGame: {
    borderColor: TERTIARY_COLOR,
    marginTop: 5
  }
});

export default styles;