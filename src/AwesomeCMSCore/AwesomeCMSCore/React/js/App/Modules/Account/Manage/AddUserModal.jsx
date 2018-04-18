import React, { Component } from "react";
import PropTypes from "prop-types";

import { shouldMarkError, validateInput } from "../../../Helper/Validation";
import { onChange, onBlur } from "./../../../Helper/stateHelper";

import ACCInput from "../../../Common/ACCInput/ACCInput.jsx";
import ACCButton from "../../../Common/ACCButton.jsx";

class AddUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      loading: false,
      touched: {
        username: false,
        email: false
      }
    };
    this.validationArr = [];
  }

  render() {
    const { username, email, loading } = this.state;
    this.validationArr = [
      {
        username,
        email
      }
    ];

    const errors = validateInput.call(this, this.validationArr);

    return (
      <div
        className="modal fade"
        id={this.props.id}
        role="dialog"
        aria-labelledby={this.props.id}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> Add new account </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
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
                className={shouldMarkError.call(this, "email", errors)}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required="required"
                value={email}
                onChange={email => onChange.call(this, email)}
                onBlur={email => onBlur.call(this, email)}
              />
            </div>
            <div className="modal-footer">
              <ACCButton
                validationArr={this.validationArr}
                loading={loading}
              />
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddUserModal.propTypes = {
  id: PropTypes.string.isRequired
};

export default AddUserModal;
