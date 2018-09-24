import React, {Component} from 'react';
import {render} from "react-dom";
import {
		Container,
		Row,
		Col,
		ListGroup,
		ListGroupItem,
		Card,
		Button,
		CardTitle
} from 'reactstrap';
import toastr from "toastr";

import {Get, Delete, Put} from 'Helper/Http';
import {STATUS_CODE, POST_STATUS} from "Helper/AppEnum";
import {isDomExist, navigateToUrl} from "Helper/Util";
import {isEmptyString} from 'Helper/Validation';
import {POST_API} from 'Helper/API_Endpoint/PostEndpoint';

import PostDetail from 'Modules/Admin/Post/PostDetail.jsx';
import PostContainerHeader from './PostContainerHeader.jsx';
import PostContainerDetail from './PostContainerDetail.jsx';

class PostContainer extends Component {
		constructor(props) {
				super(props);
				this.state = {
						posts: null,
						visible: false,
						postId: null,
						activeTab: 'Published'
				}
		}

		componentDidMount() {
				Get(POST_API).then(res => {
						this.setState({posts: res.data});
				});
		}

		navigateToPostDetail = (postId) => {
				if (!isEmptyString(postId)) {
						this.setState({visible: true});
						this.setState({postId});
				}
		}

		onNavigateBack = () => {
				this.setState({visible: false});
		}

		toggle = (tab) => {
				if (this.state.activeTab !== tab) {
						this.setState({activeTab: tab});
				}
		}

		deletePost = (postStatus, postId) => {
				if (postStatus === POST_STATUS.Published) {
						const post = this
								.state
								.posts
								.postsPublished
								.find(x => x.id === postId);
						this
								.state
								.posts
								.postsPublished
								.splice(this.state.posts.postsPublished.indexOf(post), 1);

						let postToUpdate = {
								...this.state.posts
						};

						postToUpdate.numberOfPostPublished -= 1;
						postToUpdate.numberOfDeletedPost += 1;
						postToUpdate
								.postsDeleted
								.push(post);

						this.setState({posts: postToUpdate});
				} else {
						const post = this
								.state
								.posts
								.postsDrafted
								.find(x => x.id === postId);
						this
								.state
								.posts
								.postsDrafted
								.splice(this.state.posts.postsPublished.indexOf(post), 1);

						let postToUpdate = {
								...this.state.posts
						};

						postToUpdate.numberOfDraftedPost -= 1;
						postToUpdate.numberOfDeletedPost += 1;
						postToUpdate
								.postsDeleted
								.push(post);
						this.setState({posts: postToUpdate});
				}

				const url = `${POST_API}/${postId}`;

				Delete(url).then(res => {
						if (res.status === STATUS_CODE.Success) {
								toastr.success('Delete post success');
						} else {
								toastr.error('Something went wrong. Please try again later');
						}
				});
		}

		restorePost = (postId) => {
				const post = this
						.state
						.posts
						.postsDeleted
						.find(x => x.id === postId);
				this
						.state
						.posts
						.postsDeleted
						.splice(this.state.posts.postsDeleted.indexOf(post), 1);
				const url = `${POST_API}/${postId}`;
				Put(url);

				let postToUpdate = {
						...this.state.posts
				};

				postToUpdate.numberOfDeletedPost -= 1;
				postToUpdate.numberOfPostPublished += 1;
				postToUpdate
						.postsPublished
						.push(post);
				this.setState({posts: postToUpdate});

				this.forceUpdate();
		}

		render() {
				const {visible, postId, posts, activeTab} = this.state;

				return (posts
						? <div>
										<Container
												className={!visible
												? 'visiblity'
												: 'hidden'}>
												<Row>
														<Col md="9">
																<ListGroup>
																		<ListGroupItem id="postHeaderSection">
																				<div>
																						<PostContainerHeader activeTab={activeTab} toggle={this.toggle} posts={posts}/>
																						<PostContainerDetail
																								activeTab={activeTab}
																								posts={posts}
																								restorePost={this.restorePost}
																								navigateToPostDetail={this.navigateToPostDetail}
																								deletePost={this.deletePost}/>
																				</div>
																		</ListGroupItem>
																</ListGroup>
														</Col>
														<Col md="3">
																<Card body>
																		<CardTitle>Management</CardTitle>
																		<Button onClick={() => navigateToUrl('/Post/NewPost')}>
																				<i className="fa fa-newspaper-o" aria-hidden="true"></i>
																				&nbsp; New post
																		</Button>
																</Card>
														</Col>
												</Row>
										</Container>
										{postId
												? <PostDetail
																visible={visible}
																onNavigateBack={this.onNavigateBack}
																postId={postId}/>
												: null}
								</div>
						: null)
		}
}

PostContainer.propTypes = {}

export default PostContainer;

if (isDomExist("postList")) {
		render(
				<PostContainer/>, document.getElementById("postList"));
}