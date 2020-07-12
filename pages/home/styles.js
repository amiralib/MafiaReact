import { StyleSheet } from 'react-native';
import { MAIN_COLOR, SECONDARY_COLOR } from '../../lib/constants';

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR,
    alignItems: 'center'
  },
  titleView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appTitle: {
    color: MAIN_COLOR,
    fontSize: 30,
  },
  roomButtons: {
    height: 'auto',
    flex: 1,
  },
  roomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MAIN_COLOR,
    width: 200,
    height: 50,
    marginBottom: 10
  },
  roomButtonText: {
    color: SECONDARY_COLOR,
    fontSize: 20
  },
  mafiaIcon: {
    height: 200,
    width: 200
  }
});

export default styles;