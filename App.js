import 'react-native-gesture-handler';
import React from 'react';
import { Provider as PaperProvider} from 'react-native-paper';
import { Provider} from 'react-redux';
import store from './store';
import Navigator from './Navigator';


export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
      <Navigator/>
      </PaperProvider>
    </Provider>
  );
}
