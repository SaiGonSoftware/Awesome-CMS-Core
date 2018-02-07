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

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", error: "", loading: false };
  }

  login(event) {
    event.preventDefault();
    console.log(this.state.username);
    console.log(this.state.password);
    let data = JSON.stringify({
      username: this.state.username,
      password: this.state.password
    });

    axios.post("https://localhost:5000//connect/token", data, {
      headers: {
        grant_type: "password",
        scope: "offline_access",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md="12" id="loginContainer">
            <Form id="loginForm" onSubmit={this.login.bind(this)}>
              <div className="panel-heading">
                <h3 className="panel-title">Admin portal</h3>
              </div>
              <div id="loginFormContent">
                <FormGroup>
                  <Label for="username" hidden>
                    Email
                  </Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    onChange={username => this.setState({ username })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password" hidden>
                    Password
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={password => this.setState({ password })}
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
