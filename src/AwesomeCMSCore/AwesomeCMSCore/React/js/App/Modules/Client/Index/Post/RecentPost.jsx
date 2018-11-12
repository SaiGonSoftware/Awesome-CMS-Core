import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment/src/moment';

const RecentPost = props => {
		return (
				<div className="widget widget-recent-posts wow fadeInUp">
						<div className="widget-content">
								<div className="widget-title">
										<h2>Recent posts</h2>
								</div>
								<div className="widget-extra-info-holder">
										<div className="widget-recent-posts">
												<h5>
														{props.recentPost.title}</h5>
												<br/>		
												<h6>
														at {moment(props.recentPost.dateCreated).format('DD MMMM YYYY')}</h6>
										</div>
								</div>
						</div>
				</div>
		)
}

RecentPost.propTypes = {
		recentPost: PropTypes.object
}

export default RecentPost
