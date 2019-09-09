import React, { Component } from "react";

class SendMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
    this.setState({ text: "" });
  }

  onChange(e) {
    this.setState({ text: e.target.value });
    // Evertime updated... -> ChatScreen -> SendMessageForm -> OnChange
    this.props.onChange();
  }

  render() {
    return (
      <div>
        <div>
          <h2>Type a message here then hit ENTER</h2>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="What is your text?"
              onChange={this.onChange}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default SendMessageForm;
