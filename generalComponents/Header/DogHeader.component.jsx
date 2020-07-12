import * as React from 'react';
import { Avatar, Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { backgroundColor, headerHeight } from '../../common/constants';
import { API_BASE_URL } from '../../api/api';
import { connect } from 'react-redux';

class DogHeader extends React.Component {
  menuClicked = () => {
    console.log('in menu clicked in dog header');

    const { navigation, dog } = this.props;
    console.log(dog);
    navigation.openDrawer();
  };

  render() {
    const {image} = this.props.dog; 
    console.log(image);
    const dogImageUrl = `${API_BASE_URL}${image}`;
    console.log('avatar: ', dogImageUrl);
    return (
      <Appbar style={styles.top}>
        <Appbar.Action icon='menu' onPress={this.menuClicked} />
        <Avatar.Image
          style={styles.headerImg}
          size={100}
          source={{uri:`${dogImageUrl}`}}
        />
      </Appbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    dog: state.dog.currentDog,
  };
};
export default connect(mapStateToProps)(DogHeader);

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
