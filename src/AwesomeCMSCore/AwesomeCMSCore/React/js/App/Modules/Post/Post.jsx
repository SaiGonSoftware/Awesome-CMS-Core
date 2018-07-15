import React, {Component} from "react";
import {render} from "react-dom";
import {Container, Row, Col} from 'reactstrap';

import {isDomExist} from "../../Helper/Util";
import ACCEditor from '../../Common/ACCInput/ACCEditor.jsx';

class Post extends Component {
    constructor(props) {
        console.log(isDomExist("postContent"))
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

if (isDomExist("postContent")) {
    render(
        <Post/>, document.getElementById("postContent"));
}
