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
    this.state = {
      username: "",
      password: "",
      error: "",
      loading: false
    };
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  login(event) {
    event.preventDefault();

    let data = {
      username: this.state.username,
      password: this.state.password,
      grant_type: "password",
      scope: "offline_access"
    };

    let config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5000/connect/token");
    var dataa = {
      username: this.state.username,
      password: this.state.password,
      grant_type: "password",
      // specify the resource, to match the audience in the jwt bearer middleware
      resource: "http://localhost:5000/",
      // offline_access: indicate refresh token is required
      // profile: include custom fields
      // email: include email address
      scope: "offline_access"
    };
    var body = "";
    for (var key in dataa) {
      if (body.length) {
        body += "&";
      }
      body += key + "=";
      body += encodeURIComponent(data[key]);
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(body);
    /* axios
      .post("http://localhost:5000/connect/token", data, config)
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
            <Form id="loginForm" onSubmit={this.login.bind(this)}>
              <div className="panel-heading">
                <h3 className="panel-title"> Admin portal </h3>
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
                    value={this.state.username}
                    onChange={username => this.onChange(username)}
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
