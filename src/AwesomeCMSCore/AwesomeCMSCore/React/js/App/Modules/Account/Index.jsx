import React, {Component} from "react";
import {render} from "react-dom";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import toastr from "toastr";

import {isDomExist} from "../../Helper/util";
import {Get, Post} from "../../Helper/ajax";
import env from "../../Helper/envConfig";

import AddUserModal from "./Manage/AddUserModal.jsx";
import EditUserRoles from "./Manage/EditUserRoles.jsx";
import { findObjectByKey } from '../../Helper/util';

class AccountTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      loading: false,
      showModal: false,
      selectedUserId: "",
      userName: "",
      btnActivate: "",
      btnDeactivate: "",
      toogleFlag: false,
      selectedRow: null
    };

    this.validationArr = [];

    this.selectRow = {
      mode: "radio",
      clickToSelect: true,
      onSelect: this.onSelectAccount
    };

    this.accountStatus = {
      True: "True",
      False: "False"
    };

    this.tableOptions = {
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
  }

  componentDidMount() {
    Get(env.userList).then(res => {
      this.setState({userList: res.data});
    });
  }

  toggleAccountStatus = () => {
    if (this.state.selectedUserId) {
      Post(env.deactiveAccount, {
        AccountId: this.state.selectedUserId,
        ToogleFlag: this.state.toogleFlag
      }).then(() => {
        let userListData = findObjectByKey(this.state.userList, "userId", this.state.selectedUserId);
        const newUserList = this.state.userList.map(stateItem => {
          if (stateItem.userId !== userListData.userId) return stateItem;
          let emailConfirmed = this.state.toogleFlag ? "True": "False";
          return {...stateItem, emailConfirmed};
        });

        this.setState({userList: newUserList});
        toastr.info("Account status successfully set");
      }).catch(() => {
        toastr.error("Something went wrong");
      });
    }
  };

  onSelectAccount = row => {
    this.setState({userName: row.userName, selectedUserId: row.userId, selectedRow: row});

    if (row.emailConfirmed === "True") {
      this.setState({btnDeactivate: "", btnActivate: "disabled"});
      this.setState({toogleFlag: false});
    }
    if (row.emailConfirmed === "False") {
      this.setState({btnActivate: "", btnDeactivate: "disabled"});
      this.setState({toogleFlag: true});
    }
  };

  render() {
    const {userList, userName, selectedUserId, btnActivate, btnDeactivate} = this.state;

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
                data-target="#addUserModal">
                <i className="fa fa-user-plus" aria-hidden="true"/>
                &nbsp; Add User
              </button>
              <AddUserModal id="addUserModal"/> {/* <button
                type="button"
                className="btn btn-warning"
                data-toggle="modal"
                data-target="#editUserRoleModal"
              >
                <i className="fa fa-pencil-square-o" aria-hidden="true" /> Edit
                Role for User
              </button>
              {selectedUserId ? (
                <EditUserRoles
                  id="editUserRoleModal"
                  userName={userName}
                  userId={selectedUserId}
                />
              ) : null} */}
            </div>
            <div className="col-md-6" id="deactiveSection">
              <button
                type="button"
                className="btn btn-danger pull-right"
                onClick={this.toggleAccountStatus}
                disabled={btnDeactivate}>
                <i className="fa fa-power-off" aria-hidden="true"/>
                Deactive Account
              </button>
              <button
                type="button"
                className="btn btn-success pull-right"
                onClick={this.toggleAccountStatus}
                disabled={btnActivate}>
                <i className="fa fa-toggle-on" aria-hidden="true"/>
                &nbsp; Activate Account
              </button>
            </div>
          </div>
          <BootstrapTable
            data={userList}
            version="4"
            selectRow={this.selectRow}
            options={this.tableOptions}
            pagination
            containerclassName="table text-center table-hover table-bordered table-striped">
            <TableHeaderColumn
              dataField="userName"
              isKey
              dataSort={true}
              filter={{
              type: "TextFilter"
            }}>
              User Name
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="email"
              dataSort={true}
              filter={{
              type: "TextFilter"
            }}>
              Email
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="emailConfirmed"
              dataSort={true}
              filter={{
              type: "SelectFilter",
              options: this.accountStatus
            }}>
              Email Confirmed
            </TableHeaderColumn>
            <TableHeaderColumn dataField="roles">Roles</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}

if (isDomExist("accountTable")) {
  render(
    <AccountTable/>, document.getElementById("accountTable"));
}
