import React, {Component} from "react";
import PropTypes from "prop-types";
import toastr from "toastr";

import {Get, PutWithSpinner} from "../../../Helper/Http";
import env from "../../../Helper/Enviroment";
import statusCode from "../../../Helper/StatusCode";

import Spinner from "../../../Common/ACCAnimation/Spinner.jsx";
import ACCCheckboxOrRadioGroup from '../../../Common/ACCSelect/ACCCheckboxOrRadioGroup.jsx';
import { ROLE_API_PATH } from './../../../Helper/Enviroment';

class EditUserRolesModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rolesName: [],
      userId: "",
      currentUserRoles: [],
      loading: false
    };
  }

  componentDidMount() {
    const url = `${env.getUserRolesById}/${this.props.userId}`;
    Get(url).then(res => {
      this.setState({rolesName: res.data.rolesName, currentUserRoles: res.data.currentUserRoles, userId: res.data.userId});
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userId !== nextProps.userId) {
      const url = `${env.getUserRolesById}/${nextProps.userId}`;
      Get(url).then(res => {
        this.setState({rolesName: res.data.rolesName, currentUserRoles: res.data.currentUserRoles, userId: res.data.userId});
      });
    }
  }

  renderButton() {
    const isRoleValid = this.state.currentUserRoles.length > 0;
    if (this.state.loading) {
      return <Spinner/>;
    } else {
      return (
        <button className="btn btn-primary" type="submit" disabled={!isRoleValid}>
          Save
        </button>
      );
    }
  }

  editUserRole = e => {
    e.preventDefault();
    const isRoleValid = this.state.currentUserRoles.length > 0;

    if (isRoleValid) {
      PutWithSpinner
        .call(this, `${ROLE_API_PATH}/userRoles/edit`, {
        UserId: this.state.userId,
        CurrentUserRoles: this.state.currentUserRoles
      })
        .then(res => {
          if (res.status === statusCode.Success)
            toastr.info("Edit user roles success");
          }
        )
        .catch(() => {
          toastr.error("Something went wrong. Please try again");
        });
    }
  }

  handleRoleSelection = e => {
    const newSelection = e.target.value;
    let newSelectionArray;
    if (this.state.currentUserRoles.indexOf(newSelection) > -1) {
      newSelectionArray = this
        .state
        .currentUserRoles
        .filter(s => s !== newSelection)
    } else {
      newSelectionArray = [
        ...this.state.currentUserRoles,
        newSelection
      ];
    }
    this.setState({currentUserRoles: newSelectionArray});
  }

  render() {
    return (
      <div
        className="modal fade"
        id={this.props.id}
        role="dialog"
        aria-labelledby={this.props.id}
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <form onSubmit={this.editUserRole}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Edit role for user {this.props.userName}
                </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="card" id="userRoleSection">
                  <div className="card-body">
                    <h5 className="card-title">Roles</h5>
                    <ACCCheckboxOrRadioGroup
                      name={'roles'}
                      type={'checkbox'}
                      options={this.state.rolesName}
                      selectedOptions={this.state.currentUserRoles}
                      onChange={this.handleRoleSelection}/>
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

EditUserRolesModal.propTypes = {
  id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired
};

export default EditUserRolesModal;
