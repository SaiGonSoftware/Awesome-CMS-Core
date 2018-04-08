import React, { Component } from "react";
import { render } from "react-dom";
import filterFactory, {
  textFilter,
  selectFilter
} from "react-bootstrap-table2-filter";
import toastr from "toastr";
import qs from "qs";

import { isDomExist } from "../../Helper/util";
import { Get, Post, PostWithSpinner } from "./../../Helper/ajax";
import env from "../../Helper/envConfig";
import ACCBootstrapTable from "../../Common/ACCBootstrapTable.jsx";

class AccountTable extends Component {
  constructor() {
    super();
    this.state = {
      userList: [],
      loading: false,
      selectedId: ""
    };
  }

  componentDidMount() {
    Get(env.userList).then(res => {
      this.setState({ userList: res.data });
    });
  }

  handleOnSelect = (row, isSelect) => {
    /*    this.setState(() => ({
      selectedId: [...this.state.selectedId, row.userId]
    })); */
  };

  handleDeactiveAccount = () => {
    alert("ok");
    const selectedId = "68627c5a-5788-4820-bd9d-0034d3f0239b";
    console.log(selectedId);
    PostWithSpinner.call(
      this,
      env.deactiveAccount,
      qs.stringify({ accountId: selectedId })
    ).then(res => {
      toastr.info("res");
    });
  };

  render() {
    const { userList } = this.state;

    const selectRow = {
      mode: "radio",
      clickToSelect: true,
      onSelect: this.handleOnSelect,
      selected: false
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
      <div className="card">
        <div className="card-header">User List</div>
        <div className="card-body">
          <div className="row" id="userListOptions">
            <div className="col-md-8">
              <button type="button" className="btn btn-primary" id="btnAddUser">
                <i className="fa fa-user-plus" aria-hidden="true" /> Add User
              </button>
              <button type="button" className="btn btn-warning">
                <i className="fa fa-pencil-square-o" aria-hidden="true" /> Edit
                Role
              </button>
            </div>
            <div className="col-md-4" id="deactiveSection">
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.handleDeactiveAccount}
              >
                <i className="fa fa-power-off" aria-hidden="true" /> Deactive
                Account
              </button>
            </div>
          </div>

          <ACCBootstrapTable
            deleteRow={true}
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
