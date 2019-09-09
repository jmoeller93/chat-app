import React, { Component } from "react";
import Chatkit from "@pusher/chatkit-client";
import MessageList from "../MessageList/MessageList";
import SendMessageForm from "../SendMessageForm/SendMessageForm";
import TypingIndicator from "../TypingIndicator/TypingIndicator";
import WhosOnlineList from "../WhosOnlineList/WhosOnlineList";
import "./styles.css";

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.sendTypingEvent = this.sendTypingEvent.bind(this);
  }

  sendTypingEvent(event) {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error("error", error));
    this.setState({
      chatInput: event.target.value
    });
  }

  sendMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    });
  }

  comonentDidMount() {
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
            newMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            },
            userStartedTyping: user => {
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
              });
            },
            userStoppedTyping: user => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                  username => username !== user.name
                )
              });
            },
            onPresenceChange: () => this.forceUpdate()
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
        <header>
          <h2>Chatly</h2>
        </header>
        <div>
          <aside>
            <h2>Who's online PLACEHOLDER</h2>
            <WhosOnlineList
              currentUser={this.state.currentUser}
              users={this.state.currentRoom.users}
            />
          </aside>
          <section>
            <MessageList messages={this.state.messages} />
            <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
            <SendMessageForm
              onSubmit={this.sendMessage}
              onChange={this.sendTypingEvent}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default ChatScreen;
