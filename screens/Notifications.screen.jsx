import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../generalComponents/Header/Header';
import { headerHeight } from '../common/constants';

class Notifications extends React.Component {
  render() {
    return (
      <View style={style.container}>
        <Header {...this.props} />
        <View style={style.content}>
            {/* todo: list of messages */}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dog: state.dog.currentDog,
  };
};

export default connect(mapStateToProps)(Notifications);

const style = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flex: 1,
  },
  content:{
      top: headerHeight
  }
});
