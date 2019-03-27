import React from 'react';
import PropTypes from 'prop-types';

const Social = (props) => {
	return (
		<div className="widget widget-social-links wow fadeInUp">
			<div className="widget-content">
				<div className="widget-title">
					<h2>IM social</h2>
				</div>
				<div className="widget-extra-info-holder">
					<div className="widget-social-links">
						<ul className="social-links-list">
							{props.socialProfileSettings.profileFacebook
								? (
									<li className="facebook-link">
										<a
											href={props.socialProfileSettings.profileFacebook}
											className="clearfix"
											rel="noopener">
											Facebook
											<span className="social-icon">
												<i className="fa fa-facebook"></i>
											</span>
										</a>
									</li>
								)
								: null}
							{props.socialProfileSettings.twitter
								? (
									<li className="twitter-link">
										<a
											href={props.socialProfileSettings.twitter}
											className="clearfix"
											rel="noopener">
											Twitter
											<span className="social-icon">
												<i className="fa fa-twitter"></i>
											</span>
										</a>
									</li>
								)
								: null}
							{props.socialProfileSettings.googlePlus
								? (
									<li className="googleplus-link">
										<a
											href={props.socialProfileSettings.googlePlus}
											className="clearfix"
											rel="noopener">
											Google Plus
											<span className="social-icon">
												<i className="fa fa-google-plus"></i>
											</span>
										</a>
									</li>
								)
								: null}
							{props.socialProfileSettings.instagram
								? (
									<li className="instagram-link">
										<a
											href={props.socialProfileSettings.instagram}
											className="clearfix"
											rel="noopener">
											Instagram
											<span className="social-icon">
												<i className="fa fa-instagram"></i>
											</span>
										</a>
									</li>
								)
								: null}
							{props.socialProfileSettings.linkedin
								? (
									<li className="linkedin-link">
										<a
											href={props.socialProfileSettings.linkedin}
											className="clearfix"
											rel="noopener">
											Linked In
											<span className="social-icon">
												<i className="fa fa-linkedin"></i>
											</span>
										</a>
									</li>
								)
								: null}
							{props.socialProfileSettings.youtube
								? (
									<li className="youtube-link">
										<a
											href={props.socialProfileSettings.youtube}
											className="clearfix"
											rel="noopener">
											Youtube
											<span className="social-icon">
												<i className="fa fa-youtube"></i>
											</span>
										</a>
									</li>
								)
								: null}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

Social.propTypes = {
	socialProfileSettings: PropTypes.object
}

export default Social
