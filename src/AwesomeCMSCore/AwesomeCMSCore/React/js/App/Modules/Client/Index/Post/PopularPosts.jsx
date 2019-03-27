import React from 'react'
import PropTypes from 'prop-types'

const PopularPosts = props => {
	const imageSrc = props.medias ? props.medias.path : "./images/No_Image_Available.jpg";
		return (
				<div className="widget widget-popular-post wow fadeInUp">
						<div className="widget-content">
								<div className="widget-title">
										<h2>Popular Posts</h2>
								</div>
								<div className="widget-extra-info-holder">
										<div className="widget-posts">
												<div className="post-thumb">
														<img src={imageSrc} alt="....."/>
												</div>
												<div className="post-title">
														<h5>
																<a href="#">{props.popularPost.title}</a>
														</h5>
												</div>
												<div className="post-view-count post-meta">
														<p>{props.popularPost.views} VIEWS
														</p>
												</div>
										</div>
								</div>
						</div>
				</div>
		)
}

PopularPosts.propTypes = {
		popularPost: PropTypes.object,
		medias: PropTypes.object
}

export default PopularPosts
