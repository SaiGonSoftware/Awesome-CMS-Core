import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap';
import {CommentStatus} from "Helper/AppEnum";

const CommentActions = (props) => {
    return (
        <div>
            <blockquote>
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
                    ? 'btn-outline-warning-active'
                    : ''}>
                    <i className="fa fa-ban" aria-hidden="true"></i>
                    &nbsp;Spam</Button>
                <Button
                    outline
                    color="danger"
                    id={props.id}
                    className={props.comment.commentStatus == CommentStatus.Trash
                    ? 'btn-outline-danger-active'
                    : ''}>
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                    &nbsp;Trash</Button>
                <Button outline color="primary">
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                    &nbsp;Edit</Button>
                <Button outline color="info">
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
    markCommentAsApproved: PropTypes.func.isRequired
}

export default CommentActions
