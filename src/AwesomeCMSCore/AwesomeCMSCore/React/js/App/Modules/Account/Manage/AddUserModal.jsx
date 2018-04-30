import React, { Component } from "react";
import PropTypes from "prop-types";
import toastr from "toastr";

import { shouldMarkError, validateInput } from "../../../Helper/Validation";
import { onChange, onBlur } from "../../../Helper/stateHelper";
import { Get, PostWithSpinner } from "../../../Helper/ajax";
import { isFormValid } from "../../../Helper/Validation";
import env from "../../../Helper/envConfig";
import statusCode from "../../../Helper/StatusCode";

import ACCInput from "../../../Common/ACCInput/ACCInput.jsx";
import ACCButton from "../../../Common/ACCButton.jsx";
import ACCMultiCheckbox from "../../../Common/ACCInput/ACCMultiCheckbox.jsx";

class AddUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            roleList: [],
            loading: false,
            duplicateUserName: false,
            duplicateEmail: false,
            touched: {
                username: false,
                email: false
            }
        };
        this.validationArr = [];
    }

    componentWillMount = () => {
        this.selectedRoles = new Set();
    };

    componentDidMount() {
        Get(env.getUserRolesList).then(res => {
            this.setState({ roleList: res.data });
        });
    }

    onSelectRoles = role => {
        if (this.selectedRoles.has(role)) {
            this.selectedRoles.delete(role);
        } else {
            this.selectedRoles.add(role);
        }
    };

    onBlur(e) {
        this.setState({
            touched: { ...this.state.touched, [e.target.name]: true }
        });

        if (e.target.name === "username") {
            Post(env.validateDuplicateAccountInfo, {
                Key: "UserName",
                Value: this.state.username
            }).then(res => {
                res.data
                    ? this.setState({ duplicateUserName: true })
                    : this.setState({ duplicateUserName: false });
            });
        }

        if (e.target.name === "email") {
            Post(env.validateDuplicateAccountInfo, {
                Key: "Email",
                Value: this.state.email
            }).then(res => {
                res.data
                    ? this.setState({ duplicateEmail: true })
                    : this.setState({ duplicateEmail: false });
            });
        }
    }

    addNewUser = e => {
        if (
            !isFormValid(this.validationArr) ||
            this.state.duplicateEmail ||
            this.state.duplicateUserName
        ) {
            return;
        }

        e.preventDefault();

        if (this.state.duplicateEmail || this.state.duplicateUserName) {
            PostWithSpinner.call(this, env.addNewUser, {
                Username: this.state.username,
                Email: this.state.email,
                Roles: [...this.selectedRoles]
            })
                .then(res => {
                    if (res.status === statusCode.Success)
                        toastr.info("Account successfully create");
                })
                .catch(() => {
                    toastr.error("Something went wrong. Please try again");
                });
        }
    };

    renderButton() {
        const errors = validateInput(this.validationArr);
        const inputErrors = Object.keys(errors).some(x => errors[x]);
        let isDisabled = false;

        if (
            inputErrors ||
            this.state.duplicateEmail ||
            this.state.duplicateUserName
        ) {
            isDisabled = true;
        }

        if (this.state.loading) {
            return <Spinner />;
        } else {
            return (
                <button className="btn btn-primary" type="submit" disabled={isDisabled}>
                    Save
        </button>
            );
        }
    }

    render() {
        const {
      username,
            email,
            roleList,
            duplicateUserName,
            duplicateEmail
    } = this.state;

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
        <form onSubmit={this.addNewUser}>
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
                    <h5 className="card-title">Roles</h5>
                    {roleList.map((role, index) => (
                      <ACCMultiCheckbox
                        index={index}
                        key={role.id}
                        id={role.id}
                        name={role.name}
                        label={role.name}
                        handleCheckboxChange={this.onSelectRoles}
                      />
                    ))}
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
        </form>
      </div>
    );
  }
}

AddUserModal.propTypes = {
    id: PropTypes.string.isRequired
};

export default AddUserModal;
