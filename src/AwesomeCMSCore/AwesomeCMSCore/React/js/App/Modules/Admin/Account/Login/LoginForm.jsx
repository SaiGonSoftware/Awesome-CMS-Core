import React, {Component} from "react";
import {render} from "react-dom";
import toastr from "toastr";
import qs from "qs";

import {onChange, onBlur, onCheck} from "Helper/StateHelper";
import {isDomExist} from "Helper/Util";
import {setStorage} from "Helper/StorageHelper";
import {APP_ENUM, STATUS_CODE} from "Helper/AppEnum";
import {Post, PostWithSpinner} from "Helper/Http";
import {shouldMarkError, validateInput, isFormValid} from "Helper/Validation";
import {TOKEN_ENDPOINT, ACCOUNT_LOGIN_API} from 'Helper/API_Endpoint/AccountEndpoint';
import {PORTAL_ENDPOINT} from 'Helper/API_Endpoint/PortalEndpoint';

import ACCInput from "Common/ACCInput/ACCInput.jsx";
import ACCCheckbox from "Common/ACCSelect/ACCCheckbox.jsx";
import ACCButton from "Common/ACCButton/ACCButton.jsx";

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

    PostWithSpinner
      .call(this, ACCOUNT_LOGIN_API, {
      Username: this.state.username,
      Password: this.state.password,
      RememberMe: this.state.rememberMe
        ? true
        : false
    })
      .then(res => {
        if (res.status === STATUS_CODE.Success) 
          this.tokenRequest();
        }
      )
      .catch((err) => {
        switch (err.response.status) {
          case STATUS_CODE.EmailNotConfirmed:
            return toastr.warning("Please confirm email");
          case STATUS_CODE.Forbid:
            return toastr.warning("Account is lockout");
          case STATUS_CODE.BadRequest:
            return toastr.error("Invalid credentials");
        }
      });
  };

  tokenRequest = () => {
    Post(TOKEN_ENDPOINT,
      qs.stringify(
        {
          username: this.state.username,
          password: this.state.password,
          grant_type: "password",
          scope: "offline_access"}
        ))
    .then(res => {
      let token = {
        access_token: res.data.access_token,
        refresh_token: res.data.refresh_token,
        token_type: res.data.token_type,
        expires_in: res.data.expires_in
      };

      setStorage(APP_ENUM.AUTH_TOKEN, token);
      window.location.href = PORTAL_ENDPOINT;
    });
  }

  render() {
    const {username, password, rememberMe, loading} = this.state;
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
          <div className="card-header text-center">
            Admin portal
          </div>
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
                  onBlur={username => onBlur.call(this, username)}/>
                <ACCInput
                  className={shouldMarkError.call(this, "password", errors)}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  required="required"
                  value={password}
                  onChange={password => onChange.call(this, password)}
                  onBlur={password => onBlur.call(this, password)}/>
                <ACCCheckbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={rememberMe}
                  label="Remember me ?"
                  onChange={rememberMe => onCheck.call(this, rememberMe)}/>
                <ACCButton
                  validationArr={this.validationArr}
                  loading={loading}
                  class="btn btn-primary btn-block"
                  label="Login"/>
                <br/>
                <a href="/Account/ForgotPassword">Forgot Password ?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

if (isDomExist("loginForm")) {
  render(
    <LoginForm/>, document.getElementById("loginForm"));
}
