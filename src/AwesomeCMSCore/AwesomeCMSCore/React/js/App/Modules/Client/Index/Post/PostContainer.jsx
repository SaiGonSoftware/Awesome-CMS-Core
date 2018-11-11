import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment/src/moment';

const PostContainer = props => {
		return (
				<div className="row">
						<div className="col-lg-8 col-md-8 col-sm-12 col-12">
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

																<div className="post-share">
																		<div className="share jssocials">
																				<div className="jssocials-shares">
																						<div className="jssocials-share jssocials-share-facebook">
																								<a
																										href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#"
																										className="jssocials-share-link">
																										<i className="fa fa-facebook jssocials-share-logo"></i>
																								</a>
																						</div>
																						<div className="jssocials-share jssocials-share-twitter">
																								<a
																										href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#"
																										className="jssocials-share-link">
																										<i className="fa fa-twitter jssocials-share-logo"></i>
																								</a>
																						</div>
																						<div className="jssocials-share jssocials-share-email">
																								<a
																										target="_self"
																										href="mailto:?subject=Optimistic%20Blog&amp;body=https%3A%2F%2Foffshorethemes.com%2Fhtml%2Foptimistic-blog%2Fdemo%2Findex-two.php"
																										className="jssocials-share-link">
																										<i className="fa fa-at jssocials-share-logo"></i>
																								</a>
																						</div>
																						<div className="jssocials-share jssocials-share-pinterest">
																								<a
																										href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#"
																										className="jssocials-share-link">
																										<i className="fa fa-pinterest jssocials-share-logo"></i>
																								</a>
																						</div>
																						<div className="jssocials-share jssocials-share-pocket">
																								<a
																										href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#"
																										className="jssocials-share-link">
																										<i className="fa fa-get-pocket jssocials-share-logo"></i>
																								</a>
																						</div>
																						<div className="jssocials-share jssocials-share-googleplus">
																								<a
																										href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#"
																										className="jssocials-share-link">
																										<i className="fa fa-google jssocials-share-logo"></i>
																								</a>
																						</div>
																						<div className="jssocials-share jssocials-share-linkedin">
																								<a
																										href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#"
																										className="jssocials-share-link">
																										<i className="fa fa-linkedin jssocials-share-logo"></i>
																								</a>
																						</div>
																				</div>
																		</div>
																</div>
														</div>
												</div>
										</article>
								</div>
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12 col-12">
						</div>
				</div>

		)
}

PostContainer.propTypes = {
		post: PropTypes.object
}

export default PostContainer
