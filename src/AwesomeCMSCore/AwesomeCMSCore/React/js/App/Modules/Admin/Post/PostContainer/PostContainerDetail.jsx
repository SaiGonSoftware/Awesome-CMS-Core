import React from 'react'
import PropTypes from 'prop-types'
import {
    Row,
    Col,
    ListGroupItem,
    Button,
    TabContent,
    TabPane
} from 'reactstrap';
import moment from 'moment/src/moment';
import {POST_STATUS} from "../../../../Helper/AppEnum";

const PostContainerDetail = (props) => {
    return (
        <TabContent activeTab={props.activeTab}>
            <TabPane tabId="Published" className="postsTabWrapper">
                <Row>
                    <Col sm="12">
                        {props
                            .posts
                            .postsPublished
                            .map(post => {
                                return (
                                    <div id="postPublished" key={post.id}>
                                        <ListGroupItem className="postItem">
                                            <h3>{post.title}</h3>
                                            <h6>{moment(post.dateCreated).format('DD MMMM YYYY')}</h6>
                                        </ListGroupItem>
                                        <div className="postManage">
                                            <Button color="info" onClick={() => props.navigateToPostDetail(post.id)}>
                                                <i className="fa fa-pencil"></i>
                                            </Button>
                                            <Button
                                                color="danger"
                                                onClick={() => props.deletePost(POST_STATUS.Published, post.id)}>
                                                <i className="fa fa-trash"></i>
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                    </Col>
                </Row>
            </TabPane>
            <TabPane tabId="Drafted" className="postsTabWrapper">
                <Row>
                    <Col sm="12">
                        {props
                            .posts
                            .postsDrafted
                            .map(post => {
                                return (
                                    <div id="postDrafted" key={post.id}>
                                        <ListGroupItem className="postItem">
                                            <h3>{post.title}</h3>
                                            <h6>{moment(post.dateCreated).format('DD MMMM YYYY')}</h6>
                                        </ListGroupItem>
                                        <div className="postManage">
                                            <Button color="info" onClick={() => props.navigateToPostDetail(post.id)}>
                                                <i className="fa fa-pencil"></i>
                                            </Button>
                                            <Button
                                                color="danger"
                                                onClick={() => props.deletePost(POST_STATUS.Draft, post.id)}>
                                                <i className="fa fa-trash"></i>
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                    </Col>
                </Row>
            </TabPane>
            <TabPane tabId="Deleted" className="postsTabWrapper">
                <Row>
                    <Col sm="12">
                        {props
                            .posts
                            .postDeleted
                            .map(post => {
                                return (
                                    <div id="postDeleted" key={post.id}>
                                        <ListGroupItem key={post.id} className="postItem">
                                            <h3>{post.title}</h3>
                                            <h6>{moment(post.dateCreated).format('DD MMMM YYYY')}</h6>
                                        </ListGroupItem>
                                        <div className="postManage">
                                            <Button color="warning" onClick={() => props.restorePost(post.id)}>
                                                <i className="fa fa-undo"></i>
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                    </Col>
                </Row>
            </TabPane>
        </TabContent>
    )
}

PostContainerDetail.propTypes = {
    posts: PropTypes.object,
    activeTab: PropTypes.string,
    navigateToPostDetail: PropTypes.func,
    deletePost: PropTypes.func,
    restorePost: PropTypes.func
}

export default PostContainerDetail
