import React, { Component } from "react";
import { Container, Row, Col, Button, Card, CardTitle } from "reactstrap";
import toastr from "toastr";
import PropTypes from "prop-types";
import { STATUS_CODE } from "Helper/AppEnum";
import { SAVE_POST_API } from "Helper/API_Endpoint/PostEndpoint";
import { PostWithSpinner } from "Helper/Http";
import { onChange, onBlur } from "Helper/StateHelper";
import { POST_API } from "Helper/API_Endpoint/PostEndpoint";
import { POST_OPTIONS_API } from "Helper/API_Endpoint/PostOptionEndpoint";
import { Get } from "Helper/Http";

import ACCEditor from "Common/ACCInput/ACCEditor.jsx";
import ACCButton from "Common/ACCButton/ACCButton.jsx";
import ACCInput from "Common/ACCInput/ACCInput.jsx";
import ACCReactSelect from "Common/ACCSelect/ACCReactSelect.jsx";

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postContent: "",
      title: "",
      shortDescription: "",
      tagValue: [],
      tagOptions: [],
      categoriesOptions: [],
      categoriesValue: [],
      loading: false,
      postId: "",
      categoryId: null,
      tagId: null,
      post: null
    };
  }

  componentDidMount() {
    Get(`${POST_OPTIONS_API}/Options`).then(res => {
      this.setState({
        tagOptions: res.data.tagViewModel.value
          ? JSON.parse(res.data.tagViewModel.value)
          : [],
        categoriesOptions: res.data.categoriesViewModel.value
          ? JSON.parse(res.data.categoriesViewModel.value)
          : []
      });
    });

    const url = `${POST_API}/${this.props.postId}`;
    Get(url).then(res => {
      this.setState({
        post: res.data,
        tagValue: res.data.postOptionsDefaultViewModel.tagViewModel
          ? JSON.parse(res.data.postOptionsDefaultViewModel.tagViewModel.value)
          : [],
        tagId: res.data.postOptionsDefaultViewModel.tagViewModel
          ? res.data.postOptionsDefaultViewModel.tagViewModel.id
          : null,
        categoriesValue: res.data.postOptionsDefaultViewModel
          .categoriesViewModel
          ? JSON.parse(
              res.data.postOptionsDefaultViewModel.categoriesViewModel.value
            )
          : [],
        categoryId: res.data.postOptionsDefaultViewModel.categoriesViewModel
          ? res.data.postOptionsDefaultViewModel.categoriesViewModel.id
          : null,
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
        console.log(res.data);
        this.setState({
          post: res.data,
          tagValue: res.data.postOptionsDefaultViewModel.tagViewModel
            ? JSON.parse(
                res.data.postOptionsDefaultViewModel.tagViewModel.value
              )
            : null,
          tagId: res.data.postOptionsDefaultViewModel.tagViewModel
            ? res.data.postOptionsDefaultViewModel.tagViewModel.id
            : null,
          categoriesValue: res.data.postOptionsDefaultViewModel
            .categoriesViewModel
            ? JSON.parse(
                res.data.postOptionsDefaultViewModel.categoriesViewModel.value
              )
            : null,
          categoryId: res.data.postOptionsDefaultViewModel.categoriesViewModel
            ? res.data.postOptionsDefaultViewModel.categoriesViewModel.id
            : null,
          title: res.data.title,
          shortDescription: res.data.shortDescription,
          postContent: res.data.content
        });
      });
    }
  }

  editPost = e => {
    e.preventDefault();

    const postOptionsDefaultViewModel = {
      tagViewModel: {
        id: this.state.tagId,
        key: JSON.stringify(this.state.tagValue.map(x => x.value)),
        value: JSON.stringify(this.state.tagValue)
      },
      categoriesViewModel: {
        id: this.state.categoryId,
        key: JSON.stringify(this.state.categoriesValue.map(x => x.value)),
        value: JSON.stringify(this.state.categoriesValue)
      }
    };

    const viewModel = {
      Id: this.state.post.id,
      Title: this.state.title,
      ShortDescription: this.state.shortDescription,
      Content: this.state.postContent,
      PostOptionsDefaultViewModel: postOptionsDefaultViewModel,
      PostStatus: this.state.post.postStatus
    };

    PostWithSpinner.call(this, SAVE_POST_API, viewModel).then(res => {
      if (res.status === STATUS_CODE.Success)
        return toastr.success("Edit post success");
    });
  };

  handleEditorChange = e => {
    this.setState({
      postContent: e.target.getContent()
    });
  };

  handleOnTagChange = tagValue => {
    this.setState({ tagValue });
  };

  handleOnCatChange = categoriesValue => {
    this.setState({ categoriesValue });
  };

  onNavigateBack = () => {
    this.props.onNavigateBack();
  };

  render() {
    const {
      shortDescription,
      title,
      loading,
      tagValue,
      tagOptions,
      categoriesOptions,
      categoriesValue,
      postContent,
      post
    } = this.state;

    return post && postContent ? (
      <Container className={this.props.visible ? "visiblity" : "hidden"}>
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
                      onBlur={title => onBlur.call(this, title)}
                    />
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
                      onChange={shortDescription =>
                        onChange.call(this, shortDescription)
                      }
                      onBlur={shortDescription =>
                        onBlur.call(this, shortDescription)
                      }
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <ACCEditor
                      onChange={this.handleEditorChange}
                      value={postContent}
                    />
                  </Col>
                </Row>
                <Row className="postFooter">
                  <Col md="12">
                    <ACCButton
                      loading={loading}
                      btnBlocked="btn-block"
                      label="Save Post"
                    />
                  </Col>
                </Row>
              </Col>
              <Col md="3">
                <Card body>
                  <CardTitle>Post Options</CardTitle>
                  <ACCReactSelect
                    options={tagOptions}
                    value={tagValue}
                    placeholder="Tags"
                    handleOnChange={value => this.handleOnTagChange(value)}
                  />
                  <br />
                  <ACCReactSelect
                    options={categoriesOptions}
                    value={categoriesValue}
                    placeholder="Categories"
                    handleOnChange={value => this.handleOnCatChange(value)}
                  />
                  <br />
                  <Button onClick={this.onNavigateBack}>Back</Button>
                </Card>
              </Col>
            </Row>
          </form>
        </div>
      </Container>
    ) : null;
  }
}

PostDetail.propTypes = {
  visible: PropTypes.bool.isRequired,
  onNavigateBack: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired
};

export default PostDetail;
