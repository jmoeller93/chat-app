import React, { Component } from "react";
import UsernameForm from "./components/UsernameForm";

class App extends Component {
  render() {
    return (
      <UsernameForm onSubmit={username => alert(username)}>/</UsernameForm>
    );
  }
}

export default App;
