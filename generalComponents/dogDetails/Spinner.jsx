import React from 'react';
import { StyleSheet,View } from 'react-native';
import BouncingPreloader from 'react-native-bouncing-preloader';

// or just give icons
export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <BouncingPreloader
          icons={[
            require('../../assets/bone-icon.png'),
            require('../../assets/meat.png'),
            require('../../assets/chick.png'),
            require('../../assets/food.png'),
          ]}
          leftRotation='-680deg'
          rightRotation='360deg'
          leftDistance={-180}
          rightDistance={-270}
          speed={1200}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
