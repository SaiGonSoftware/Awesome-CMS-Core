import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Editor} from '@tinymce/tinymce-react';
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
import ACCEditor from '../../Common/ACCInput/ACCEditor.jsx';

import {isDomExist} from "../../Helper/Util";

class Post extends Component {
    constructor(props) {
        super(props);
    }

    handleEditorChange = (e) => {
        console.log('Content was updated:', e.target.getContent());
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md="12">
                        <ACCEditor onChange={this.handleEditorChange}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

Post.propTypes = {};

export default Post;

if (isDomExist("postContent")) {
    render(
        <Post/>, document.getElementById("postContent"));
}