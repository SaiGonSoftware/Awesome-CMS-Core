import React from 'react'
import PropTypes from 'prop-types'
import {
	Row,
	Col,
	ListGroup,
	ListGroupItem,
	TabContent,
	TabPane,
	Input
} from 'reactstrap';
import moment from 'moment/src/moment';
import { COMMENT_STATUS } from "Helper/AppEnum";
import CommentActions from './CommentActions.jsx';

const CommentContainerBody = (props) => {
	return (
		<TabContent activeTab={props.activeTab}>
			<TabPane tabId="All" className="commentsTabWrapper">
				<Row>
					<Col sm="12">
						<ListGroup>
							{props.comments.allComments
								? props
									.comments
									.allComments
									.filter(cm => cm.comment.commentStatus !== COMMENT_STATUS.Spam && cm.comment.commentStatus !== COMMENT_STATUS.Trash)
									.map(cm => {
										return (
											<div className="allComments" key={cm.comment.id}>
												<ListGroupItem className="commentItem">
													<h3>{cm.user.email}
														&nbsp;- {moment(cm.comment.dateCreated).format('DD MMMM YYYY')}</h3>
													<h3>{cm.post.title}</h3>
													{cm.comment.parentComment
														? <div>
															<blockquote className="blockquote">
																<footer className="blockquote-footer">In Reply to: &nbsp;
																																		<cite title={cm.comment.parentComment.content}>{cm.comment.parentComment.content}</cite>
																</footer>
															</blockquote>
															<p className="mb-0">{cm.comment.content}</p>
														</div>
														: <blockquote className="blockquote">
															<small className="text-muted">{cm.comment.content}</small>
														</blockquote>}
													<CommentActions
														comment={cm.comment}
														toggleApprovedComment={() => props.toggleApprovedComment(cm.comment.commentStatus, cm.comment.id)}
														toggleSpamComment={() => props.toggleSpamComment(cm.comment.commentStatus, cm.comment.id)}
														toggleDeleteComment={() => props.toggleDeleteComment(cm.comment.commentStatus, cm.comment.id)}
														toggleReplyBox={(e) => props.toggleReplyBox(e)}
														id={`allComments-${cm.comment.id}`}
														selector={`allComments-actions-${cm.comment.id}`} />
													<Input
														className={props
															.opened
															.indexOf(`allComments-${cm.comment.id}`) !== -1
															? "visiblity"
															: "hidden"}
														onKeyPress={(e) => props.onReply(cm.comment, e)}></Input>
												</ListGroupItem>
											</div>
										)
									})
								: null}
						</ListGroup>
					</Col>
				</Row>
			</TabPane>
			<TabPane tabId="Pending" className="commentsTabWrapper">
				<Row>
					<Col sm="12">
						<ListGroup>
							{props.comments.pendingComments
								? props
									.comments
									.pendingComments
									.map(cm => {
										return (
											<div className="pendingComments" key={cm.comment.id}>
												<ListGroupItem className="commentItem">
													<h3>{cm.user.email}
														&nbsp;- {moment(cm.comment.dateCreated).format('DD MMMM YYYY')}</h3>
													<h3>{cm.post.title}</h3>
													{cm.comment.parentComment
														? <div>
															<blockquote className="blockquote">
																<footer className="blockquote-footer">In Reply to: &nbsp;
																																		<cite title={cm.comment.parentComment.content}>{cm.comment.parentComment.content}</cite>
																</footer>
															</blockquote>
															<p className="mb-0">{cm.comment.content}</p>
														</div>
														: <blockquote className="blockquote">
															<small className="text-muted">{cm.comment.content}</small>
														</blockquote>}
													<CommentActions
														comment={cm.comment}
														toggleApprovedComment={() => props.toggleApprovedComment(cm.comment.commentStatus, cm.comment.id)}
														toggleSpamComment={() => props.toggleSpamComment(cm.comment.commentStatus, cm.comment.id)}
														toggleDeleteComment={() => props.toggleDeleteComment(cm.comment.commentStatus, cm.comment.id)}
														toggleReplyBox={(e) => props.toggleReplyBox(e)}
														id={`pendingComments-${cm.comment.id}`}
														selector={`pendingComments-actions-${cm.comment.id}`} />
													<Input
														className={props
															.opened
															.indexOf(`pendingComments-${cm.comment.id}`) !== -1
															? "visiblity"
															: "hidden"}
														onKeyPress={(e) => props.onReply(cm.comment, e)}></Input>
												</ListGroupItem>
											</div>
										)
									})
								: null}
						</ListGroup>
					</Col>
				</Row>
			</TabPane>
			<TabPane tabId="Approved" className="commentsTabWrapper">
				<Row>
					<Col sm="12">
						<ListGroup>
							{props.comments.approvedComments
								? props
									.comments
									.approvedComments
									.map(cm => {
										return (
											<div className="approvedComments" key={cm.comment.id}>
												<ListGroupItem className="commentItem">
													<h3>{cm.user.email}
														&nbsp;- {moment(cm.comment.dateCreated).format('DD MMMM YYYY')}</h3>
													<h3>{cm.post.title}</h3>
													{cm.comment.parentComment
														? <div>
															<blockquote className="blockquote">
																<footer className="blockquote-footer">In Reply to: &nbsp;
																																		<cite title={cm.comment.parentComment.content}>{cm.comment.parentComment.content}</cite>
																</footer>
															</blockquote>
															<p className="mb-0">{cm.comment.content}</p>
														</div>
														: <blockquote className="blockquote">
															<small className="text-muted">{cm.comment.content}</small>
														</blockquote>}
													<CommentActions
														comment={cm.comment}
														toggleApprovedComment={() => props.toggleApprovedComment(cm.comment.commentStatus, cm.comment.id)}
														toggleSpamComment={() => props.toggleSpamComment(cm.comment.commentStatus, cm.comment.id)}
														toggleDeleteComment={() => props.toggleDeleteComment(cm.comment.commentStatus, cm.comment.id)}
														toggleReplyBox={(e) => props.toggleReplyBox(e)}
														id={`approvedComments-${cm.comment.id}`}
														selector={`approvedComments-actions-${cm.comment.id}`} />
													<Input
														className={props
															.opened
															.indexOf(`approvedComments-${cm.comment.id}`) !== -1
															? "visiblity"
															: "hidden"}
														onKeyPress={(e) => props.onReply(cm.comment, e)}></Input>
												</ListGroupItem>
											</div>
										)
									})
								: null}
						</ListGroup>
					</Col>
				</Row>
			</TabPane>
			<TabPane tabId="Spam" className="commentsTabWrapper">
				<Row>
					<Col sm="12">
						<ListGroup>
							{props.comments.spamComments
								? props
									.comments
									.spamComments
									.map(cm => {
										return (
											<div className="spamComments" key={cm.comment.id}>
												<ListGroupItem className="commentItem">
													<h3>{cm.user.email}
														&nbsp;- {moment(cm.comment.dateCreated).format('DD MMMM YYYY')}</h3>
													<h3>{cm.post.title}</h3>
													<blockquote className="blockquote">
														<small className="text-muted">{cm.comment.content}</small>
													</blockquote>
													<CommentActions
														comment={cm.comment}
														toggleApprovedComment={() => props.toggleApprovedComment(cm.comment.commentStatus, cm.comment.id)}
														toggleDeleteComment={() => props.toggleDeleteComment(cm.comment.commentStatus, cm.comment.id)}
														id={`spamComments-${cm.comment.id}`}
														selector={`spamComments-actions-${cm.comment.id}`} />
												</ListGroupItem>
											</div>
										)
									})
								: null}
						</ListGroup>
					</Col>
				</Row>
			</TabPane>
			<TabPane tabId="Trash" className="commentsTabWrapper">
				<Row>
					<Col sm="12">
						<ListGroup>
							{props.comments.deletedComments
								? props
									.comments
									.deletedComments
									.map(cm => {
										return (
											<div className="commentsDeleted" key={cm.comment.id}>
												<ListGroupItem key={cm.id} className="commentItem">
													<h3>{cm.user.email}
														&nbsp;- {moment(cm.dateCreated).format('DD MMMM YYYY')}</h3>
													<h3>{cm.post.title}</h3>
													<blockquote className="blockquote">
														<small className="text-muted">{cm.comment.content}</small>
													</blockquote>
													<CommentActions
														comment={cm.comment}
														toggleApprovedComment={() => props.toggleApprovedComment(cm.comment.commentStatus, cm.comment.id)}
														toggleDeleteComment={() => props.toggleDeleteComment(cm.comment.commentStatus, cm.comment.id)}
														id={`commentsDeleted-${cm.comment.id}`}
														selector={`commentsDeleted-actions-${cm.comment.id}`} />
												</ListGroupItem>
											</div>
										)
									})
								: null}
						</ListGroup>
					</Col>
				</Row>
			</TabPane>
		</TabContent>
	)
}

CommentContainerBody.propTypes = {
	comments: PropTypes.object.isRequired,
	activeTab: PropTypes.string.isRequired,
	toggleApprovedComment: PropTypes.func.isRequired,
	toggleSpamComment: PropTypes.func.isRequired,
	toggleDeleteComment: PropTypes.func.isRequired,
	opened: PropTypes.array,
	onReply: PropTypes.func
}

export default CommentContainerBody
