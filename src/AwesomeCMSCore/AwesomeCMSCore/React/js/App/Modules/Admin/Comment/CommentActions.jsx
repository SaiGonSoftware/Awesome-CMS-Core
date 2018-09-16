import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap';
import {CommentStatus} from "Helper/AppEnum";

const CommentActions = (props) => {
    return (
        <div>
            <blockquote className="comment-actions" id={props.selector}>
                <Button
                    outline
                    color="success"
                    id={props.id}
                    className={props.comment.commentStatus == CommentStatus.Approved
                    ? 'btn-outline-success-active'
                    : ''}
                    onClick={props.markCommentAsApproved}>
                    <i className="fa fa-check"></i>
                    &nbsp;Approved</Button>
                <Button
                    outline
                    color="warning"
                    id={props.id}
                    className={props.comment.commentStatus == CommentStatus.Spam
                    ? 'spam-actions-hidden'
                    : '' || props.comment.commentStatus == CommentStatus.Trash
                        ? 'trash-actions-hidden'
                        : ''}>
                    <i className="fa fa-ban" aria-hidden="true"></i>
                    &nbsp;Spam</Button>
                <Button
                    outline
                    color="danger"
                    id={props.id}
                    className={props.comment.commentStatus == CommentStatus.Trash
                    ? 'trash-actions-hidden'
                    : ''}>
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                    &nbsp;Trash</Button>
                <Button
                    outline
                    color="primary"
                    className={props.comment.commentStatus == CommentStatus.Spam
                    ? 'spam-actions-hidden'
                    : '' || props.comment.commentStatus == CommentStatus.Trash
                        ? 'trash-actions-hidden'
                        : ''}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                    &nbsp;Edit</Button>
                <Button
                    outline
                    color="info"
                    className={props.comment.commentStatus == CommentStatus.Spam
                    ? 'spam-actions-hidden'
                    : '' || props.comment.commentStatus == CommentStatus.Trash
                        ? 'trash-actions-hidden'
                        : ''}>
                    <i className="fa fa-reply" aria-hidden="true"></i>
                    &nbsp;Reply</Button>
            </blockquote>
        </div>
    )
}

CommentActions.propTypes = {
    comment: PropTypes.object,
    id: PropTypes.string.isRequired,
    toggleClass: PropTypes.bool,
    selector: PropTypes.string.isRequired,
    markCommentAsApproved: PropTypes.func.isRequired
}

export default CommentActions
