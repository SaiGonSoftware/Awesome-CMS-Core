import React, { Component } from "react";
import PropTypes from "prop-types";
import toastr from "toastr";

import { onChange } from "../../../Helper/stateHelper";
import { Get, PostWithSpinner, Post } from "../../../Helper/ajax";
import { isFormValid } from "../../../Helper/Validation";
import env from "../../../Helper/envConfig";
import statusCode from "../../../Helper/StatusCode";

import ACCMultiCheckbox from "../../../Common/ACCInput/ACCMultiCheckbox.jsx";
import Spinner from "../../../Common/Spinner.jsx";

class EditUserRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleList: [],
      loading: false
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

  renderButton() {
    if (this.state.loading) {
      return <Spinner />;
    } else {
      return (
        <button className="btn btn-primary" type="submit">
          Save
        </button>
      );
    }
  }

  render() {
    const { roleList } = this.state;

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
              <h5 className="modal-title">
                Edit role for user {this.props.userName}
              </h5>
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
              <div className="card" id="userRoleSection">
                <div className="card-body">
                  <h5 className="card-title">Roles</h5>
                  {roleList.map((role, index) => (
                    <ACCMultiCheckbox
                      index={index}
                      key={role.id}
                      id={`${role.id}-editRole`}
                      name={role.name}
                      label={role.name}
                      handleCheckboxChange={this.onSelectRoles}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              {this.renderButton()}
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

EditUserRoles.propTypes = {
  id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired
};

export default EditUserRoles;
