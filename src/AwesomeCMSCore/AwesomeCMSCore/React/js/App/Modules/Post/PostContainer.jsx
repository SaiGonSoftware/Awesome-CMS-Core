import React, {Component} from 'react';
import {render} from "react-dom";
import PropTypes from 'prop-types';
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
import {isDomExist} from "../../Helper/Util";
import { navigateToUrl } from './../../Helper/Util';

class PostContainer extends Component {
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
                            <ListGroupItem className="postItem" tag="a" href="#" action>Dapibus ac facilisis in</ListGroupItem>
                            <ListGroupItem className="postItem" tag="a" href="#" action>Morbi leo risus</ListGroupItem>
                            <ListGroupItem className="postItem" tag="a" href="#" action>Porta ac consectetur ac</ListGroupItem>
                            <ListGroupItem className="postItem" disabled tag="a" href="#" action>Vestibulum at eros</ListGroupItem>
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