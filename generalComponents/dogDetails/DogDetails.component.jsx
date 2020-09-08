import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API_INSTANCE } from '../../api/api';
import Spinner from './Spinner';
import { connect } from 'react-redux';
import { Button } from 'react-native-paper';

class DogDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.springValue = new Animated.Value(0.3);
  }
  componentDidMount() {
    this.spring();
  }
  componentWillUnmount(){
    console.log("im died");
  }

  spring = () => {
    this.springValue.setValue(0.3);
    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 1,
      tension: 1,
    }).start(() => this.spring());
  };

  dropFoodClicked = async () => {
    this.setState({ isLoading: true });
    const { token } = this.props.user.userDetails
    const res = await API_INSTANCE.dropFood(token, this.props.dog._id);
    if (res.data) {
      this.setState({ isLoading: false });
    }
  };

  render() {
    return this.state.isLoading ? (
     <Spinner />
    ) : (
      <View style={styles.container}>
        <Text style={styles.text} onPress={this.spring}>
          Drop Food
        </Text>
        <TouchableOpacity
          style={styles.animationContainer}
          onPress={this.dropFoodClicked}
        >
          <Animated.Image
            style={{
              borderRadius: 50,
              width: 227,
              height: 200,
              transform: [{ scale: this.springValue }],
            }}
            source={require('../../assets/pet05-512.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
AppRegistry.registerComponent('animations', () => DogDetails);
const mapStateToProps = (state) => {
  return {
    user: state.user,
    dog: state.dog.currentDog,
  };
};
export default connect(mapStateToProps)(DogDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    borderWidth: 5,
    borderColor: 'green',
    borderRadius: 100,
    width: 300,
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginVertical: 100,
    fontSize: 50,
    fontFamily: 'sans-serif',
    color: 'green',
  },
});
