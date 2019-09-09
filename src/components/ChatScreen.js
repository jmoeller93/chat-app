import React, { Component } from "react";
import Chatkit from "@pusher/chatkit-client";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: []
    };
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    });
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:7015ce71-fe2f-46d6-8679-05fa496b1d46",
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: "http://localhost:3001/authenticate"
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });
        return currentUser.subscribeToRoom({
          roomId: "c9b32e7e-55ee-4f0d-a418-9669391586c9",
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            }
          }
        });
      })
      .then(currentRoom => {
        this.setState({ currentRoom });
      })
      .catch(error => console.error("error", error));
  }

  render() {
    return (
      <div>
        <h1>Chat</h1>
        <MessageList messages={this.state.messages}></MessageList>
        <SendMessageForm onSubmit={this.sendMessage} onChange />
      </div>
    );
  }
}

export default ChatScreen;
