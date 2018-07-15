import React, {Component} from "react";
import {render} from "react-dom";
import {Container, Row, Col} from 'reactstrap';

import {isDomExist} from "../../Helper/Util";
import ACCEditor from '../../Common/ACCInput/ACCEditor.jsx';

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

if (isDomExist("newPostContent")) {
    render(
        <Post/>, document.getElementById("newPostContent"));
}
