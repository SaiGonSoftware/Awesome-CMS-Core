import React, {Component} from 'react';
import {render} from "react-dom";
import {
    Container,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Badge,
    Card,
    Button,
    CardTitle
} from 'reactstrap';
import moment from 'moment/src/moment';

import {Get} from './../../Helper/Http';
import {isDomExist, navigateToUrl} from "../../Helper/Util";
import {GET_POSTS_API} from './../../Helper/API_Endpoint/PostEndpoint';

class PostContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        Get(GET_POSTS_API).then(res => {
            this.setState({posts: res.data});
        });
    }

    navigateToPostDetail(postId) {
      
    }

    renderPost() {
        return this
            .state
            .posts
            .map(post => {
                return (
                    <ListGroupItem key={post.id} className="postItem" tag="a" onClick={() => this.navigateToPostDetail(post.id)} action>
                        <h3>{post.title}</h3>
                        <h6>{moment(post.dateCreated).format('DD MMMM YYYY')}</h6>
                    </ListGroupItem>
                )
            });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md="9">
                        <ListGroup>
                            <ListGroupItem tag="a" href="#" action id="postHeaderSection">
                                <Button color="primary" outline className="postHeaderBtn">
                                    Publish &nbsp;
                                    <Badge color="secondary">4</Badge>
                                </Button>
                                <Button color="primary" outline className="postHeaderBtn">
                                    Drap &nbsp;
                                    <Badge color="secondary">4</Badge>
                                </Button>
                                <Button color="primary" outline className="postHeaderBtn">
                                    Trash &nbsp;
                                    <Badge color="secondary">4</Badge>
                                </Button>
                                <Button color="primary" className="float-right">
                                    <i className="fa fa-search" aria-hidden="true"></i>
                                </Button>
                            </ListGroupItem>
                            {this.renderPost()}
                        </ListGroup>
                    </Col>
                    <Col md="3">
                        <Card body>
                            <CardTitle>Management</CardTitle>
                            <Button onClick={() => navigateToUrl('/Post/NewPost')}>
                                <i className="fa fa-newspaper-o" aria-hidden="true"></i>
                                &nbsp; New post
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

PostContainer.propTypes = {}

export default PostContainer;

if (isDomExist("postList")) {
    render(
        <PostContainer/>, document.getElementById("postList"));
}