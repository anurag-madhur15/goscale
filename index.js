/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';

import configStore from './src/configStore';

const store = configStore();

const GoScale = () => 
    <Provider store={store}>
        <App />
    </Provider>
AppRegistry.registerComponent(appName, () => GoScale);
