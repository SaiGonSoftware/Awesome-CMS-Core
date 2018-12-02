import React, {Component} from 'react';
import toastr from "toastr";

import {onChange} from "Helper/StateHelper";

class NewsLetter extends Component {
		constructor(props) {
				super(props);
				this.state = {
						email: null
				}
		}

		registerEmail() {
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
														<p>Subscribe to newsletter to be updated with all the latest trends and products.</p>
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