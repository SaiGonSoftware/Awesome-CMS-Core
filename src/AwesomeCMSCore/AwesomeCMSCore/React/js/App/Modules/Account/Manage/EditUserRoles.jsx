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
import CheckboxOrRadioGroup from '../../../Common/ACCInput/CheckboxOrRadioGroup.jsx';

class EditUserRoles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rolesName: [],
      currentUserRoles: [],
      loading: false
    };
  }

  componentWillMount = () => {
    this.selectedRoles = new Set();
  };

  componentDidMount() {
    const url = `${env.getUserRolesById}?userId=${this.props.userId}`;
    Get(url).then(res => {
      this.setState({
        rolesName: res.data.rolesName,
        currentUserRoles: res.data.currentUserRoles
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userId !== nextProps.userId) {
      const url = `${env.getUserRolesById}?userId=${nextProps.userId}`;
      Get(url).then(res => {
        this.setState({
          rolesName: res.data.rolesName,
          currentUserRoles: res.data.currentUserRoles
        });
      });
    }
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

  handleRoleSelection = e => {
		const newSelection = e.target.value;
		let newSelectionArray;
		if(this.state.currentUserRoles.indexOf(newSelection) > -1) {
			newSelectionArray = this.state.currentUserRoles.filter(s => s !== newSelection)
		} else {
			newSelectionArray = [...this.state.currentUserRoles, newSelection];
		}
		this.setState({ currentUserRoles: newSelectionArray }, () => console.log('pet selection', this.state.currentUserRoles));
  }

  render() {
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
                  <CheckboxOrRadioGroup
                    name={'roles'}
                    type={'checkbox'}
                    options={this.state.rolesName}
                    selectedOptions={this.state.currentUserRoles}
                    onChange={this.handleRoleSelection} />
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
