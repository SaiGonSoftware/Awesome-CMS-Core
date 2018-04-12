import React, { Component } from "react";
import { render } from "react-dom";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import toastr from "toastr";
import qs from "qs";

import { isDomExist } from "../../Helper/util";
import { Get, Post } from "../../Helper/ajax";
import env from "../../Helper/envConfig";
import  ACCModal  from "../../Common/Modal.jsx";

class AccountTable extends Component {
  constructor() {
    super();
    this.state = {
      userList: [],
      loading: false,
      showModal: false,
      selectedUserId: "",
      btnActivate: "",
      btnDeactivate: "",
      toogleFlag: false
    };
  }

  componentDidMount() {
    Get(env.userList).then(res => {
      this.setState({ userList: res.data });
    });
  }

  handleAddUser = () => {};

  toggleAccountStatus = () => {
    if (this.state.selectedId) {
      Post(
        env.deactiveAccount,
        qs.stringify({
          accountId: this.state.selectedId,
          toogleFlag: this.state.toogleFlag
        })
      )
        .then(() => {
          toastr.info("Account status successfully set");
        })
        .catch(() => {
          toastr.error("Something went wrong");
        });
    }
  };

  onSelectAccount = row => {
    if (row.emailConfirmed === "True") {
      this.setState({ btnDeactivate: "", btnActivate: "disabled" });
      this.setState({ selectedId: row.userId, toogleFlag: false });
    }
    if (row.emailConfirmed === "False") {
      this.setState({ btnActivate: "", btnDeactivate: "disabled" });
      this.setState({ selectedId: row.userId, toogleFlag: true });
    }
  };

  render() {
    const { userList, btnActivate, btnDeactivate } = this.state;

    const selectRow = {
      mode: "radio",
      clickToSelect: true,
      onSelect: this.onSelectAccount
    };

    const accountStatus = {
      True: "True",
      False: "False"
    };

    const options = {
      noDataText: "List is empty",
      page: 1,
      sizePerPage: 5,
      pageStartIndex: 1,
      hideSizePerPage: true,
      prePage: "Prev",
      nextPage: "Next",
      firstPage: "First",
      lastPage: "Last"
    };

    const addUserModalOptions = [{
      
    }];

    return (
      <div className="card">
        <div className="card-header">User List</div>
        <div className="card-body">
          <div className="row" id="userListOptions">
            <div className="col-md-6">
              <button
                type="button"
                className="btn btn-primary"
                id="btnAddUser"
                data-toggle="modal"
                data-target="#addUserModal"
              >
                <i className="fa fa-user-plus" aria-hidden="true" />
                &nbsp; Add User
              </button>
              <ACCModal
                title="Add User"
                id="addUserModal"
                onClick={this.handleAddUser}
              />
              <button type="button" className="btn btn-warning">
                <i className="fa fa-pencil-square-o" aria-hidden="true" /> Edit
                Role
              </button>
            </div>
            <div className="col-md-6" id="deactiveSection">
              <button
                type="button"
                className="btn btn-danger pull-right"
                onClick={this.toggleAccountStatus}
                disabled={btnDeactivate}
              >
                <i className="fa fa-power-off" aria-hidden="true" /> Deactive
                Account
              </button>
              <button
                type="button"
                className="btn btn-success pull-right"
                onClick={this.toggleAccountStatus}
                disabled={btnActivate}
              >
                <i className="fa fa-toggle-on" aria-hidden="true" />
                &nbsp; Activate Account
              </button>
            </div>
          </div>
          <BootstrapTable
            data={userList}
            version="4"
            selectRow={selectRow}
            options={options}
            pagination
            containerclassName="table text-center table-hover table-bordered table-striped"
          >
            <TableHeaderColumn
              dataField="userName"
              isKey
              dataSort={true}
              filter={{ type: "TextFilter" }}
            >
              User Name
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="email"
              dataSort={true}
              filter={{ type: "TextFilter" }}
            >
              Email
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="emailConfirmed"
              dataSort={true}
              filter={{ type: "SelectFilter", options: accountStatus }}
            >
              Email Confirmed
            </TableHeaderColumn>
            <TableHeaderColumn dataField="roles">Roles</TableHeaderColumn>
          </BootstrapTable>,
        </div>
      </div>
    );
  }
}

if (isDomExist("accountTable")) {
  render(<AccountTable />, document.getElementById("accountTable"));
}
