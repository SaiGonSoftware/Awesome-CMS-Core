import React from 'react'
import PropTypes from 'prop-types'
import {Row, Col, ListGroupItem, TabContent, TabPane} from 'reactstrap';
import moment from 'moment/src/moment';
import {CommentStatus} from "Helper/AppEnum";
import CommentActions from './CommentActions.jsx';

const CommentContainerBody = (props) => {
    return (
        <TabContent activeTab={props.activeTab}>
            <TabPane tabId="All" className="commentsTabWrapper">
                <Row>
                    <Col sm="12">
                        {props.comments.allComments
                            ? props
                                .comments
                                .allComments
                                .filter(cm => cm.comment.commentStatus !== CommentStatus.Spam && cm.comment.commentStatus !== CommentStatus.Trash)
                                .map(cm => {
                                    return (
                                        <div className="allComments" key={cm.comment.id}>
                                            <ListGroupItem className="commentItem">
                                                <h3>{cm.user.email}
                                                    &nbsp;- {moment(cm.comment.dateCreated).format('DD MMMM YYYY')}</h3>
                                                <h3>{cm.post.title}</h3>
                                                <blockquote className="blockquote">
                                                    <small className="text-muted">{cm.comment.content}</small>
                                                </blockquote>
                                                <CommentActions
                                                    comment={cm.comment}
                                                    markCommentAsApproved={() => props.markCommentAsApproved(cm.comment.commentStatus, cm.comment.id)}
                                                    id={`allComments-${cm.comment.id}`}/>
                                            </ListGroupItem>
                                        </div>
                                    )
                                })
                            : null}
                    </Col>
                </Row>
            </TabPane>
            <TabPane tabId="Pending" className="commentsTabWrapper">
                <Row>
                    <Col sm="12">
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
                                                <blockquote className="blockquote">
                                                    <small className="text-muted">{cm.comment.content}</small>
                                                </blockquote>
                                                <CommentActions
                                                    comment={cm.comment}
                                                    markCommentAsApproved={() => props.markCommentAsApproved(cm.comment.commentStatus, cm.comment.id)}
                                                    id={`pendingComments-${cm.comment.id}`}/>
                                            </ListGroupItem>
                                        </div>
                                    )
                                })
                            : null}
                    </Col>
                </Row>
            </TabPane>
            <TabPane tabId="Approved" className="commentsTabWrapper">
                <Row>
                    <Col sm="12">
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
                                                <blockquote className="blockquote">
                                                    <small className="text-muted">{cm.comment.content}</small>
                                                </blockquote>
                                                <CommentActions
                                                    comment={cm.comment}
                                                    markCommentAsApproved={() => props.markCommentAsApproved(cm.comment.commentStatus, cm.comment.id)}
                                                    id={`approvedComments-${cm.comment.id}`}/>
                                            </ListGroupItem>
                                        </div>
                                    )
                                })
                            : null}
                    </Col>
                </Row>
            </TabPane>
            <TabPane tabId="Spam" className="commentsTabWrapper">
                <Row>
                    <Col sm="12">
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
                                                    markCommentAsApproved={() => props.markCommentAsApproved(cm.comment.commentStatus, cm.comment.id)}
                                                    id={`spamComments-${cm.comment.id}`}/>
                                            </ListGroupItem>
                                        </div>
                                    )
                                })
                            : null}
                    </Col>
                </Row>
            </TabPane>
            <TabPane tabId="Trash" className="commentsTabWrapper">
                <Row>
                    <Col sm="12">
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
                                                    markCommentAsApproved={() => props.markCommentAsApproved(cm.comment.commentStatus, cm.comment.id)}
                                                    id={`commentsDeleted-${cm.comment.id}`}/>
                                            </ListGroupItem>
                                        </div>
                                    )
                                })
                            : null}
                    </Col>
                </Row>
            </TabPane>
        </TabContent>
    )
}

CommentContainerBody.propTypes = {
    comments: PropTypes.object.isRequired,
    activeTab: PropTypes.string.isRequired,
    markCommentAsApproved: PropTypes.func.isRequired
}

export default CommentContainerBody
