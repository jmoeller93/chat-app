import React from "react";

class WhosOnlineList extends React.Component {
  render() {
    if (this.props.user) {
      return (
        <ul>
          {this.props.users.map((user, index) => {
            return (
              <li>
                {user.name} ({user.presence.state})
              </li>
            );
          })}
        </ul>
      );
    } else {
      return <p>Loading..</p>;
    }
  }
}

export default WhosOnlineList;
