import React, { Component } from "react";
import { render } from "react-dom";
import BootstrapTable from "react-bootstrap-table-next";

import { isDomExist } from "../../Helper/util";
import { Get } from "./../../Helper/ajax";
import env from "../../Helper/envConfig";

class AccountTable extends Component {
  constructor() {
    super();
    this.state = {
      userList: []
    };
  }
  componentDidMount() {
    Get(env.userList).then(res => {
      this.setState({ userList: res.data });
    });
  }
  render() {
    const { userList } = this.state;
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
        text: "EmailConfirmed",
        sort: true
      },
      {
        dataField: "roles",
        text: "Roles"
      }
    ];
    return (
      <BootstrapTable
        classes="table table-sm table-hover table-bordered table-striped table-dark"
        keyField="userId"
        data={userList}
        columns={columns}
      />
    );
  }
}

if (isDomExist("accountTable")) {
  render(<AccountTable />, document.getElementById("accountTable"));
}
