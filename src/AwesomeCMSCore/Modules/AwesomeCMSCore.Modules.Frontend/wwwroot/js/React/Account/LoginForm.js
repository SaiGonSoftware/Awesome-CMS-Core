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
import Formsy from "formsy-react";
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
    console.log(this.state.username);
    console.log(this.state.password);
    /*  return axios({
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
      }); */
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md="12" id="loginContainer">
            <Formsy
              id="loginForm"
              onValidSubmit={this.login}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
            >
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
                  />
                </FormGroup>
                <Button
                  color="primary"
                  type="submit"
                  disabled={!this.state.canSubmit}
                >
                  Login
                </Button>
              </div>
            </Formsy>
          </Col>
        </Row>
      </Container>
    );
  }
}

render(<LoginForm />, document.getElementById("loginForm"));
