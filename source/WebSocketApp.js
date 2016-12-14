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
  Button,
  // WebSocket
} from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';

let ws;

export default class WebSocketApp extends Component {

  constructor(props) {
    super(props)
    this.state = {messages: []};
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount(){
    // let's try to be very basic here
  }

  _openWebSocket(){
    ws = new WebSocket('ws://localhost:3000/cable');

    ws.onopen = () => {
      // connection opened
      console.log("I openend the connection without troubles!");

      // First step is to try subscribe to the proper channel

      let payload = {
        command: 'subscribe',
        identifier: JSON.stringify({ channel: 'ConversationChannel' }),
        // data: JSON.stringify({ to: 'user', message: 'hi', action: 'chat' }),
      }

      let subscribe_command = JSON.stringify(payload)
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

  _closeWebSocket(){
    console.log("I'm closing the websocket");

    ws.close()
  }

  onSend(messages = []) {
    console.log("I'm trying to speak now!");
    /*

     OK:
    (command.speak)
    ({"message"=>[{"name"=>"conversation_id", "value"=>"1"}, {"name"=>"user_id", "value"=>"1"}, {"name"=>"body", "value"=>"test"}]})

     NOT OK:
    (command.message)
    ({"message"=>[{"name"=>"conversation_id", "value"=>2}, {"name"=>"user_id", "value"=>3}, {"name"=>"body", "value"=>"Test"}]})

    */
    let conversation_id = 2
    let user_id = 3

    let payload = {
      command: 'message',
      identifier: JSON.stringify({ channel: 'ConversationChannel' }),
      data: JSON.stringify({message: [
        {name:"conversation_id", value: conversation_id.toString()},
        {name:"user_id", value: user_id.toString()},
        {name:"body", value:messages[0].text},
      ]}),
    }

    let speak_command = JSON.stringify(payload)
    ws.send(speak_command); // send a message

    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  // onReceive(text) {
  //   this.setState((previousState) => {
  //     return {
  //       messages: GiftedChat.append(previousState.messages, {
  //         _id: Math.round(Math.random() * 1000000),
  //         text: text,
  //         createdAt: new Date(),
  //         user: {
  //           _id: 2,
  //           name: 'React Native',
  //           // avatar: 'https://facebook.github.io/react/img/logo_og.png',
  //         },
  //       }),
  //     };
  //   });
  // }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: "row", flex:0.2, alignItems: "center", justifyContent: "center"}}>
          <Button
            onPress={() => this._openWebSocket()}
            title="Open Websocket"
          />
          <Button
            onPress={() => this._closeWebSocket()}
            title="Close Websocket"
          />
        </View>
        <View style={{backgroundColor:"coral", flex:0.8}}>
          <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            user={{
              _id: 3,
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
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
