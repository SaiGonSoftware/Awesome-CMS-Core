import React, {Component} from "react";
import {render} from "react-dom";
import {Row, Col, ListGroup, ListGroupItem} from "reactstrap";
import {Get, Put} from "Helper/Http";
import {isDomExist} from "Helper/Util";
import {COMMENTS_ENDPOINT} from "Helper/API_Endpoint/CommentEndpoint";
import {CommentStatus, STATUS_CODE} from "Helper/AppEnum";
import toastr from "toastr";

import CommentContainerHeader from "./CommentContainerHeader.jsx";
import CommentContainerBody from "./CommentContainerBody.jsx";

class CommentContainer extends Component {
		constructor(props) {
				super(props);

				this.state = {
						comments: null,
						activeTab: "All"
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
						case CommentStatus.Pending:
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
										updatedComments.numberOfPendingComments -= 1;

										btnSelector = document.getElementById(`allComments-${commentId}`);
										btnSelector
												.classList
												.add("btn-outline-success-active");

										Put(`${COMMENTS_ENDPOINT}/comment/${commentId}/${CommentStatus.Approved}`).then(res => {
												if (res.status === STATUS_CODE.Success) {
														toastr.info("Edit comment status success");
														this.setState({comments: updatedComments});
												}
										});
								}
								break;
						case CommentStatus.Approved:
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
										updatedComments.numberOfPendingComments -= 1;

										btnSelector = document.getElementById(`allComments-${commentId}`);
										btnSelector
												.classList
												.add("btn-outline-success-active");

										Put(`${COMMENTS_ENDPOINT}/comment/${commentId}/${CommentStatus.Approved}`).then(res => {
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

										updatedComments.numberOfApprovedComments -= 1;
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

										Put(`${COMMENTS_ENDPOINT}/comment/${commentId}/${CommentStatus.Pending}`).then(res => {
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
						case CommentStatus.Spam:
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

										updatedComments.numberOfSpamComments -= 1;
										updatedComments.numberOfApprovedComments += 1;

										Put(`${COMMENTS_ENDPOINT}/comment/${commentId}/${CommentStatus.Approved}`).then(res => {
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
						case CommentStatus.Trash:
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

										updatedComments.numberOfDeletedComments -= 1;
										updatedComments.numberOfApprovedComments += 1;

										Put(`${COMMENTS_ENDPOINT}/comment/${commentId}/${CommentStatus.Approved}`).then(res => {
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

		}
		render() {
				const {comments, activeTab} = this.state;

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
																				toggleSpamComment={this.toggleSpamComment}/>
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
