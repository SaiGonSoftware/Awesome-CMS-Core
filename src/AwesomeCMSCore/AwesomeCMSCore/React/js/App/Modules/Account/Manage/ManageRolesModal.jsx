import React, {Component} from 'react';
import PropTypes from 'prop-types';
import toastr from "toastr";

import {handleOnChange} from "../../../Helper/StateHelper";
import {Get, PostWithSpinner} from "../../../Helper/Http";
import statusCode from "../../../Helper/StatusCode";

import ACCReactSelect from "../../../Common/ACCSelect/ACCReactSelect.jsx";
import Spinner from "../../../Common/ACCAnimation/Spinner.jsx";
import { ROLE_API_PATH } from './../../../Helper/Enviroment';

class ManageRolesModal extends Component {
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
        Get(ROLE_API_PATH).then(res => {
            res
                .data
                .map(item => {
                    if (item.name !== "Administrator") 
                        value.push({"value": item.id, "label": item.name})
                });
            this.setState({value});
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        PostWithSpinner
            .call(this, `${ROLE_API_PATH}/manage`, {selectOptionViewModels: this.state.value})
            .then(res => {
                if (res.status === statusCode.Success) 
                    toastr.success("Create success");
                }
            )
            .catch(() => {
                toastr.error("Something went wrong.Please try again");
            });
    };

    renderButton() {
        const isDataNotValid = this.state.value.length === 0;

        if (this.state.loading) {
            return <Spinner/>;
        } else {
            return (
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                    disabled={isDataNotValid}>
                    Save
                </button>
            );
        }
    }

    render() {
        const {options, value} = this.state;

        return (
            <div
                className="modal fade"
                id={this.props.id}
                role="dialog"
                aria-labelledby={this.props.id}
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Manage Roles
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ACCReactSelect
                                id="tagCreate"
                                {...options}
                                value={value}
                                handleOnChange={value => handleOnChange.call(this, value)}/>
                            <br/>
                        </div>
                        <div className="modal-footer">
                            {this.renderButton()}
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ManageRolesModal.propTypes = {
    id: PropTypes.string.isRequired
};

export default ManageRolesModal;