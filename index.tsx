import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
// @ts-ignore
import {name as appName} from './app.json';
import {Provider as StoreProvider} from "react-redux";
import {Provider as PaperProvider} from "react-native-paper";
import {store} from "./src/redux";
import React from "react";

const AppWrapper = () => (
  <StoreProvider store={store}>
      <PaperProvider>
          <App/>
      </PaperProvider>
  </StoreProvider>

)
AppRegistry.registerComponent(appName, () => AppWrapper);
