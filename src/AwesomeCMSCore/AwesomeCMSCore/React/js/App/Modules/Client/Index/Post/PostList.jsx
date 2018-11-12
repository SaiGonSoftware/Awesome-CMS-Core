import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment/src/moment';
import PostShare from './PostShare.jsx';

const PostList = props => {
	console.log(props);
		return (
				<div className="main-post-area-holder">
						<article
								className="post-details-holder layout-two-post-details-holder wow  fadeInUp">
								<div className="row">
										<div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
												<div className="post-image">
														<img src="./images/No_Image_Available.jpg" alt="...."/>
												</div>
										</div>
										<div className="col-lg-7 col-md-7 col-sm-7 col-xs-12">
												<div className="post-meta-category">
														<p>
																<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">{props.post.categories}</a>
														</p>
												</div>
												<div className="post-title">
														<h2>
																<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">{props.post.title}</a>
														</h2>
												</div>
												<div className="post-meta-posted-date">
														<p>
																<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">{moment(props.post.dateCreated).format('DD MMMM YYYY')}</a>
														</p>
												</div>

												<PostShare/>
										</div>
								</div>
						</article>
				</div>
		)
}

PostList.propTypes = {
		post: PropTypes.object
}

export default PostList
