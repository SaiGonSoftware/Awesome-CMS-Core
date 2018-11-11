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
								<aside className="sidebar">
										<div className="sidebar-inner">
												<div className="widget widget-about-me wow fadeInUp">
														<div className="widget-content">
																<div className="widget-about-me-profile">
																		<img src="./Optimistic Blog Index_files/profile.jpeg" alt="..."/>
																</div>
																<div className="widget-extra-info-holder">
																		<div className="widget-author-name">
																				<h3>Anuj Subedi</h3>
																				<span className="author-profession">Ghost Blogger</span>
																		</div>
																		<div className="widget-author-bio">
																				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
																						tempor incididunt.</p>
																		</div>
																		<div className="widget-author-social">
																				<ul className="social-links">
																						<li>
																								<a href="https://facebook.com/"></a>
																						</li>
																						<li>
																								<a href="https://twitter.com/"></a>
																						</li>
																						<li>
																								<a href="https://instagram.com/"></a>
																						</li>
																						<li>
																								<a href="https://youtube.com/"></a>
																						</li>
																						<li>
																								<a href="https://snapchat.com/"></a>
																						</li>
																				</ul>
																		</div>
																		<div className="widget-author-signature">
																				<img src="./Optimistic Blog Index_files/signature-one.jpg" alt="..."/>
																		</div>
																</div>
														</div>
												</div>
												<div className="widget widget-social-links wow fadeInUp">
														<div className="widget-content">
																<div className="widget-title">
																		<h2>I'M social</h2>
																</div>
																<div className="widget-extra-info-holder">
																		<div className="widget-social-links">
																				<ul className="social-links-list">
																						<li className="facebook-link">
																								<a href="http://facebook.com/" className="clearfix" target="_blank">
																										Facebook
																										<span className="social-icon">
																												<i className="fa fa-facebook"></i>
																										</span>
																								</a>
																						</li>
																						<li className="twitter-link">
																								<a href="http://twitter.com/" className="clearfix" target="_blank">
																										Twitter
																										<span className="social-icon">
																												<i className="fa fa-twitter"></i>
																										</span>
																								</a>
																						</li>
																						<li className="googleplus-link">
																								<a href="http://plus.google.com/" className="clearfix" target="_blank">
																										Google Plus
																										<span className="social-icon">
																												<i className="fa fa-google-plus"></i>
																										</span>
																								</a>
																						</li>
																						<li className="instagram-link">
																								<a href="http://instagram.com/" className="clearfix" target="_blank">
																										Instagram
																										<span className="social-icon">
																												<i className="fa fa-instagram"></i>
																										</span>
																								</a>
																						</li>
																						<li className="linkedin-link">
																								<a href="http://linkedin.com/" className="clearfix" target="_blank">
																										Linked In
																										<span className="social-icon">
																												<i className="fa fa-linkedin"></i>
																										</span>
																								</a>
																						</li>
																						<li className="youtube-link">
																								<a href="http://youtube.com/" className="clearfix" target="_blank">
																										Youtube
																										<span className="social-icon">
																												<i className="fa fa-youtube"></i>
																										</span>
																								</a>
																						</li>
																				</ul>
																		</div>
																</div>
														</div>
												</div>
												<div className="widget widget-recent-posts wow fadeInUp">
														<div className="widget-content">
																<div className="widget-title">
																		<h2>Recent posts</h2>
																</div>
																<div className="widget-extra-info-holder">
																		<div className="widget-recent-posts">
																				<div className="widget-rpag-gallery-container swiper-container-horizontal">
																						<div className="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px);">
																								<div className="swiper-slide swiper-slide-active" style="width: 318px;">
																										<img src="./Optimistic Blog Index_files/post-five.jpeg" alt="..."/>
																										<div className="mask"></div>
																										<div className="slide-content">
																												<div className="post-title">
																														<h5>
																																<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">That Evening At Bali Beach Was Wounderful Then Any Other Mornings</a>
																														</h5>
																												</div>
																										</div>
																								</div>
																								<div className="swiper-slide swiper-slide-next" style="width: 318px;">
																										<img src="./Optimistic Blog Index_files/post-six.jpeg" alt="..."/>
																										<div className="mask"></div>
																										<div className="slide-content ">
																												<div className="post-title">
																														<h5>
																																<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">That Evening At Bali Beach Was Wounderful Then Any Other Mornings</a>
																														</h5>
																												</div>
																										</div>
																								</div>
																								<div className="swiper-slide" style="width: 318px;">
																										<img src="./Optimistic Blog Index_files/post-seven.jpeg" alt="..."/>
																										<div className="mask"></div>
																										<div className="slide-content ">
																												<div className="post-title">
																														<h5>
																																<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">That Evening At Bali Beach Was Wounderful Then Any Other Mornings</a>
																														</h5>
																												</div>
																										</div>
																								</div>
																								<div className="swiper-slide" style="width: 318px;">
																										<img src="./Optimistic Blog Index_files/post-four.jpeg" alt="..."/>
																										<div className="mask"></div>
																										<div className="slide-content ">
																												<div className="post-title">
																														<h5>
																																<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">That Evening At Bali Beach Was Wounderful Then Any Other Mornings</a>
																														</h5>
																												</div>
																										</div>
																								</div>
																								<div className="swiper-slide" style="width: 318px;">
																										<img src="./Optimistic Blog Index_files/post-three.jpeg" alt="..."/>
																										<div className="mask"></div>
																										<div className="slide-content">
																												<div className="post-title">
																														<h5>
																																<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">That Evening At Bali Beach Was Wounderful Then Any Other Mornings</a>
																														</h5>
																												</div>
																										</div>
																								</div>
																						</div>
																						<div
																								className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets">
																								<span className="swiper-pagination-bullet swiper-pagination-bullet-active"></span>
																								<span className="swiper-pagination-bullet"></span>
																								<span className="swiper-pagination-bullet"></span>
																								<span className="swiper-pagination-bullet"></span>
																								<span className="swiper-pagination-bullet"></span>
																						</div>
																				</div>
																		</div>
																</div>
														</div>
												</div>
												<div className="widget widget-popular-post wow fadeInUp">
														<div className="widget-content">
																<div className="widget-title">
																		<h2>Popular Posts</h2>
																</div>
																<div className="widget-extra-info-holder">
																		<div className="widget-posts">
																				<div className="post-thumb">
																						<img src="./Optimistic Blog Index_files/one.jpg" alt="....."/>
																				</div>
																				<div className="post-title">
																						<h5>
																								<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">That Evening At Bali Beach Was Wounderful Then Any Other Mornings</a>
																						</h5>
																				</div>
																				<div className="post-view-count post-meta">
																						<p>1277
																								<span>Views</span>
																						</p>
																				</div>
																		</div>
																		<div className="widget-posts">
																				<div className="post-thumb">
																						<img src="./Optimistic Blog Index_files/five.jpg" alt="....."/>
																				</div>
																				<div className="post-title">
																						<h5>
																								<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">5 Reasons Why Ladies Prefer To Have Brown Hair And Black Dress</a>
																						</h5>
																				</div>
																				<div className="post-view-count post-meta">
																						<p>865
																								<span>Views</span>
																						</p>
																				</div>
																		</div>
																		<div className="widget-posts">
																				<div className="post-thumb">
																						<img src="./Optimistic Blog Index_files/four.jpg" alt="....."/>
																				</div>
																				<div className="post-title">
																						<h5>
																								<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">This post has just gone viral with many views</a>
																						</h5>
																				</div>
																				<div className="post-view-count post-meta">
																						<p>721
																								<span>Views</span>
																						</p>
																				</div>
																		</div>
																		<div className="widget-posts">
																				<div className="post-thumb">
																						<img src="./Optimistic Blog Index_files/two.jpg" alt="....."/>
																				</div>
																				<div className="post-title">
																						<h5>
																								<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a>
																						</h5>
																				</div>
																				<div className="post-view-count post-meta">
																						<p>234
																								<span>Views</span>
																						</p>
																				</div>
																		</div>
																</div>
														</div>
												</div>
												<div className="widget widget-facebook-page-box wow fadeInUp">
														<div className="widget-content">
																<div className="widget-title">
																		<h2>Facebook page</h2>
																</div>
																<div className="widget-extra-info-holder">
																		<iframe
																				src="./Optimistic Blog Index_files/page.html"
																				width="300"
																				height="500"
																				style="border:none;overflow:hidden"
																				scrolling="no"
																				frameBorder="0"
																				allowTransparency="true"></iframe>
																</div>
														</div>
												</div>
												<div className="widget widget-category wow fadeInUp">
														<div className="widget-content">
																<div className="widget-title">
																		<h2>Category</h2>
																</div>
																<div className="widget-extra-info-holder">
																		<ul className="widget-category-listings">
																				<li>
																						<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">Lifestyle</a>
																				</li>
																				<li>
																						<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">Health</a>
																				</li>
																				<li>
																						<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">Article</a>
																				</li>
																				<li>
																						<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">Travel</a>
																				</li>
																				<li>
																						<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">Uncategorised</a>
																				</li>
																		</ul>
																</div>
														</div>
												</div>
												<div className="widget widget-popular-post wow fadeInUp">
														<div className="widget-content">
																<div className="widget-title">
																		<h2>Trending Posts</h2>
																</div>
																<div className="widget-extra-info-holder">
																		<div className="widget-posts">
																				<div className="post-thumb">
																						<img src="./Optimistic Blog Index_files/one.jpg" alt="....."/>
																				</div>
																				<div className="post-title">
																						<h5>
																								<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">That Evening At Bali Beach Was Wounderful Then Any Other Mornings</a>
																						</h5>
																				</div>
																				<div className="post-view-count post-meta">
																						<p>444
																								<span>comments</span>
																						</p>
																				</div>
																		</div>
																		<div className="widget-posts">
																				<div className="post-thumb">
																						<img src="./Optimistic Blog Index_files/five.jpg" alt="....."/>
																				</div>
																				<div className="post-title">
																						<h5>
																								<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">5 Reasons Why Ladies Prefer To Have Brown Hair And Black Dress</a>
																						</h5>
																				</div>
																				<div className="post-view-count post-meta">
																						<p>345
																								<span>comments</span>
																						</p>
																				</div>
																		</div>
																		<div className="widget-posts">
																				<div className="post-thumb">
																						<img src="./Optimistic Blog Index_files/four.jpg" alt="....."/>
																				</div>
																				<div className="post-title">
																						<h5>
																								<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">This post has just gone viral with many views</a>
																						</h5>
																				</div>
																				<div className="post-view-count post-meta">
																						<p>329
																								<span>comments</span>
																						</p>
																				</div>
																		</div>
																		<div className="widget-posts">
																				<div className="post-thumb">
																						<img src="./Optimistic Blog Index_files/two.jpg" alt="....."/>
																				</div>
																				<div className="post-title">
																						<h5>
																								<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">Lorem ipsum dolor sit amet, consectetur adipisicing elit</a>
																						</h5>
																				</div>
																				<div className="post-view-count post-meta">
																						<p>256
																								<span>comments</span>
																						</p>
																				</div>
																		</div>
																</div>
														</div>
												</div>
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
										</div>
								</aside>
						</div>
				</div>
		)
}

PostContainer.propTypes = {
		post: PropTypes.object
}

export default PostContainer
