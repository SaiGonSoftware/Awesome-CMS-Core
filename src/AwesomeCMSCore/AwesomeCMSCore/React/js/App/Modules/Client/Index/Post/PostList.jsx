import React from "react";
import PropTypes from "prop-types";

import moment from "moment/src/moment";
import PostShare from "./PostShare.jsx";

const PostList = props => {
	const categories = JSON.parse(props.post.categories) || [];
	const tags = JSON.parse(props.post.tags) || [];
	const imageSrc = props.medias ? props.medias.path : "./images/No_Image_Available.jpg";

	return (
		<div className="main-post-area-holder">
			<article className="post-details-holder layout-two-post-details-holder wow  fadeInUp">
				<div className="row">
					<div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
						<div className="post-image">
							<img src={imageSrc} alt="...." />
						</div>
					</div>
					<div className="col-lg-7 col-md-7 col-sm-7 col-xs-12"> 
						<div className="post-meta-category">
							<ul className="tags">
								{categories.map((categorie, index) => {
									return (
										<li key={index}>
											<a href="#" className="tag">
												{categorie}
											</a>
										</li>
									);
								})}
								{tags.map((tag, index) => {
									return (
										<li key={index}>
											<a href="#" className="tag">
												{tag}
											</a>
										</li>
									);
								})}
							</ul>
						</div>
						<div className="post-title">
							<h2>
								<a href="#">
									{props.post.title}
								</a>
							</h2>
						</div>
						<div className="post-meta-posted-date">
							<p>
								<a href="#">
									{moment(props.post.dateCreated).format("DD MMMM YYYY")}
								</a>
							</p>
						</div>

						<PostShare />
					</div>
				</div>
			</article>
		</div>
	);
};

PostList.propTypes = {
	post: PropTypes.object,
	medias: PropTypes.object
};

export default PostList;
