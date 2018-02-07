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

class LoginForm extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md="12" id="loginContainer">
            <Form id="loginForm">
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
                  />
                </FormGroup>
                <Button color="primary">Login</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

render(<LoginForm />, document.getElementById("loginForm"));
