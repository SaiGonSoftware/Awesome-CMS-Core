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
import axios from "axios";
import AwesomeInput from "../Common/AwesomeInput";

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

    return axios({
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: "http://localhost:5000/connect/token",
      params: {
        username: this.state.username,
        password: this.state.password,
        grant_type: "password",
        scope: "offline_access"
      }
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error.response);
      });
  }

  onChange(e) {
    console.log(e.target.name);
    console.log(e.target.value);

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
                    required
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
                    required
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
