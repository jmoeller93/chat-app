import React, { Component } from "react";
import Chatkit from "@pusher/chatkit-client";

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {}
    };
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
        // console.log("currentUser", currentUser);
      })
      .catch(error => console.error("error", error));
  }

  render() {
    return (
      <div>
        <h1>Chat</h1>
      </div>
    );
  }
}

export default ChatScreen;
