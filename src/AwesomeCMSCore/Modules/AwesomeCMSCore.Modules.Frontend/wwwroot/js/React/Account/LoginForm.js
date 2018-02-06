import React, { Component } from "react";
import { render } from "react-dom";
import {
  FormControl,
  FormGroup,
  Grid,
  Row,
  Col,
  Button
} from "react-bootstrap";

class LoginForm extends Component {
  render() {
    return (
      <form>
        <Grid>
          <Row className="show-grid" id={loginForm}>
            <Col xs={12} md={12}>
              <FormGroup>
                <FormControl type="text" placeholder="Account" />
              </FormGroup>
              <FormGroup>
                <FormControl type="password" placeholder="Password" />
              </FormGroup>
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </Grid>
      </form>
    );
  }
}

render(<LoginForm />, document.getElementById("loginForm"));
