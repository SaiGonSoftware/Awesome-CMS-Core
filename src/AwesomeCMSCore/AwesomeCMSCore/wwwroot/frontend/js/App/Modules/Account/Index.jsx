import React, { Component } from "react";
import { render } from "react-dom";
import BootstrapTable from "react-bootstrap-table-next";

import { isDomExist } from "../../Helper/util";

class AccountTable extends Component {
  constructor() {
    super();
  }

  render() {
    const products = [
      {
        id: 1,
        name: "Item name 1",
        price: 100
      },
      {
        id: 2,
        name: "Item name 2",
        price: 100
      }
    ];
    const columns = [
      {
        dataField: "id",
        text: "Product ID",
        sort: true
      },
      {
        dataField: "name",
        text: "Product Name",
        sort: true
      },
      {
        dataField: "price",
        text: "Product Price"
      }
    ];
    return (
      <BootstrapTable
        classes="table table-sm table-hover table-bordered table-striped table-dark"
        keyField="id"
        data={products}
        columns={columns}
      />
    );
  }
}

if (isDomExist("accountTable")) {
  render(<AccountTable />, document.getElementById("accountTable"));
}
