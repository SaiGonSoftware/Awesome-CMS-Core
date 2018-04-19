import React, { Component } from "react";
import PropTypes from "prop-types";

import { shouldMarkError, validateInput } from "../../../Helper/Validation";
import { onChange, onBlur, onCheck } from "../../../Helper/stateHelper";
import { Get } from "../../../Helper/ajax";
import env from "../../../Helper/envConfig";

import ACCInput from "../../../Common/ACCInput/ACCInput.jsx";
import ACCButton from "../../../Common/ACCButton.jsx";
import ACCCheckbox from "../../../Common/ACCInput/ACCCheckbox.jsx";

class AddUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      roleList: [],
      loading: false,
      touched: {
        username: false,
        email: false
      }
    };
    this.validationArr = [];
  }

  componentDidMount() {
    Get(env.getUserRolesList).then(res => {
      this.setState({ roleList: res.data });
    });
  }

  render() {
    const { username, email, loading, roleList } = this.state;
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
              <div className="card" id="userRoleSection">
                <div className="card-body">
                  <h5 className="card-title">User Roles</h5>
                  <p className="card-text">
                    {roleList.map((role, index) => (
                      <ACCCheckbox
                        index={index}
                        key={role.id}
                        id={role.id}
                        name={role.name}
                        label={role.name}
                        onChange={role => onCheck.call(this, role)}
                      />
                    ))}
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <ACCButton
                validationArr={this.validationArr}
                loading={loading}
                label="Add"
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
