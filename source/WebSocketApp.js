/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  // WebSocket
} from 'react-native';

export default class WebSocketApp extends Component {

  componentDidMount(){
    const ws = new WebSocket('ws://localhost:3000/cable');

    // let's try to be very basic here
    ws.onopen = () => {
      // connection opened
      console.log("I openend the connection without troubles!");

      // First step is to try subscribe to the proper channel

      // let subscribe_command = {"command":"subscribe","identifier":"{\"channel\":\"ConversationChannel\"}"}
      let subscribe_command = "{\"command\":\"subscribe\",\"identifier\":\"{\"channel\":\"ConversationChannel\"}\"}"

      ws.send(subscribe_command); // send a message
    };

    ws.onmessage = (e) => {
      console.log("A message was received");
      // a message was received
      console.log(e.data);
    };

    ws.onerror = (e) => {
      console.log("There has been an error");

      // an error occurred
      console.log(e.message);
    };

    ws.onclose = (e) => {
      // connection closed
      console.log("I'm closing it");

      console.log(e.code, e.reason);
    };

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('WebSocketApp', () => WebSocketApp);
