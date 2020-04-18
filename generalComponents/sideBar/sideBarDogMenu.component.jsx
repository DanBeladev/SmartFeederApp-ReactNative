import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { signOut } from '../../actions/usersActions';

class DrawerContent extends Component {
  render() {
    return (
      <DrawerContentScrollView {...this.props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection} style={{ alignSelf: 'center' }}>
            <Avatar.Image
              source={require('../../assets/hand.png')}
              size={120}
            />
            <Title style={styles.title}>Nala</Title>
            <Caption style={styles.caption}>Border Colley</Caption>
            <Caption style={styles.caption}>4 years@ Female</Caption>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name='dog' color={color} size={size} />
              )}
              label='Dog'
              onPress={() => {
                this.props.navigation.navigate('DogDetails');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name='chart-line'
                  color={color}
                  size={size}
                />
              )}
              label='Statistics'
              onPress={() => {
                console.log('Statistics');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name='folder-text'
                  color={color}
                  size={size}
                />
              )}
              label='Hisunim'
              onPress={() => {
                this.props.navigation.navigate('Hisunim');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name='bone' color={color} size={size} />
              )}
              label='How Much Left?'
              onPress={() => {
                console.log('How Much Left?');
              }}
            />
          </Drawer.Section>
          <Drawer.Section>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name='volume-high'
                  color={color}
                  size={size}
                />
              )}
              label='Make Noise'
              onPress={() => {
                console.log('Make NOISE');
              }}
            />
          </Drawer.Section>
          <Drawer.Section>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name='cogs' color={color} size={size} />
              )}
              label='Settings'
              onPress={() => {
                console.log('Settings');
              }}
            />
          </Drawer.Section>
          <Drawer.Section>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name='home' color={color} size={size} />
              )}
              label='Home'
              onPress={() => {
                this.props.navigation.jumpTo('Home');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => {
      dispatch(signOut());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});