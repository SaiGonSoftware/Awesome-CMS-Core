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

import {isDomExist} from "../../Helper/Util";

class Post extends Component {

    handleEditorChange = (e) => {
        console.log('Content was updated:', e.target.getContent());
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md="12">
                        <Editor
                            initialValue="<p>This is the initial content of the editor</p>"
                            init={{
                            plugins: 'link image code',
                            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                        }}
                            onChange={this.handleEditorChange}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

Post.propTypes = {};

export default Post;

if (isDomExist("postForm")) {
    render(
        <Post/>, document.getElementById("postForm"));
}