import React, {Component} from "react";
import {render} from "react-dom";

import {onChange, onBlur} from "Helper/StateHelper";
import {isDomExist} from "Helper/Util";
import {shouldMarkError, validateInput, isFormValid} from "Helper/Validation";
import {PostWithSpinner} from "Helper/Http";
import {FORGOT_PASSWORD_API} from 'Helper/API_Endpoint/AccountEndpoint';

import ACCInput from "Common/ACCInput/ACCInput.jsx";
import ACCButton from "Common/ACCButton/ACCButton.jsx";

class ForgotPassword extends Component {
		constructor(props) {
				super(props);
				this.state = {
						email: "",
						loading: false,
						showSuccessMessage: false,
						touched: {
								email: false
						}
				}

				this.validationArr = [];
		}

		forgotPassword = e => {
				if (!isFormValid(this.validationArr)) {
						return;
				}

				e.preventDefault();
				PostWithSpinner
						.call(this, FORGOT_PASSWORD_API, {Email: this.state.email})
						.then(() => {
								this.setState({showSuccessMessage: true})
						});
		}

		render() {
				const {email, loading, showSuccessMessage} = this.state;
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
												<form onSubmit={this.forgotPassword}>
														<div id="forgotPasswordFormContent">
																{showSuccessMessage
																		? <div className="alert alert-warning alert-dismissible fade show" role="alert">
																						If your account register with our system we will send email for you to reset
																						password
																				</div>
																		: null}
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
																		class="btn btn-primary btn-block"
																		label="Reset Password"/>
														</div>
												</form>
										</div>
								</div>
						</div>
				);
		}
}

if (isDomExist("forgotPassForm")) {
		render(
				<ForgotPassword/>, document.getElementById("forgotPassForm"));
}

export default ForgotPassword;