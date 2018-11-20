import React, {Component} from 'react'

class NewsLetter extends Component {
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
																				type="email"
																				name="newsletter-email"
																				placeholder="Email Address ..."
																				className="form-control"/>
																</div>
																<div className="form-group">
																		<button type="submit" name="submit" className="layout-one-btn">Subscribe</button>
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