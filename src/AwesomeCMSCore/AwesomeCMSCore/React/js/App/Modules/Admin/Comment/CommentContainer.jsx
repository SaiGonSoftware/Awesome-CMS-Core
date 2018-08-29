import React, {Component} from 'react';
import {render} from "react-dom";
import {Row, Col, ListGroup, ListGroupItem} from 'reactstrap';
import {Get} from 'Helper/Http';
import {isDomExist} from "Helper/Util";
import {COMMENTS_ENDPOINT} from 'Helper/API_Endpoint/CommentEndpoint';

import CommentContainerHeader from './CommentContainerHeader.jsx';
import CommentContainerDetail from './CommentContainerDetail.jsx';

class CommentContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: null,
            activeTab: 'All'
        }
    }

    componentDidMount() {
        Get(COMMENTS_ENDPOINT).then(res => {
            this.setState({comments: res.data});
        });
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({activeTab: tab});
        }
    }

    render() {
        const {comments, activeTab} = this.state;

        return (comments
            ? <Row>
                    <Col md="12" id="commentHeaderSection">
                        <ListGroup>
                            <ListGroupItem>
                                <div>
                                    <CommentContainerHeader
                                        activeTab={activeTab}
                                        toggle={this.toggle}
                                        comments={comments}/>
                                    <CommentContainerDetail 
                                        comments={comments} 
                                        activeTab={activeTab}/>
                                </div>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                </Row>
            : null);
    }
}

export default CommentContainer;

if (isDomExist("comments")) {
    render(
        <CommentContainer/>, document.getElementById("comments"));
}