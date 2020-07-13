import React from 'react';
import { headerHeight } from '../../common/constants';
import { AppRegistry, StyleSheet, Text, View, Animated } from 'react-native';

export default class DogDetails extends React.Component {
  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(0.3);
  }
  componentDidMount() {
    this.spring();
  }

  spring = () => {
    this.springValue.setValue(0.3);
    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 1,
      tension: 1,
    }).start(() => this.spring());
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text} onPress={this.spring}>
          Drop Food
        </Text>
        <View style={styles.animationContainer}>
          <Animated.Image
            style={{
              borderRadius: 50,
              width: 227,
              height: 200,
              transform: [{ scale: this.springValue }],
            }}
            source={require('../../assets/pet05-512.png')}
          />
        </View>
      </View>
    );
  }
}
AppRegistry.registerComponent('animations', () => DogDetails);

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
    fontFamily:'sans-serif',
    color:'green'
  },
});
