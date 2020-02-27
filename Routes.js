import {createStackNavigator} from '@react-navigation/stack';
import {createAppContainer} from 'react-navigation'
import Login from './screens/Login'
import SignIn from './screens/SignInScreen'

const screens = {
    Login: {
        screen: Login
    },
    SignIn: {
        screen: SignIn
    }
}
const HomeStack = createStackNavigator(screens);
export default createAppContainer(HomeStack)

