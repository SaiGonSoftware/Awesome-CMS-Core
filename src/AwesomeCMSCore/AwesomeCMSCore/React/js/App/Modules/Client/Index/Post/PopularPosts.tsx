import React from "react";

type PopularPostsProps = {
	popularPost?: object;
};

const PopularPosts: React.SFC<PopularPostsProps> = props => {
	return (
		<div className="widget widget-popular-post wow fadeInUp">
			<div className="widget-content">
				<div className="widget-title">
					<h2>Popular Posts</h2>
				</div>
				<div className="widget-extra-info-holder">
					<div className="widget-posts">
						<div className="post-thumb">
							<img src="./Optimistic Blog Index_files/one.jpg" alt="....." />
						</div>
						<div className="post-title">
							<h5>
								<a href="https://offshorethemes.com/html/optimistic-blog/demo/index-two.php#">
									{props.popularPost.title}
								</a>
							</h5>
						</div>
						<div className="post-view-count post-meta">
							<p>{props.popularPost.views} VIEWS</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PopularPosts;
