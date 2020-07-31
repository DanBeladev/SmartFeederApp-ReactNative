import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  Caption,
  Drawer,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { signOut } from '../../actions/usersActions';

class DrawerContent extends Component{
render(){
  const {userDetails} = this.props.user;
  return (
    <DrawerContentScrollView {...this.props}>
      <View
        style={
          styles.drawerContent
        }
      >
        <View style={styles.userInfoSection} style={{alignSelf:'center'}}>
          <Avatar.Image
            source={require('../../assets/hand.png')}
            size={120}
          />
          <Title style={styles.title}>{userDetails.username}</Title>
          <Caption style={styles.caption}>{userDetails.email}</Caption>
          <Caption style={styles.caption}>{userDetails.phone}</Caption>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Profile"
            onPress={() => {this.props.navigation.jumpTo('Main')}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="tune" color={color} size={size} />
            )}
            label="Preferences"
            onPress={() => {this.props.navigation.jumpTo('Fucker')}}
          />
        </Drawer.Section>

        <Drawer.Section>
        <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="exit-to-app"
                color={color}
                size={size}
              />
            )}
            label="Logout"
            onPress={() => {this.props.Logout();}}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => {
      dispatch(signOut());
    }
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