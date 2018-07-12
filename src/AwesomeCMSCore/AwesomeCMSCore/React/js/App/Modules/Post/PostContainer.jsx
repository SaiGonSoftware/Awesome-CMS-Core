import React, {Component} from 'react';
import {render} from "react-dom";
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem, Badge, Button} from 'reactstrap';
import {isDomExist} from "../../Helper/Util";

class PostContainer extends Component {
    render() {
        return (
            <div>
                <ListGroup>
                    <ListGroupItem tag="a" href="#" action id="postHeaderSection">
                        <Button color="primary" outline className="postHeaderBtn">
                            Publish
                            <Badge color="secondary">4</Badge>
                        </Button>
                        <Button color="primary" outline className="postHeaderBtn">
                            Drap
                            <Badge color="secondary">4</Badge>
                        </Button>
                        <Button color="primary" outline className="postHeaderBtn">
                            Trash
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
            </div>
        )
    }
}

PostContainer.propTypes = {}

export default PostContainer;

if (isDomExist("postList")) {
    render(
        <PostContainer/>, document.getElementById("postList"));
}