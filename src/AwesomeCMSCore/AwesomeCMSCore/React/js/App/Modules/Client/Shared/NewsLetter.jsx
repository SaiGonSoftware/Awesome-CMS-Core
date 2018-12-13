import React, {Component} from 'react';
import toastr from "toastr";

import {Post} from "Helper/Http";
import {onChange} from "Helper/StateHelper";
import {NEWLETTER_ENDPOINT} from 'Helper/API_Endpoint/EmailEndpoint';
import {STATUS_CODE} from 'Helper/AppEnum';

class NewsLetter extends Component {
		constructor(props) {
				super(props);
				this.state = {
						email: null
				}
		}

		registerEmail(e) {
				e.preventDefault();

				Post(`${NEWLETTER_ENDPOINT}/Register`, {Email: this.state.email}).then(res => {
						if (res.status === STATUS_CODE.Success) {
								toastr.info("Thank you for register");
						}
				}).catch((err) => {
						switch (err.response.status) {
								case STATUS_CODE.EmailRegistered:
										return toastr.warning("Email already registered");
								default:
										toastr.error("Something went wrong. Please try again");
						}
				})
		}

		render() {
				return (
						<div className="widget widget-newsletter wow fadeInUp">
								<div className="widget-content">
										<div className="widget-title">
												<h2>Newsletter</h2>
										</div>
										<div className="widget-extra-info-holder">
												<div className="widget-newsletter-content">
														<p>Subscribe to newsletter to be updated with all the latest posts.</p>
														<form>
																<div className="form-group">
																		<input
																				name="email"
																				type="email"
																				placeholder="Email Address ..."
																				className="form-control"
																				onChange={email => onChange.call(this, email)}/>
																</div>
																<div className="form-group">
																		<button
																				onClick={e => this.registerEmail(e)}
																				name="submit"
																				className="layout-one-btn">Subscribe</button>
																</div>
														</form>
												</div>
										</div>
								</div>
						</div>
				)
		}
}

export default NewsLetter