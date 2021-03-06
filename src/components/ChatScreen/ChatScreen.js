import Chatkit from "@pusher/chatkit-client";
import React, { Component } from "react";
import MessageList from "../MessageList/MessageList";
import SendMessageForm from "../SendMessageForm/SendMessageForm";
import TypingIndicator from "../TypingIndicator/TypingIndicator";
import WhosOnlineList from "../WhosOnlineList/WhosOnlineList";
import "./styles.css";

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentRoom: {},
      currentUser: {},
      usersWhoAreTyping: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.sendTypingEvent = this.sendTypingEvent.bind(this);
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
          roomId: "b795a669-5492-4cfe-928a-c4b00d0be4f3",
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            },
            onUserStartedTyping: user => {
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
              });
            },
            onUserStoppedTyping: user => {
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

  sendMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    });
  }

  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error("error", error));
  }

  render() {
    return (
      <div className="container">
        <div className="chatContainer">
          <aside className="whosOnlineListContainer">
            <h2>Who's online</h2>
            <WhosOnlineList
              currentUser={this.state.currentUser}
              users={this.state.currentRoom.users}
            />
          </aside>
          <section className="chatListContainer">
            <MessageList messages={this.state.messages} />
            <TypingIndicator
              usersWhoAreTyping={this.state.usersWhoAreTyping}
            ></TypingIndicator>
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
