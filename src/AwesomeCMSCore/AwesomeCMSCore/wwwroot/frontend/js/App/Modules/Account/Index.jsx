import React, { Component } from "react";
import { render } from "react-dom";

import { isDomExist } from "../../Helper/util";
import { Get } from "./../../Helper/ajax";
import env from "../../Helper/envConfig";
import RemotePagination from "../../Common/RemotePagination.jsx";

class AccountTable extends Component {
  constructor() {
    super();
    this.state = {
      userList: [],
      loading: false
    };
  }

  componentDidMount() {
    Get(env.userList).then(res => {
      this.setState({ userList: res.data });
    });
  }

  render() {
    const { userList } = this.state;

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

    const columns = [
      {
        dataField: "userName",
        text: "UserName",
        sort: true
      },
      {
        dataField: "email",
        text: "Email",
        sort: true
      },
      {
        dataField: "emailConfirmed",
        text: "Email Confirmed",
        sort: true
      },
      {
        dataField: "roles",
        text: "Roles"
      }
    ];

    return (
      <div className="card">
        <div className="card-header">User List</div>
        <div className="card-body">
          <RemotePagination
            keyField="userId"
            classes="table text-center table-sm table-hover table-bordered table-striped"
            data={userList}
            options={options}
            columns={columns}
          />
        </div>
      </div>
    );
  }
}

if (isDomExist("accountTable")) {
  render(<AccountTable />, document.getElementById("accountTable"));
}
