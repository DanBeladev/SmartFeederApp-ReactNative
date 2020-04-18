import * as React from 'react';
import { Avatar, Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { backgroundColor, headerHeight } from '../../common/constants';

export default class DogHeader extends React.Component {
  menuClicked = () => {
    const { navigation } = this.props;
    navigation.openDrawer();
  };

  render() {
    return (
      <Appbar style={styles.top}>
        <Appbar.Action icon='menu' onPress={this.menuClicked} />
        <Avatar.Image
          style={styles.headerImg}
          size={100}
          source={require('../../assets/hand.png')}
        />
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
    height: headerHeight,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: backgroundColor,
  },
  headerImg: { position: 'absolute', left: '40%', bottom: -50 },
});