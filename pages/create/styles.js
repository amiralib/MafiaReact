import { StyleSheet } from 'react-native';
import { MAIN_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../lib/constants';

const styles = StyleSheet.create({
  createPage: {
    flex: 1,
    backgroundColor: SECONDARY_COLOR
  },
  playerCount: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center'
  },
  roleLabel: {
    flex: 1,
    color: MAIN_COLOR,
    fontSize: 15
  },
  setting: {
    backgroundColor: 'grey',
    borderRadius: 10
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  countText: {
    flex: 0,
    color: MAIN_COLOR,
    fontSize: 20,
    alignSelf: 'flex-end',
    width: 25,
    textAlign: 'center'
  },
  plusMinus: {
    paddingHorizontal: 10
  },
  section: {
    paddingBottom: 20
  },
  sectionTop: {
    backgroundColor: TERTIARY_COLOR,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionHeader: {
    color: MAIN_COLOR,
    fontSize: 17
  },
  checkbox: {
    flex: 0
  },
  roleCheck: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  switchOptions: {
    flexDirection: 'row',
    flex: 0,
    alignItems: 'center'
  },
  playerOption: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center'
  },
  optionType: {
    flex: 1,
    color: MAIN_COLOR,
    fontSize: 15
  },
  optionText: {
    color: MAIN_COLOR,
    fontSize: 15,
    alignSelf: 'center'
  },
  switch: {
    paddingHorizontal: 10,
    alignSelf: 'center'
  },
  submitText: {
    color: SECONDARY_COLOR,
    fontSize: 17
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MAIN_COLOR,
    height: 50
  },
  playerName: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  playerInput: {
    flex: 0,
    borderBottomColor: MAIN_COLOR,
    borderBottomWidth: 1,
    color: MAIN_COLOR,
    fontSize: 15,
    width: 150
  },
  playerNameLabel: {
    flex: 1,
    color: MAIN_COLOR,
    fontSize: 15
  }
});

export default styles;