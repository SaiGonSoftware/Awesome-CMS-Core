import React, { Component } from "react";
import toastr from "toastr";

import { handleOnChange } from "Helper/StateHelper";
import { Get, PostWithSpinner } from "Helper/Http";
import { StatusCode } from "Helper/AppEnum";
import { ROLE_API, ROLE_MANAGE_API } from "Helper/API_Endpoint/RoleEndpoint";

import ACCReactCreateSelect from "Common/ACCSelect/ACCReactCreateSelect";
import Spinner from "Common/ACCAnimation/Spinner";

type ManageRolesModalProps = {
  id: string
};

type ManageRolesModalState = {
  value: any[],
  loading: boolean,
  options: undefined[]
};

class ManageRolesModal extends Component<
  ManageRolesModalProps,
  ManageRolesModalState
> {
	public mounted: boolean;
	
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      options: [],
      value: []
    };
	}
	
  componentDidMount() {
    let value = [];
    this.mounted = true;
    Get(ROLE_API).then(res => {
      res.data.map(item => {
        if (item.name !== "Administrator")
          value.push({ value: item.id, label: item.name });
      });
      if (this.mounted) {
        this.setState({ value });
      }
    });
	}
	
  componentWillUnmount() {
    this.mounted = false;
	}
	
  handleSubmit = e => {
    e.preventDefault();
    PostWithSpinner.call(this, ROLE_MANAGE_API, {
      selectOptionViewModels: this.state.value
    })
      .then(res => {
        if (res.status === StatusCode.Success)
          toastr.success("Remove role success");
      })
      .catch(() => {
        toastr.error("Something went wrong.Please try again");
      });
	};
	
  renderButton() {
    const isDataNotValid = this.state.value.length === 0;
    if (this.state.loading) {
      return <Spinner />;
    } else {
      return (
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.handleSubmit}
          disabled={isDataNotValid}
        >
          Save
        </button>
      );
    }
	}
	
  render() {
    const { options, value } = this.state;
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
              <h5 className="modal-title">Manage Roles</h5>
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
              <ACCReactCreateSelect
                id="tagCreate"
                {...options}
                value={value}
                handleOnChange={value => handleOnChange.call(this, value)}
              />
              <br />
              <div
                className="alert alert-warning alert-dismissible fade show"
                role="alert"
              >
                <span>
                  Please note that user dont have any role will not allow to
                  login system
                </span>
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
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
export default ManageRolesModal;
