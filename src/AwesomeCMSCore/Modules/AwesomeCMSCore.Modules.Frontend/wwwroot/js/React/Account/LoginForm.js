import React, { Component } from "react";
import { render } from "react-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import AwesomeInput from "../Common/AwesomeInput";
import "whatwg-fetch";
import { fetch2 } from "./../Helper/Fetch2";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      loading: false,
      canSubmit: false
    };
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  login(event) {
    event.preventDefault();
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new FormData(
        this.state.username,
        this.state.password,
        "password",
        "offline_access"
      )
    };
    fetch2("http://localhost:5000/connect/token", options).then(response =>
      console.log(response.json())
    );
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md="12" id="loginContainer">
            <Form id="loginForm" onSubmit={this.login.bind(this)}>
              <div className="panel-heading">
                <h3 className="panel-title"> Admin portal </h3>
              </div>
              <div id="loginFormContent">
                <FormGroup>
                  <Label for="username" hidden>
                    Email
                  </Label>
                  <AwesomeInput
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    required="required"
                    value={this.state.username}
                    onChange={username => this.onChange(username)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password" hidden>
                    Password
                  </Label>
                  <AwesomeInput
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    required="required"
                    value={this.state.password}
                    onChange={username => this.onChange(username)}
                  />
                </FormGroup>
                <Button color="primary" type="submit">
                  Login
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

render(<LoginForm />, document.getElementById("loginForm"));
