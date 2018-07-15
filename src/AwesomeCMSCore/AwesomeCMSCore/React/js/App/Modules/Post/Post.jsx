import React, {Component} from "react";
import {render} from "react-dom";
import {Container, Row, Col, Button} from 'reactstrap';

import {isDomExist} from "../../Helper/Util";
import ACCEditor from '../../Common/ACCInput/ACCEditor.jsx';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postContent: ""
        }
    }

    newPost = e => {
        e.preventDefault();
        console.log(this.state.postContent);
    }

    handleEditorChange = (e) => {
        this.setState({
            postContent: e
                .target
                .getContent()
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md="12">
                        <ACCEditor onChange={this.handleEditorChange}/>
                    </Col>
                </Row>
                <Row id="postFooter">
                    <Col md="12">
                        <Button type="submit" onClick={this.newPost}>
                            <i className="fa fa-floppy-o" aria-hidden="true"></i>
                            &nbsp;Save
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

if (isDomExist("newPostContent")) {
    render(
        <Post/>, document.getElementById("newPostContent"));
}
