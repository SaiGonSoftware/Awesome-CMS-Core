import React, { Component } from "react";
import { render } from "react-dom";
import toastr from "toastr";
import qs from "qs";
import PropTypes from "prop-types";

import { navigateToUrl, isDomExist } from "../../Helper/util";
import { setStorage } from "../../Helper/storageHelper";
import { APP_ENUM } from "./../../Helper/appEnum";
import { Post, PostWithSpinner } from "../../Helper/ajax";
import env from "../../Helper/envConfig";
import statusCode from "../../Helper/StatusCode";

import ACCInput from "../../Common/ACCInput/ACCInput.jsx";
import Spinner from "../../Common/Spinner.jsx";
import ACCCheckbox from "./../../Common/ACCInput/ACCCheckbox.jsx";

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
    if (!this.canBeSubmitted()) {
      return;
    }

    e.preventDefault();

    PostWithSpinner.call(this, env.loginUrl, {
      Username: this.state.username,
      Password: this.state.password,
      RememberMe: this.state.rememberMe === "on" ? true : false
    })
      .then(res => {
        if (res.status === statusCode.Success) this.tokenRequest();
      })
      .catch(() => {
        toastr.error("Invalid credentials");
      });
  };

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
      setStorage(APP_ENUM.AUTH_TOKEN, token);
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
        <button
          className="btn btn-primary btn-block"
          type="submit"
          disabled={isDisabled}
        >
          Login
        </button>
      );
    }
  }

  render() {
    console.log(this.state.username);

    console.log(this.state.password);
    const errors = this.validateErrors();

    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };

    return (
      <div id="loginContainer">
        <div className="card">
          <div className="card-header text-center"> Admin portal </div>
          <div className="card-body">
            <form onSubmit={this.login}>
              <div id="loginFormContent">
                <ACCInput
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  required="required"
                />
                <ACCInput
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  required="required"
                />
                <ACCCheckbox id="rememberMe" name="rememberMe" />
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
