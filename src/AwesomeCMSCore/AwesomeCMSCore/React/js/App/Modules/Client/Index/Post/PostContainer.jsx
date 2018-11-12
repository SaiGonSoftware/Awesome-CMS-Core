import React from 'react';
import PropTypes from 'prop-types';

import RecentPost from './RecentPost.jsx';
import PostList from './PostList.jsx';
import Social from './Social.jsx';
import AuthorDetail from './AuthorDetail.jsx';
import PopularPosts from './PopularPosts.jsx';

const PostContainer = props => {
		return (
				<div className="row">
						<div className="col-lg-8 col-md-8 col-sm-12 col-12">
								{props
										.vm
										.posts
										.map(post => {
												return (<PostList key={post.id} post={post}/>)
										})}
						</div>
						<div className="col-lg-4 col-md-4 col-sm-12 col-12">
								<aside className="sidebar">
										<div className="sidebar-inner">
												<AuthorDetail/>
												<Social/>
												<RecentPost recentPost={props.vm.recentPost}/> {props
														.vm
														.popularPosts
														.map(popularPost => {
																return (<PopularPosts key={popularPost.id} popularPost={popularPost}/>)
														})}
												<div className="    display: inline; wow fadeInUp">
														<div className="widget-content">
																<div className="widget-title">
																		<h2>Facebook page</h2>
																</div>
																<div className="widget-extra-info-holder">
																		<iframe
																				src="./Optimistic Blog Index_files/page.html"
																				width="300"
																				height="500"
																				scrolling="no"
																				frameBorder="0"></iframe>
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
		vm: PropTypes.object
}

export default PostContainer
