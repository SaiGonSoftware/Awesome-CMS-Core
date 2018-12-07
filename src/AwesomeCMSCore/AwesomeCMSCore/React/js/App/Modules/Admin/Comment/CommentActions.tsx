import React from "react";
import { Button } from "reactstrap";
import { CommentStatus } from "HelperAppEnum";

type CommentActionsProps = {
  comment?: object,
  id?: string,
  toggleClass?: boolean,
  selector?: string,
  toggleApprovedComment?: (...args: any[]) => any,
  toggleSpamComment?: (...args: any[]) => any,
  toggleDeleteComment?: (...args: any[]) => any,
  toggleReplyBox?: (...args: any[]) => any
};

const CommentActions: React.SFC<CommentActionsProps> = props => {
  return (
    <div className="comment-btn-wrapper">
      <blockquote className="comment-actions" id={props.selector}>
        <Button
          outline
          color="success"
          id={props.id}
          className={
            props.comment.commentStatus == CommentStatus.Approved
              ? "btn-outline-success-active"
              : ""
          }
          onClick={props.toggleApprovedComment}
        >
          <i className="fa fa-check" />
          &nbsp;Approved
        </Button>
        <Button
          outline
          color="warning"
          id={props.id}
          className={
            props.comment.commentStatus == CommentStatus.Spam
              ? "spam-actions-hidden"
              : "" || props.comment.commentStatus == CommentStatus.Trash
              ? "trash-actions-hidden"
              : ""
          }
          onClick={props.toggleSpamComment}
        >
          <i className="fa fa-ban" aria-hidden="true" />
          &nbsp;Spam
        </Button>
        <Button
          outline
          color="danger"
          id={props.id}
          className={
            props.comment.commentStatus == CommentStatus.Trash
              ? "trash-actions-hidden"
              : ""
          }
          onClick={props.toggleDeleteComment}
        >
          <i className="fa fa-trash-o" aria-hidden="true" />
          &nbsp;Trash
        </Button>
        <Button
          outline
          color="info"
          data-id={props.id}
          className={
            props.comment.commentStatus == CommentStatus.Spam
              ? "spam-actions-hidden"
              : "" || props.comment.commentStatus == CommentStatus.Trash
              ? "trash-actions-hidden"
              : ""
          }
          onClick={props.toggleReplyBox}
        >
          <i className="fa fa-reply" aria-hidden="true" />
          &nbsp;Reply
        </Button>
      </blockquote>
    </div>
  );
};

export default CommentActions;
