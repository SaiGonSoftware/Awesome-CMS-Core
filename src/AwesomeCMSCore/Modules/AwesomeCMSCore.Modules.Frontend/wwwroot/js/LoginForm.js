import React, { Component } from "react";
import { render } from "react-dom";

class LoginForm extends Component {
  render() {
    return <p> Hello React project</p>;
  }
}

render(<LoginForm />, document.getElementById("loginForm"));
