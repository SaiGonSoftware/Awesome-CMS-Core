import React from 'react'
import PropTypes from 'prop-types'

import SocialLinks from "../../../Shared/SocialLinks.jsx"

const AuthorDetail = (props) => {
	if (props.author) {
		return (
			<div className="widget widget-about-me wow fadeInUp">
				<div className="widget-content">
					<div className="widget-about-me-profile">
						<img src={props.author.storePath} alt={props.author.shortIntro}/>
					</div>
					<div className="widget-extra-info-holder">
						<div className="widget-author-name">
							<h3>{props.author.userName}</h3>
							<span className="author-profession">{props.author.jobTitle}</span>
						</div>
						<div className="widget-author-bio">
							<p>{props.author.shortIntro}</p>
						</div>
						<div className="widget-author-social">
							<SocialLinks/>
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return null;
	}
}

AuthorDetail.propTypes = {
	author: PropTypes.object
}
export default AuthorDetail
