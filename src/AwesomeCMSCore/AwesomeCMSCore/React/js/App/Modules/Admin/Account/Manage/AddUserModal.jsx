import React, {Component} from "react";
import PropTypes from "prop-types";
import toastr from "toastr";

import {shouldMarkError, validateInput} from "Helper/Validation";
import {onChange} from "Helper/StateHelper";
import {Get, PostWithSpinner, Post} from "Helper/Http";
import {ROLE_API} from 'Helper/API_Endpoint/RoleEndpoint';
import {ACCOUNT_DUPLICATE_API, USER_API} from 'Helper/API_Endpoint/AccountEndpoint';
import {isFormValid} from "Helper/Validation";
import {STATUS_CODE} from 'Helper/AppEnum';

import ACCInput from "Common/ACCInput/ACCInput.jsx";
import ACCMultiCheckbox from "Common/ACCSelect/ACCMultiCheckbox.jsx";
import Spinner from "Common/ACCAnimation/Spinner.jsx";

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
    this.mounted = true;
    Get(ROLE_API).then(res => {
      if (this.mounted) {
        this.setState({roleList: res.data});
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }
  
  onSelectRoles = role => {
    if (this.selectedRoles.has(role)) {
      this
        .selectedRoles
        .delete(role);
    } else {
      this
        .selectedRoles
        .add(role);
    }
  };

  onBlur(e) {
    this.setState({
      touched: {
        ...this.state.touched,
        [e.target.name]: true
      }
    });

    if (e.target.name === "username") {
      Post(ACCOUNT_DUPLICATE_API, {
        Key: "UserName",
        Value: this.state.username
      }).then(res => {
        res.data
          ? this.setState({duplicateUserName: true})
          : this.setState({duplicateUserName: false});
      });
    }

    if (e.target.name === "email") {
      Post(ACCOUNT_DUPLICATE_API, {
        Key: "Email",
        Value: this.state.email
      }).then(res => {
        res.data
          ? this.setState({duplicateEmail: true})
          : this.setState({duplicateEmail: false});
      });
    }
  }

  addNewUser = e => {
    if (!isFormValid(this.validationArr) || this.state.duplicateEmail || this.state.duplicateUserName) {
      return;
    }

    e.preventDefault();

    if (!this.state.duplicateEmail || !this.state.duplicateUserName) {
      PostWithSpinner
        .call(this, USER_API, {
        Username: this.state.username,
        Email: this.state.email,
        Roles: [...this.selectedRoles]
      })
        .then(res => {
          if (res.status === STATUS_CODE.Success) 
            toastr.info("Account successfully create");
          }
        )
        .catch(() => {
          toastr.error("Something went wrong. Please try again");
        });
    }
  };

  renderButton() {
    const errors = validateInput(this.validationArr);
    const inputErrors = Object
      .keys(errors)
      .some(x => errors[x]);
    let isDisabled = false;

    if (inputErrors || this.state.duplicateEmail || this.state.duplicateUserName) {
      isDisabled = true;
    }

    if (this.state.loading) {
      return <Spinner/>;
    } else {
      return (
        <button className="btn btn-primary" type="submit" disabled={isDisabled}>
          Save
        </button>
      );
    }
  }

  render() {
    const {username, email, roleList, duplicateUserName, duplicateEmail} = this.state;

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
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form onSubmit={this.addNewUser}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Add new account
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {duplicateUserName
                  ? (
                    <div className="alert alert-danger" role="alert">
                      UserName is duplicate
                    </div>
                  )
                  : null}
                {duplicateEmail
                  ? (
                    <div className="alert alert-danger" role="alert">
                      Email is duplicate
                    </div>
                  )
                  : null}

                <ACCInput
                  className={shouldMarkError.call(this, "username", errors)}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  required="required"
                  value={username}
                  onChange={username => onChange.call(this, username)}
                  onBlur={username => this.onBlur(username)}/>
                <ACCInput
                  className={shouldMarkError.call(this, "email", errors)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required="required"
                  value={email}
                  onChange={email => onChange.call(this, email)}
                  onBlur={email => this.onBlur(email)}/>
                <div className="card" id="userRoleSection">
                  <div className="card-body">
                    <h5 className="card-title">Roles</h5>
                    {roleList.map((role, index) => (<ACCMultiCheckbox
                      index={index}
                      key={role.id}
                      id={`${role.id}-addRole`}
                      name={role.name}
                      label={role.name}
                      handleCheckboxChange={this.onSelectRoles}/>))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {this.renderButton()}
                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddUserModal.propTypes = {
  id: PropTypes.string.isRequired
};

export default AddUserModal;
