import React from 'react';
import PropTypes from 'prop-types';

import RecentPost from './RecentPost.jsx';
import PostList from './PostList.jsx';
import PopularPosts from './PopularPosts.jsx';

import Social from 'Shared/Social.jsx';
import AuthorDetail from 'Shared/AuthorDetail.jsx';
import Facebook from 'Shared/Facebook.jsx';
import Category from 'Shared/Category.jsx';
import NewsLetter from 'Shared/NewsLetter.jsx';

const PostContainer = props => {
	return (
		<div className="row">
			<div className="col-lg-8 col-md-8 col-sm-12 col-12">
				{props
					.vm
					.posts
					.map(post => {
						return (<PostList key={post.id} post={post} medias={post.medias}/>)
					})}
			</div>
			<div className="col-lg-4 col-md-4 col-sm-12 col-12">
				<aside className="sidebar">
					<div className="sidebar-inner">
						<AuthorDetail author={props.vm.profileSetting}/>
						<RecentPost recentPost={props.vm.recentPost}/> {props
							.vm
							.popularPosts
							.map(popularPost => {
								return (<PopularPosts key={popularPost.id} popularPost={popularPost}/>)
							})}

						<Social socialProfileSettings={props.vm.socialProfileSettings}/> 
						{props.vm.socialProfileSettings.facebookPage
							? <Facebook/>
							: null}
						<Category categories={props.vm.categories}/>
						<NewsLetter/>
					</div>
				</aside>
			</div>
		</div>
	)
}

PostContainer.propTypes = {
	vm: PropTypes.object,
	socialProfileSettings: PropTypes.string
}

export default PostContainer
