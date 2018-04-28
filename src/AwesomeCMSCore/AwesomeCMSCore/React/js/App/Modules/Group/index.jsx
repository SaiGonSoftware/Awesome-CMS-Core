import React, { Component } from "react";
import { render } from "react-dom"; 
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"; 

import PropTypes from "prop-types";
import { isDomExist } from "../../Helper/util"; 
import env from "../../Helper/envConfig";   
import toastr from "toastr";

import { shouldMarkError, validateInput } from "../../Helper/Validation";
import { onChange } from "../../Helper/stateHelper";
import { Get, PostWithSpinner, Post } from "../../Helper/ajax";
import { isFormValid } from "../../Helper/Validation"; 
import statusCode from "../../Helper/StatusCode";

import ACCInput from "../../Common/ACCInput/ACCInput.jsx";
import ACCMultiCheckbox from "../../Common/ACCInput/ACCMultiCheckbox.jsx";
import Spinner from "../../Common/Spinner.jsx";

class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "", 
            roles: [],
            loading: false,
            duplicateGroupName: false, 
            touched: {
                name: false 
            }
        };
        this.validationArr = []; 
    } 

    componentWillMount = () => {
        this.selectedRoles = new Set();
    };

    componentDidMount() {
        Get(env.getUserRolesList).then(res => {
            this.setState({ roles: res.data });
        });
    }

    onSelectRoles = role => {
        if (this.selectedRoles.has(role)) {
            this.selectedRoles.delete(role);
        } else {
            this.selectedRoles.add(role);
        }
    };

    onBlur(e) {
        this.setState({
            touched: { ...this.state.touched, [e.target.name]: true }
        }); 
        //if (e.target.name === "groupname") {
        //    Post(env.validateDuplicateAccountInfo, {
        //        Key: "UserName",
        //        Value: this.state.username
        //    }).then(res => {
        //        res.data
        //            ? this.setState({ duplicateUserName: true })
        //            : this.setState({ duplicateUserName: false });
        //    });
        //} 
    } 
    addNewGroup = e => {
         
        //if (
        //    !isFormValid(this.validationArr) ||
        //    this.state.duplicateGroupName  
        //) {
        //    return;
        //}

        e.preventDefault();

        //if (!this.state.duplicateGroupName) {

        alert(this.state.name);
            PostWithSpinner.call(this, env.addNewGroup, {
                Name: this.state.name,
                Roles: [...this.selectedRoles]
            })
                .then(res => {
                    if (res.status === statusCode.Success)
                        toastr.info("Account successfully create");
                })
                .catch(() => {
                    toastr.error("Something went wrong. Please try again");
                });
        //}
        //else {

        //    alert("failed"); 
        //}
    };

    renderButton() {
        const errors = validateInput(this.validationArr);
        const inputErrors = Object.keys(errors).some(x => errors[x]);
        let isDisabled = false;

        if (
            inputErrors ||
            this.state.duplicateGroupName 
        ) {
            isDisabled = true;
        }

        if (this.state.loading) {
            return <Spinner />;
        } else {
            return (
                <button className="btn btn-primary" onClick={this.addNewGroup} type="submit" disabled={isDisabled}>
                    Save
        </button>
            );
        }
    }

    render() {
        const {name, roles, duplicateGroupName } = this.state;

        this.validationArr = [
            {
                name 
            }
        ];

        const errors = validateInput.call(this, this.validationArr);

        return (
            <div
                className=""
                id={this.props.id}
                role="dialog"
                aria-labelledby={this.props.id}
                aria-hidden="true"
            >
                
                            <h5 className="modal-title"> Add new Group </h5>
                           
                       
            <div className="modal-body">
                {duplicateGroupName ? (
                                <div className="alert alert-danger" role="alert">
                                    GroupName is duplicate
                </div>
                            ) : null} 
                            <ACCInput
                                className={shouldMarkError.call(this, "name", errors)}
                                type="text"
                        name="name"
                        id="name"
                        placeholder="name"
                                required="required"
                        value={name}
                        onChange={name => onChange.call(this, name)}
                        onBlur={name => this.onBlur(name)}
                /> 
                            <div className="card" id="groupRoleSection">
                                <div className="card-body">
                            <h5 className="card-title">Roles</h5>
                            {roles.map((role, index) => (
                                        <ACCMultiCheckbox
                                            index={index}
                                            key={role.id}
                                            id={role.id}
                                            name={role.name}
                                            label={role.name}
                                            handleCheckboxChange={this.onSelectRoles}
                                        />
                                    ))}
                              
                         
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

CreateGroup.propTypes = {
    id: PropTypes.string
};

export default CreateGroup;

class EditGroup extends Component {
    static propTypes = {
        id: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            roles: []
        }
    }
    componentDidMount() { 
        Get(env.getGroup + "?id=" + this.props.id).then(res => {
            this.setState({ id: res.data.id, name: res.data.name }); 
        }); 
    }
    render() {
        return (
            <div className="row">{this.state.id}</div>
        );
    }
}

class GroupList extends Component {
    static propTypes = {
        showEdit: PropTypes.bool
    }
    constructor(props) {
        super(props);
        this.state = {
            groupList: [],
            loading: false,
            showEdit: false,
            showCreate: false,
            selectedGroupId: ''
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
        this.selectRow = {
            mode: 'radio',
            bgColor: '#c1f291',
            onSelect: this.handleRowSelect,
            clickToSelect: true,
            hideSelectColumn: true
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCreate = this.handleCreate.bind(this); 
        this.handleRowSelect = this.handleRowSelect.bind(this);

    }
    componentDidMount() {
        Get(env.groupList).then(res => {
            this.setState({ groupList: res.data });
        });
    }
    handleClose() {
        this.setState({ showEdit: false, showCreate: false, selectedGroupId:'' }); 
    }
    handleEdit() { 
        this.setState({ showEdit: true }); 
    } 
    handleCreate() {
        this.setState({ showCreate: true }); 
    }
    handleRowSelect = row => {
        this.setState({ selectedGroupId: row.id });
    }
    render() {
        const { groupList } = this.state;
        return ( 
            <div className="card">
                <div className="card-header">Group List</div>
                <div className="card-body">
                    <button
                        type="button"
                        className={`${this.state.showEdit || this.state.showCreate  ? "hide" : ""} btn btn-warning ml-2`}
                        onClick={this.handleCreate}
                    >
                        <i className="fa fa-pencil" aria-hidden="true" /> Create
                            </button>
                    <button
                        type="button"
                        className={`${this.state.showEdit || this.state.showCreate ? "hide" : ""} btn btn-warning ml-2`}
                        onClick={this.handleEdit}
                    >
                        <i className="fa fa-pencil" aria-hidden="true" /> Edit
                            </button> 
                    <div className={`${this.state.showEdit ? "hide" : ""} ${this.state.showCreate ? "hide" : ""}`} >
                        <BootstrapTable
                            data={groupList}
                            version="4"
                            selectRow={this.selectRow}
                            options={this.tableOptions}
                            pagination
                            containerclassName="table text-center table-hover table-bordered table-striped"
                        >
                            <TableHeaderColumn dataField="id" isKey hidden>Id</TableHeaderColumn>

                            <TableHeaderColumn dataField="name" dataSort={true}  >    Group Name </TableHeaderColumn>
                </BootstrapTable>
                    </div>  
                    {this.state.showEdit ? <EditGroup id={this.state.selectedGroupId} /> : ""}
                    {this.state.showCreate ? <CreateGroup /> : ""} 
                </div>
            </div>
        );
    }
}

if (isDomExist("groupTable")) {
    render(<GroupList />, document.getElementById("groupTable"));
}
 