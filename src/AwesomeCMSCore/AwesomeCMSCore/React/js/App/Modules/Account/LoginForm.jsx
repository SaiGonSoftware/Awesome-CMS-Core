import React, { Component } from "react";
import { render } from "react-dom";
import toastr from "toastr";
import qs from "qs";
import PropTypes from "prop-types";

import { onChange, onBlur, onCheck } from "../../Helper/stateHelper";
import { navigateToUrl, isDomExist } from "../../Helper/util";
import { setStorage } from "../../Helper/storageHelper";
import { APP_ENUM } from "../../Helper/appEnum";
import { Post, PostWithSpinner } from "../../Helper/ajax";
import {
  shouldMarkError,
  validateInput,
  isFormValid
} from "../../Helper/Validation";
import env from "../../Helper/envConfig";
import statusCode from "../../Helper/StatusCode";

import ACCInput from "../../Common/ACCInput/ACCInput.jsx";
import ACCCheckbox from "../../Common/ACCInput/ACCCheckbox.jsx";
import ACCButton from "../../Common/ACCButton.jsx";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      rememberMe: false,
      touched: {
        username: false,
        password: false
      }
    };
    this.validationArr = [];
  }

  login = e => {
    if (!isFormValid(this.validationArr)) {
      return;
    }

    e.preventDefault();

    PostWithSpinner.call(this, env.loginUrl, {
      Username: this.state.username,
      Password: this.state.password,
      RememberMe: this.state.rememberMe ? true : false
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

  render() {
    const { username, password, rememberMe, loading } = this.state;
    this.validationArr = [
      {
        username: username,
        password: password
      }
    ];

    const errors = validateInput.call(this, this.validationArr);

    return (
      <div id="loginContainer">
        <div className="card">
          <div className="card-header text-center"> Admin portal </div>
          <div className="card-body">
            <form onSubmit={this.login}>
              <div id="loginFormContent">
                <ACCInput
                  className={shouldMarkError.call(this, "username", errors)}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  required="required"
                  value={username}
                  onChange={username => onChange.call(this, username)}
                  onBlur={username => onBlur.call(this, username)}
                />
                <ACCInput
                  className={shouldMarkError.call(this, "password", errors)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  required="required"
                  value={password}
                  onChange={password => onChange.call(this, password)}
                  onBlur={password => onBlur.call(this, password)}
                />
                <ACCCheckbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={rememberMe}
                  label="Remember me ?"
                  onChange={rememberMe => onCheck.call(this, rememberMe)}
                />
                <ACCButton
                  validationArr={this.validationArr}
                  loading={loading}
                  btnBlocked="btn-block"
                  label="Login"
                />
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
