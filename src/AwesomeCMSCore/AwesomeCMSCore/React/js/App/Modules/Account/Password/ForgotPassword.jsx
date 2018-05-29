import React, {Component} from "react";
import {render} from "react-dom";
import PropTypes from "prop-types";

import {onChange, onBlur} from "../../../Helper/StateHelper";
import {navigateToUrl, isDomExist} from "../../../Helper/Util";
import {shouldMarkError, validateInput, isFormValid} from "../../../Helper/Validation";
import {PostWithSpinner} from "../../../Helper/Http";
import env from "../../../Helper/EnvConfig";
import statusCode from "../../../Helper/StatusCode";

import ACCInput from "../../../Common/ACCInput/ACCInput.jsx";
import ACCButton from "../../../Common/ACCButton/ACCButton.jsx";

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            loading: false,
            touched: {
                email: false
            }
        }

        this.validationArr = [];
    }

    resetPassword = e => {
        if (!isFormValid(this.validationArr)) {
            return;
        }

        e.preventDefault();
        PostWithSpinner
            .call(this, env.forgotPassword, {Email: this.state.email})
            .then(res => {
                //if (res.status === statusCode.Success) {}
            })
            .catch((err) => {});
    }

    render() {
        const {email, loading} = this.state;
        this.validationArr = [
            {
                email: email
            }
        ];

        const errors = validateInput.call(this, this.validationArr);

        return (
            <div id="forgotPasswordContainer">
                <div className="card">
                    <div className="card-header text-center">
                        Forgot Password
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.resetPassword}>
                            <div id="forgotPasswordFormContent">
                                <ACCInput
                                    className={shouldMarkError.call(this, "email", errors)}
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    required="required"
                                    value={email}
                                    onChange={email => onChange.call(this, email)}
                                    onBlur={email => onBlur.call(this, email)}/>
                                <ACCButton
                                    validationArr={this.validationArr}
                                    loading={loading}
                                    btnBlocked="btn-block"
                                    label="Reset Password"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

if (isDomExist("forgot-pass-form")) {
    render(
        <ForgotPassword/>, document.getElementById("forgot-pass-form"));
}

export default ForgotPassword;