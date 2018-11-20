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
										<div className="widget-recent-posts text-right">
												<h5>
														{props.recentPost.title}</h5>
												<div className="blockquote-footer">{moment(props.recentPost.dateCreated).format('DD MMMM YYYY')}</div>
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
