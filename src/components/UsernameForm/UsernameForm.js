import React, { Component } from "react";
// import "./main.scss";
// import "./util.scss";
// import image from "../../images/img-01.png";
// import * as Icons from "@fortawesome/free-brands-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class UsernameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  }

  onChange(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt></div>

            <form
              className="login100-form validate-form"
              onSubmit={this.onSubmit}
            >
              <span className="login100-form-title">
                What is your username?
              </span>

              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className="input100"
                  onChange={this.onChange}
                  type="text"
                  placeholder="Your full name"
                ></input>
                <span className="focus-input100"></span>
                <span className="symbol-input100"></span>
              </div>

              <div className="container-login100-form-btn">
                {/* <input type="submit" /> */}

                <button className="login100-form-btn">Login</button>
              </div>

              <div className="text-center p-t-12">
                <a className="txt2" href="#"></a>
              </div>

              <div className="text-center p-t-136">
                <a className="txt2" href="#">
                  <i
                    className="fa fa-long-arrow-right m-l-5"
                    aria-hidden="true"
                  ></i>
                </a>
              </div>
            </form>
          </div>
        </div>

        {/* <div>
          <h2>What is your username?</h2>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="Your full name"
              onChange={this.onChange}
            />
            <input type="submit" />
          </form>
        </div> */}
      </div>
    );
  }
}

export default UsernameForm;
