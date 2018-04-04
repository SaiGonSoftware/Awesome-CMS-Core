import React, { Component } from "react";
import { render } from "react-dom";
import toastr from "toastr";
import qs from "qs";
import PropTypes from "prop-types";

import { navigateToUrl, isDomExist } from "../../Helper/util";
import { setStorage } from "../../Helper/storageHelper";
import { AppEnum } from "../../Helper/appEnum";
import { Post } from "../../Helper/ajax";
import env from "../../Helper/envConfig";
import statusCode from "../../Helper/StatusCode";
import AwesomeInput from "../../Common/AwesomeInput.jsx";
import Spinner from "../../Common/Spinner.jsx";

function validate(username, password) {
  // true means invalid, so our conditions got reversed
  return {
    username: username.length === 0,
    password: password.length === 0
  };
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      touched: {
        username: false,
        password: false
      }
    };
  }

  validateErrors() {
    const errors = validate(this.state.username, this.state.password);
    return errors;
  }

  canBeSubmitted() {
    const errors = this.validateErrors();
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  login = e => {
    this.setState({ loading: true });
    if (!this.canBeSubmitted()) {
      return;
    }

    e.preventDefault();

    Post(env.loginUrl, {
      Username: this.state.username,
      Password: this.state.password,
      RememberMe: this.state.rememberMe === "on" ? true : false
    })
      .then(res => {
        if (res.status === statusCode.Success) this.tokenRequest();
      })
      .catch(() => {
        this.setState({ loading: false });
        toastr.error("Invalid credentials");
      });
  };

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onBlur(e) {
    this.setState({
      touched: { ...this.state.touched, [e.target.name]: true }
    });
  }

  tokenRequest() {
    Post(
      env.tokenUrl,
      qs.stringify({
        username: this.state.username,
        password: this.state.password,
        grant_type: "password",
        scope: "offline_access"
      })
    ).then(function(res) {
      let token = {
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
        token_type: res.data.token_type,
        expires_in: res.data.expires_in
      };
      setStorage(AppEnum.authToken, token);
      navigateToUrl(env.portal);
    });
  }

  renderButton() {
    const errors = this.validateErrors();
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    if (this.state.loading) {
      return <Spinner />;
    } else {
      return (
        <button className="btn btn-primary" type="submit" disabled={isDisabled}>
          Login
        </button>
      );
    }
  }

  render() {
    const errors = this.validateErrors();

    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };

    return (
      <div className="container">
        <div className="row">
          <div className="col col-md-12" id="loginContainer">
            <form id="loginForm" onSubmit={this.login}>
              <div className="panel-heading">
                <h3 className="panel-title"> Admin portal </h3>
              </div>
              <div id="loginFormContent">
                <div className="form-group">
                  <label htmlFor="username" hidden>
                    Username
                  </label>
                  <AwesomeInput
                    className={shouldMarkError("username")}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    required="required"
                    value={this.state.username}
                    onChange={username => this.onChange(username)}
                    onBlur={username => this.onBlur(username)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" hidden>
                    Password
                  </label>
                  <AwesomeInput
                    className={shouldMarkError("password")}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    required="required"
                    value={this.state.password}
                    onChange={password => this.onChange(password)}
                    onBlur={password => this.onBlur(password)}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      name="rememberMe"
                      onChange={rememberMe => this.onChange(rememberMe)}
                    />
                    Remember me ?
                  </label>
                </div>
                {this.renderButton()}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

if (isDomExist("loginForm")) {
  render(<LoginForm />, document.getElementById("loginForm"));
}

LoginForm.propTypes = {
  loading: PropTypes.bool
};
