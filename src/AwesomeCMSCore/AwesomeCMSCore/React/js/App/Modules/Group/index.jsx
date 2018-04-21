import React, { Component } from "react";
import { render } from "react-dom";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
//import toastr from "toastr";
//import qs from "qs";

import { isDomExist } from "../../Helper/util";
import { Get } from "../../Helper/ajax";
import env from "../../Helper/envConfig";

class GroupTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupList: [],
            loading: false,
            showModal: false
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
        Get(env.groupList).then(res => {
            this.setState({ groupList: res.data });
        });
    }
        render() {
            const { groupList } = this.state; 
            return (
                <div className="card">
                    <div className="card-header">Group List</div>
                    <div className="card-body"> 
                        <BootstrapTable
                            data={groupList}
                            version="4"
                            selectRow={this.selectRow}
                            options={this.tableOptions}
                            pagination
                            containerclassName="table text-center table-hover table-bordered table-striped"
                        >
                            <TableHeaderColumn
                                dataField="name"
                                isKey
                                dataSort={true}
                                filter={{ type: "TextFilter" }}
                            >
                                Group Name
            </TableHeaderColumn>
                            
                          </BootstrapTable>,
        </div>
                </div>
            );
        }
    
}

if (isDomExist("groupTable")) {
    
    render(<GroupTable />, document.getElementById("groupTable"));
}