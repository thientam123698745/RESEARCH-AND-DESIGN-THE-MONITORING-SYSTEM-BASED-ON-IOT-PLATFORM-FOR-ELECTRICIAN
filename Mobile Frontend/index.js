/**
 * @format
 */
import {AppRegistry} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';

import {name as appName} from './app.json';
import {RootStore} from './src/store/configStore';
import App from 'components/main/App';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);
const RNRedux = () => {
  return (
    <Provider store={RootStore}>
      <App />
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => RNRedux);
