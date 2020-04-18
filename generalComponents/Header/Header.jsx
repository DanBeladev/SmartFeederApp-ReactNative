import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { backgroundColor } from '../../common/constants';

export default class Header extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <Appbar style={styles.top}>
        <Appbar.Action icon='menu' onPress={() => navigation.openDrawer()} />
      </Appbar>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 70,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: backgroundColor,
  },
});
