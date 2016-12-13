/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import WebSocketApp from './source/WebSocketApp';
// libraries import
import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

// The wrapper with the Provider
const App = () => (
  <WebSocketApp />
);

AppRegistry.registerComponent('react_native_websocket_test', () => App);
