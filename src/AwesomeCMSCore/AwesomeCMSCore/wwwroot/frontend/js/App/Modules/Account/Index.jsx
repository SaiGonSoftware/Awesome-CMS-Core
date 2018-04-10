import React, { Component } from "react";
import { render } from "react-dom";
import filterFactory, {
  textFilter,
  selectFilter
} from "react-bootstrap-table2-filter";
import toastr from "toastr";
import qs from "qs";

import { isDomExist } from "../../Helper/util";
import { Get, Post } from "../../Helper/ajax";
import env from "../../Helper/envConfig";
import ACCBootstrapTable from "../../Common/ACCBootstrapTable.jsx";

class AccountTable extends Component {
  constructor() {
    super();
    this.state = {
      userList: [],
      loading: false,
      showModal: false,
      selectedUserId: "",
      btnActivate: "",
      btnDeactivate: ""
    };
  }

  componentDidMount() {
    Get(env.userList).then(res => {
      this.setState({ userList: res.data });
    });
  }

  handleAddUser = () => {};

  handleDeactiveAccount = () => {
    if (this.selectedId) {
      Post(env.deactiveAccount, qs.stringify({ accountId: this.selectedId }))
        .then(() => {
          toastr.info("Deactive account complete");
        })
        .catch(() => {
          toastr.error("Something went wrong");
        });
    }
  };

  onSelectAccount = row => {
    if (this.accountTable) {
      if (row.emailConfirmed === "True")
        this.setState({ btnDeactivate: "", btnActivate: "disabled" });
      if (row.emailConfirmed === "False")
        this.setState({ btnActivate: "", btnDeactivate: "disabled" });
      this.setState({ selectedId: row.userId });
    }
  };

  render() {
    const { userList, btnActivate, btnDeactivate } = this.state;

    const selectRow = {
      mode: "radio",
      clickToSelect: true,
      onSelect: this.onSelectAccount
    };

    const options = {
      pageStartIndex: 0,
      hideSizePerPage: true,
      hidePageListOnlyOnePage: true,
      prePageText: "Back",
      nextPageText: "Next",
      sizePerPageList: [
        {
          text: "2",
          value: 2
        }
      ]
    };

    const acccountActiveStatus = {
      False: "False",
      True: "True"
    };

    const columns = [
      {
        dataField: "userName",
        text: "UserName",
        sort: true
      },
      {
        dataField: "roles",
        text: "Roles"
      },
      {
        dataField: "email",
        text: "Email",
        sort: true,
        filter: textFilter()
      },
      {
        dataField: "emailConfirmed",
        text: "Email Confirmed",
        sort: true,
        formatter: cell => acccountActiveStatus[cell],
        filter: selectFilter({
          options: acccountActiveStatus
        })
      }
    ];

    return (
      <div
        className="card"
        ref={c => {
          this.accountTable = c;
        }}
      >
        <div className="card-header">User List</div>
        <div className="card-body">
          <div className="row" id="userListOptions">
            <div className="col-md-6">
              <button type="button" className="btn btn-primary" id="btnAddUser">
                <i
                  className="fa fa-user-plus"
                  aria-hidden="true"
                  onClick={this.handleAddUser}
                />
                &nbsp; Add User
              </button>
              <button type="button" className="btn btn-warning">
                <i className="fa fa-pencil-square-o" aria-hidden="true" /> Edit
                Role
              </button>
            </div>
            <div className="col-md-6" id="deactiveSection">
              <button
                type="button"
                className="btn btn-danger pull-right"
                onClick={this.handleDeactiveAccount}
                disabled={btnDeactivate}
              >
                <i className="fa fa-power-off" aria-hidden="true" /> Deactive
                Account
              </button>
              <button
                type="button"
                className="btn btn-success pull-right"
                disabled={btnActivate}
              >
                <i className="fa fa-toggle-on" aria-hidden="true" />
                &nbsp; Activate Account
              </button>
            </div>
          </div>

          <ACCBootstrapTable
            keyField="userId"
            classes="table text-center table-sm table-hover table-bordered table-striped"
            data={userList}
            options={options}
            columns={columns}
            filter={filterFactory()}
            selectRow={selectRow}
          />
        </div>
      </div>
    );
  }
}

if (isDomExist("accountTable")) {
  render(<AccountTable />, document.getElementById("accountTable"));
}
