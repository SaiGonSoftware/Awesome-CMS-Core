import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap';
import {COMMENT_STATUS} from "Helper/AppEnum";

const CommentActions = (props) => {
		return (
				<div className="comment-btn-wrapper">
						<blockquote className="comment-actions" id={props.selector}>
								<Button
										outline
										color="success"
										id={props.id}
										className={props.comment.commentStatus == COMMENT_STATUS.Approved
										? 'btn-outline-success-active'
										: ''}
										onClick={props.toggleApprovedComment}>
										<i className="fa fa-check"></i>
										&nbsp;Approved</Button>
								<Button
										outline
										color="warning"
										id={props.id}
										className={props.comment.commentStatus == COMMENT_STATUS.Spam
										? 'spam-actions-hidden'
										: '' || props.comment.commentStatus == COMMENT_STATUS.Trash
												? 'trash-actions-hidden'
												: ''}
										onClick={props.toggleSpamComment}>
										<i className="fa fa-ban" aria-hidden="true"></i>
										&nbsp;Spam</Button>
								<Button
										outline
										color="danger"
										id={props.id}
										className={props.comment.commentStatus == COMMENT_STATUS.Trash
										? 'trash-actions-hidden'
										: ''}
										onClick={props.toggleDeleteComment}>
										<i className="fa fa-trash-o" aria-hidden="true"></i>
										&nbsp;Trash</Button>
								<Button
										outline
										color="info"
										data-id={props.id}
										className={props.comment.commentStatus == COMMENT_STATUS.Spam
										? 'spam-actions-hidden'
										: '' || props.comment.commentStatus == COMMENT_STATUS.Trash
												? 'trash-actions-hidden'
												: ''}
										onClick={props.toggleReplyBox}>
										<i className="fa fa-reply" aria-hidden="true"></i>
										&nbsp;Reply</Button>
						</blockquote>
				</div>
		)
}

CommentActions.propTypes = {
		comment: PropTypes.object,
		id: PropTypes.string,
		toggleClass: PropTypes.bool,
		selector: PropTypes.string,
		toggleApprovedComment: PropTypes.func,
		toggleSpamComment: PropTypes.func,
		toggleDeleteComment: PropTypes.func,
		toggleReplyBox: PropTypes.func
}

export default CommentActions
