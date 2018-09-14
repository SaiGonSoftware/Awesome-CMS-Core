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

  markCommentAsApproved = (commentStatus, commentId) => {
    let filteredComments;
    let commentToRemove;
    let updatedComments;
    let selectorToRemove;

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
          selectorToRemove = document.getElementById(`allComments-${commentId}`);
          selectorToRemove
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
          selectorToRemove = document.getElementById(`allComments-${commentId}`);
          selectorToRemove
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

          selectorToRemove = document.getElementById(`allComments-${commentId}`);
          selectorToRemove
            .classList
            .remove("btn-outline-success-active");
          selectorToRemove = document.getElementById(`approvedComments-${commentId}`);
          selectorToRemove
            .classList
            .remove("btn-outline-success-active");

          updatedComments.numberOfApprovedComments -= 1;
          updatedComments.numberOfPendingComments += 1;
          updatedComments.approvedComments = filteredComments;
          updatedComments
            .pendingComments
            .push(commentToRemove);
          window.setTimeout(() => {
            selectorToRemove = document.getElementById(`pendingComments-${commentId}`);
            selectorToRemove
              .classList
              .remove("btn-outline-success-active");
          }, 100);

          Put(`${COMMENTS_ENDPOINT}/comment/${commentId}/${CommentStatus.Pending}`).then(res => {
            if (res.status === STATUS_CODE.Success) {
              toastr.info("Edit comment status success");
              this.setState({comments: updatedComments});
            }
          });
        }
        break;
      default:
        break;
    }
  };

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
                    markCommentAsApproved={this.markCommentAsApproved}/>
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
