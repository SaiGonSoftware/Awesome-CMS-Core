import React, {Component} from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    CardTitle
} from 'reactstrap';
import toastr from "toastr";
import PropTypes from "prop-types";
import {STATUS_CODE} from "../../../Helper/AppEnum";
import {SAVE_POST_API} from '../../../Helper/API_Endpoint/PostEndpoint';
import {PostWithSpinner} from '../../../Helper/Http';
import {onChange, onBlur, handleOnChange} from '../../../Helper/StateHelper';
import {POST_API} from '../../../Helper/API_Endpoint/PostEndpoint';
import {Get} from './../../../Helper/Http';

import ACCEditor from '../../../Common/ACCInput/ACCEditor.jsx';
import ACCButton from "../../../Common/ACCButton/ACCButton.jsx";
import ACCInput from "../../../Common/ACCInput/ACCInput.jsx";
import ACCReactSelect from '../../../Common/ACCSelect/ACCReactSelect.jsx';

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postContent: "",
            title: "",
            shortDescription: "",
            value: [],
            tagOptions: [],
            loading: false,
            postId: "",
            post: null
        }
    }

    componentDidMount() {
        const url = `${POST_API}/${this.props.postId}`;
        Get(url).then(res => {
            this.setState({
                post: res.data,
                value: res.data.tagOptions
                    ? JSON.parse(res.data.tagOptions)
                    : [],
                title: res.data.title,
                shortDescription: res.data.shortDescription,
                postContent: res.data.content
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.postId !== nextProps.postId) {
            const url = `${POST_API}/${nextProps.postId}`;
            Get(url).then(res => {
                this.setState({
                    post: res.data,
                    value: res.data.tagOptions
                        ? JSON.parse(res.data.tagOptions)
                        : [],
                    title: res.data.title,
                    shortDescription: res.data.shortDescription,
                    postContent: res.data.content
                });
            });
        }
    }

    editPost = e => {
        e.preventDefault();

        PostWithSpinner.call(this, SAVE_POST_API, {
            Id: this.state.post.id,
            Title: this.state.title,
            ShortDescription: this.state.shortDescription,
            Content: this.state.postContent,
            TagData: JSON.stringify(this.state.value.map(x => x.value)),
            TagOptions: JSON.stringify(this.state.value),
            PostStatus: this.state.post.postStatus
        }).then(res => {
            if (res.status === STATUS_CODE.Success) 
                return toastr.success("Edit post success");
            }
        )
    }

    handleEditorChange = (e) => {
        this.setState({
            postContent: e
                .target
                .getContent()
        });
    }

    onNavigateBack = () => {
        this
            .props
            .onNavigateBack();
    }

    render() {
        const {
            shortDescription,
            title,
            loading,
            value,
            tagOptions,
            postContent,
            post
        } = this.state;

        return (post && postContent
            ? <Container
                    className={this.props.visible
                    ? 'visiblity'
                    : 'hidden'}>
                    <div id="postContainer">
                        <form onSubmit={this.editPost}>
                            <Row>
                                <Col md="9">
                                    <Row>
                                        <Col md="12">
                                            <ACCInput
                                                type="text"
                                                name="title"
                                                id="title"
                                                placeholder="Title"
                                                required="required"
                                                value={title}
                                                onChange={title => onChange.call(this, title)}
                                                onBlur={title => onBlur.call(this, title)}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <ACCInput
                                                type="text"
                                                name="shortDescription"
                                                id="shortDescription"
                                                placeholder="Short Description"
                                                required="required"
                                                value={shortDescription}
                                                onChange={shortDescription => onChange.call(this, shortDescription)}
                                                onBlur={shortDescription => onBlur.call(this, shortDescription)}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <ACCEditor onChange={this.handleEditorChange} value={postContent}/>
                                        </Col>
                                    </Row>
                                    <Row className="postFooter">
                                        <Col md="12">
                                            <ACCButton
                                                loading={loading}
                                                btnBlocked="btn-block"
                                                label="Save Post"/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md="3">
                                    <Card body>
                                        <CardTitle>Post Options</CardTitle>
                                        <ACCReactSelect
                                            {...tagOptions}
                                            value={value}
                                            placeholder="Post tag"
                                            handleOnChange={value => handleOnChange.call(this, value)}/>
                                        <br/>
                                        <Button onClick={this.onNavigateBack}>
                                            Back</Button>
                                    </Card>
                                </Col>
                            </Row>
                        </form>
                    </div>
                </Container>
            : null);
    }
}

PostDetail.propTypes = {
    visible: PropTypes.bool,
    onNavigateBack: PropTypes.func,
    postId: PropTypes.number
};

export default PostDetail;