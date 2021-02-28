import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
// @ts-ignore
import {name as appName} from './app.json';
import {Provider} from "react-redux";
import {store} from "./src/redux";
import React from "react";

const AppWrapper = () => (
  <Provider store={store}>
      <App/>
  </Provider>

)
AppRegistry.registerComponent(appName, () => AppWrapper);
