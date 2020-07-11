import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { signOut } from '../../actions/usersActions';
import { connect } from 'react-redux';
 class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.items = [
      {
        navOptionThumb: 'camera',
        navOptionName: 'Home',
        screenToNavigate: 'home',
        fireFunction: this.home,
      },
      {
        navOptionThumb: 'image',
        navOptionName: 'Second Screen',
        screenToNavigate: 'test',
        fireFunction: this.second,
      },
      {
        navOptionThumb: 'build',
        navOptionName: 'Logout',
        screenToNavigate: 'login',
        fireFunction: this.logoutHandler,
      },
    ];
  }
  home = (screenToNavigate) => {
    this.props.navigation.jumpTo('Home');
  };

  second = (screenToNavigate) => {
    this.props.navigation.jumpTo('Fucker');
  };

  logoutHandler = (screenToNavigate) => {
    firebase
      .auth()
      .signOut()
      .then(() => this.props.Logout())
      .catch((err) => console.log('logout failed - ', err));
  };

  render() {
    return (
      <View style={styles.sideMenuContainer}>
        {/*Top Large Image */}
        <Image
          source={require('../../assets/hand.png')}
          style={styles.sideMenuProfileIcon}
        />
        {/*Divider between Top Image and Sidebar Option*/}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 15,
          }}
        />
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{ width: '100%' }}>
          {this.items.map((item, key) => (
            <TouchableOpacity
              onPress={() => item.fireFunction(item.screenToNavigate)}
              key={key}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: 10,
                  paddingBottom: 10,
                  backgroundColor:
                    global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
                }}
              >
                <View style={{ marginRight: 10, marginLeft: 20 }}>
                  <Icon name={item.navOptionThumb} size={25} color='#808080' />
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    color: global.currentScreenIndex === key ? 'red' : 'black',
                  }}
                >
                  {item.navOptionName}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => {
      dispatch(signOut());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  sideMenuProfileIcon: {
    // resizeMode: 'center',
    width: 150,
    height: 150,
    marginTop: 20,
    borderRadius: 150 / 2,
    backgroundColor: 'black',
  },
});
