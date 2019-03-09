import React, {Component} from "react";
import {render} from "react-dom";
import {Row, Col, ListGroup, ListGroupItem} from "reactstrap";
import toastr from "toastr";

import {Get, Put} from "Helper/Http";
import {isDomExist} from "Helper/Util";
import {PostWithSpinner} from "Helper/Http";
import {COMMENTS_ENDPOINT} from "Helper/API_Endpoint/CommentEndpoint";
import {COMMENT_STATUS, STATUS_CODE} from "Helper/AppEnum";

import CommentContainerHeader from "./CommentContainerHeader.jsx";
import CommentContainerBody from "./CommentContainerBody.jsx";

class CommentContainer extends Component {
		constructor(props) {
				super(props);

				this.state = {
						comments: null,
						activeTab: "All",
						opened: []
				};
		}

		componentDidMount() {
				Get(COMMENTS_ENDPOINT).then(res => {
						this.setState({comments: res.data});
				});
		}

		toggle = tab => {
				if (this.state.activeTab !== tab) {
						this.setState({activeTab: tab});
				}
		};

		toggleApprovedComment = (commentStatus, commentId) => {
				let filteredComments;
				let commentToRemove;
				let updatedComments;
				let btnSelector;

				updatedComments = {
						...this.state.comments
				};

				switch (commentStatus) {
						case COMMENT_STATUS.Pending:
								commentToRemove = this
										.state
										.comments
										.pendingComments
										.find(cm => cm.comment.id == commentId);

								if (this.state.comments.pendingComments.includes(commentToRemove)) {
										updatedComments
												.pendingComments
												.splice(this.state.comments.pendingComments.indexOf(commentToRemove), 1);
										updatedComments
												.approvedComments
												.push(commentToRemove);

										updatedComments.numberOfApprovedComments += 1;
										updatedComments.numberOfPendingComments > 0
												? updatedComments.numberOfPendingComments -= 1
												: updatedComments.numberOfPendingComments;

										btnSelector = document.getElementById(`allComments-${commentId}`);
										btnSelector
												.classList
												.add("btn-outline-success-active");

										Put(`${COMMENTS_ENDPOINT}/${commentId}/${COMMENT_STATUS.Approved}`).then(res => {
												if (res.status === STATUS_CODE.Success) {
														toastr.info("Edit comment status success");
														this.setState({comments: updatedComments});
												}
										});
								}
								break;
						case COMMENT_STATUS.Approved:
								commentToRemove = this
										.state
										.comments
										.pendingComments
										.find(cm => cm.comment.id == commentId);

								if (this.state.comments.pendingComments.includes(commentToRemove)) {
										updatedComments
												.pendingComments
												.splice(this.state.comments.pendingComments.indexOf(commentToRemove), 1);
										updatedComments
												.approvedComments
												.push(commentToRemove);

										updatedComments.numberOfApprovedComments += 1;
										updatedComments.numberOfPendingComments > 0
												? updatedComments.numberOfPendingComments -= 1
												: updatedComments.numberOfPendingComments;

										btnSelector = document.getElementById(`allComments-${commentId}`);
										btnSelector
												.classList
												.add("btn-outline-success-active");

										Put(`${COMMENTS_ENDPOINT}/${commentId}/${COMMENT_STATUS.Approved}`).then(res => {
												if (res.status === STATUS_CODE.Success) {
														toastr.info("Edit comment status success");
														this.setState({comments: updatedComments});
												}
										});
								} else {
										commentToRemove = this
												.state
												.comments
												.approvedComments
												.find(cm => cm.comment.id == commentId);
										filteredComments = this
												.state
												.comments
												.approvedComments
												.filter(cm => cm.comment.id != commentId);

										updatedComments.numberOfApprovedComments > 0
												? updatedComments.numberOfApprovedComments -= 1
												: updatedComments.numberOfApprovedComments;
										updatedComments.numberOfPendingComments += 1;

										updatedComments.approvedComments = filteredComments;
										updatedComments
												.pendingComments
												.push(commentToRemove);
										btnSelector = document.getElementById(`allComments-${commentId}`);
										btnSelector
												.classList
												.remove("btn-outline-success-active");
										btnSelector = document.getElementById(`approvedComments-${commentId}`);
										btnSelector
												.classList
												.remove("btn-outline-success-active");

										Put(`${COMMENTS_ENDPOINT}/${commentId}/${COMMENT_STATUS.Pending}`).then(res => {
												if (res.status === STATUS_CODE.Success) {
														toastr.info("Edit comment status success");
														this.setState({comments: updatedComments});
														btnSelector = document.getElementById(`pendingComments-${commentId}`);
														btnSelector
																.classList
																.remove("btn-outline-success-active");
												}
										});
								}
								break;
						case COMMENT_STATUS.Spam:
								commentToRemove = this
										.state
										.comments
										.spamComments
										.find(cm => cm.comment.id == commentId);
								if (this.state.comments.spamComments.includes(commentToRemove)) {
										updatedComments
												.spamComments
												.splice(this.state.comments.spamComments.indexOf(commentToRemove), 1);
										updatedComments
												.approvedComments
												.push(commentToRemove);

										updatedComments.numberOfSpamComments > 0
												? updatedComments.numberOfSpamComments -= 1
												: updatedComments.numberOfSpamComments;
										updatedComments.numberOfApprovedComments += 1;

										Put(`${COMMENTS_ENDPOINT}/${commentId}/${COMMENT_STATUS.Approved}`).then(res => {
												if (res.status === STATUS_CODE.Success) {
														toastr.info("Edit comment status success");
														this.setState({comments: updatedComments});

														btnSelector = document.getElementById(`approvedComments-${commentId}`);
														btnSelector
																.classList
																.add("btn-outline-success-active");

														btnSelector = document
																.getElementById(`approvedComments-actions-${commentId}`)
																.getElementsByTagName('button');

														for (let item of btnSelector) {
																item
																		.classList
																		.remove("spam-actions-hidden");
														}
												}
										});
								}
								break;
						case COMMENT_STATUS.Trash:
								commentToRemove = this
										.state
										.comments
										.deletedComments
										.find(cm => cm.comment.id == commentId);
								if (this.state.comments.deletedComments.includes(commentToRemove)) {
										updatedComments
												.deletedComments
												.splice(this.state.comments.deletedComments.indexOf(commentToRemove), 1);
										updatedComments
												.approvedComments
												.push(commentToRemove);

										updatedComments.numberOfDeletedComments > 0
												? updatedComments.numberOfDeletedComments -= 1
												: updatedComments.numberOfDeletedComments;
										updatedComments.numberOfApprovedComments += 1;

										Put(`${COMMENTS_ENDPOINT}/${commentId}/${COMMENT_STATUS.Approved}`).then(res => {
												if (res.status === STATUS_CODE.Success) {
														toastr.info("Edit comment status success");
														this.setState({comments: updatedComments});

														btnSelector = document.getElementById(`approvedComments-${commentId}`);
														btnSelector
																.classList
																.add("btn-outline-success-active");

														btnSelector = document
																.getElementById(`approvedComments-actions-${commentId}`)
																.getElementsByTagName('button');

														for (let item of btnSelector) {
																item
																		.classList
																		.remove("trash-actions-hidden");
														}
												}
										});
								}
								break;
						default:
								break;
				}
		};

		toggleSpamComment = (commentStatus, commentId) => {
				let commentToRemove;
				let updatedComments;
				let btnSelector;

				updatedComments = {
						...this.state.comments
				};

				switch (commentStatus) {
						case COMMENT_STATUS.Approved:
								commentToRemove = this
										.state
										.comments
										.allComments
										.find(cm => cm.comment.id == commentId);

								updatedComments
										.allComments
										.splice(this.state.comments.allComments.indexOf(commentToRemove), 1);

								updatedComments
										.approvedComments
										.splice(this.state.comments.approvedComments.indexOf(commentToRemove), 1);

								updatedComments
										.spamComments
										.push(commentToRemove);

								updatedComments.numberOfApprovedComments > 0
										? updatedComments.numberOfApprovedComments -= 1
										: updatedComments.numberOfApprovedComments;
								updatedComments.numberOfSpamComments += 1;

           Put(`${COMMENTS_ENDPOINT}/${commentId}/${COMMENT_STATUS.Spam}`).then(res => {
										if (res.status === STATUS_CODE.Success) {
												toastr.info("Edit comment status success");
												this.setState({comments: updatedComments});

												btnSelector = document
														.getElementById(`spamComments-actions-${commentId}`)
														.getElementsByTagName('button');

												for (let i = 0; i < btnSelector.length; i++) {
														if (i != 0 && i != 2) {
																btnSelector[i]
																		.classList
																		.add("spam-actions-hidden");
														}
												}

												btnSelector = document.getElementById(`spamComments-${commentId}`);
												btnSelector
														.classList
														.remove("btn-outline-success-active");
										}
								});
								break;
						default:
								break;
				}
		}

		toggleDeleteComment = (commentStatus, commentId) => {
				let commentToRemove;
				let updatedComments;
				let btnSelector;

				updatedComments = {
						...this.state.comments
				};

				switch (commentStatus) {
						case COMMENT_STATUS.Pending:
								commentToRemove = this
										.state
										.comments
										.allComments
										.find(cm => cm.comment.id == commentId);

								updatedComments
										.allComments
										.splice(this.state.comments.allComments.indexOf(commentToRemove), 1);

								updatedComments
										.deletedComments
										.push(commentToRemove);

								updatedComments.numberOfPendingComments > 0
										? updatedComments.numberOfPendingComments -= 1
										: updatedComments.numberOfPendingComments;
								updatedComments.numberOfDeletedComments += 1;

								Put(`${COMMENTS_ENDPOINT}/${commentId}/${COMMENT_STATUS.Trash}`).then(res => {
										if (res.status === STATUS_CODE.Success) {
												toastr.info("Edit comment status success");
												this.setState({comments: updatedComments});

												btnSelector = document
														.getElementById(`commentsDeleted-actions-${commentId}`)
														.getElementsByTagName('button');

												for (let i = 0; i < btnSelector.length; i++) {
														if (i != 0) {
																btnSelector[i]
																		.classList
																		.add("trash-actions-hidden");
														}
												}
										}
								});
								break;
						case COMMENT_STATUS.Approved:
								commentToRemove = this
										.state
										.comments
										.approvedComments
										.find(cm => cm.comment.id == commentId);

								updatedComments
										.approvedComments
										.splice(this.state.comments.approvedComments.indexOf(commentToRemove), 1);

								commentToRemove = this
										.state
										.comments
										.allComments
										.find(cm => cm.comment.id == commentId);

								updatedComments
										.allComments
										.splice(this.state.comments.allComments.indexOf(commentToRemove), 1);

								updatedComments
										.deletedComments
										.push(commentToRemove);

								updatedComments.numberOfApprovedComments > 0
										? updatedComments.numberOfApprovedComments -= 1
										: updatedComments.numberOfApprovedComments;
								updatedComments.numberOfDeletedComments += 1;

								Put(`${COMMENTS_ENDPOINT}/${commentId}/${COMMENT_STATUS.Trash}`).then(res => {
										if (res.status === STATUS_CODE.Success) {
												toastr.info("Edit comment status success");
												this.setState({comments: updatedComments});

												btnSelector = document
														.getElementById(`commentsDeleted-actions-${commentId}`)
														.getElementsByTagName('button');

												for (let i = 0; i < btnSelector.length; i++) {
														if (i != 0) {
																btnSelector[i]
																		.classList
																		.add("trash-actions-hidden");
														}
												}

												btnSelector = document.getElementById(`commentsDeleted-${commentId}`);
												btnSelector
														.classList
														.remove("btn-outline-success-active");
										}
								});
								break;
						case COMMENT_STATUS.Spam:
								commentToRemove = this
										.state
										.comments
										.spamComments
										.find(cm => cm.comment.id == commentId);

								updatedComments
										.spamComments
										.splice(this.state.comments.spamComments.indexOf(commentToRemove), 1);

								updatedComments
										.deletedComments
										.push(commentToRemove);

								updatedComments.numberOfSpamComments > 0
										? updatedComments.numberOfSpamComments -= 1
										: updatedComments.numberOfSpamComments;
								updatedComments.numberOfDeletedComments += 1;

								Put(`${COMMENTS_ENDPOINT}/${commentId}/${COMMENT_STATUS.Trash}`).then(res => {
										if (res.status === STATUS_CODE.Success) {
												toastr.info("Edit comment status success");
												this.setState({comments: updatedComments});

												btnSelector = document
														.getElementById(`commentsDeleted-actions-${commentId}`)
														.getElementsByTagName('button');

												for (let i = 0; i < btnSelector.length; i++) {
														if (i != 0) {
																btnSelector[i]
																		.classList
																		.add("trash-actions-hidden");
														}
												}

												btnSelector = document.getElementById(`commentsDeleted-${commentId}`);
												btnSelector
														.classList
														.remove("btn-outline-success-active");
										}
								});
								break;
						default:
								break;
				}
		}

		toggleReplyBox = e => {
				const id = e.currentTarget.dataset.id;
				if (this.state.opened.indexOf(id) != -1) {
						// remove from array
						this.setState({
								opened: this
										.state
										.opened
										.filter(o => o !== id)
						})
				} else {
						this.setState({
								opened: [
										...this.state.opened,
										id
								]
						})
				}
		}

		onReply = (comment, e) => {
				if (e.charCode === 13) {
						const replyViewModel = {
								Comment: comment.parentComment !== null ? comment.parentComment : comment,
								CommentBody: e.target.value
						};

						const url = `${COMMENTS_ENDPOINT}/${comment.id}/reply`;
						PostWithSpinner
								.call(this, url, replyViewModel)
								.then(res => {
										if (res.status === STATUS_CODE.Success) 
												toastr.info("Reply comment success");
										}
								)
								.catch(() => {
										toastr.error("Something went wrong. Please try again");
								});
				}
		}

		render() {
				const {comments, activeTab, opened} = this.state;

				return comments
						? (
								<Row>
										<Col md="12" id="commentHeaderSection">
												<ListGroup>
														<ListGroupItem>
																<div>
																		<CommentContainerHeader
																				activeTab={activeTab}
																				toggle={this.toggle}
																				comments={comments}/>
																		<CommentContainerBody
																				comments={comments}
																				activeTab={activeTab}
																				toggleApprovedComment={this.toggleApprovedComment}
																				toggleSpamComment={this.toggleSpamComment}
																				toggleDeleteComment={this.toggleDeleteComment}
																				toggleReplyBox={this.toggleReplyBox}
																				onReply={this.onReply}
																				opened={opened}/>
																</div>
														</ListGroupItem>
												</ListGroup>
										</Col>
								</Row>
						)
						: null;
		}
}

export default CommentContainer;

if (isDomExist("comments")) {
		render(
				<CommentContainer/>, document.getElementById("comments"));
}
