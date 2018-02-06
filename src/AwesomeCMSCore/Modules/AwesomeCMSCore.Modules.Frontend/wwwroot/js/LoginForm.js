import React, { Component } from "react";
import { render } from "react-dom";
import { Alert } from 'react-bootstrap';
class LoginForm extends Component {
  render() {
    return (
      <Alert bsStyle="warning">
        <strong>Holy guacamole!</strong> Best check yo self, you're not looking
        too good.
      </Alert>
    );
  }
}

render(<LoginForm />, document.getElementById("loginForm"));
