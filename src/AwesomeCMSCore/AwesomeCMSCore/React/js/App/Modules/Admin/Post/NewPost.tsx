import React, { Component } from "react";
import { render } from "react-dom";
import { Container, Row, Col, Button, Card, CardTitle } from "reactstrap";
import toastr from "toastr";

import { Get, PostWithSpinner } from "@Helper/Http";
import { StatusCode, PostStatus } from "@Helper/AppEnum";
import { SAVE_POST_API } from "@Helper/API_Endpoint/PostEndpoint";
import { isDomExist } from "@Helper/Util";
import { onChange, onBlur } from "@Helper/StateHelper";
import { POST_OPTIONS_API } from "@Helper/API_Endpoint/PostOptionEndpoint";

import ACCEditor from "@Common/ACCInput/ACCEditor";
import ACCButton from "@Common/ACCButton/ACCButton";
import ACCInput from "@Common/ACCInput/ACCInput";
import ACCReactSelect from "@Common/ACCSelect/ACCReactSelect";
import Spinner from "@Common/ACCAnimation/Spinner";

type NewPostProps = {
  visible?: boolean
};

type NewPostState = {
  tagOptions: any | undefined[],
  categoriesOptions: any | undefined[],
  postContent: string,
  title: string,
  shortDescription: string,
  tagValue: undefined[],
  categoriesValue: undefined[],
  loading: boolean
};

class NewPost extends Component<NewPostProps, NewPostState> {
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
      loading: false
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
	}
	
  newPost = (e, postStatus) => {
    e.preventDefault();
    const postOptionsDefaultViewModel = {
      tagViewModel: {
        key: JSON.stringify(this.state.tagValue.map(x => x.value)),
        value: JSON.stringify(this.state.tagValue)
      },
      categoriesViewModel: {
        key: JSON.stringify(this.state.categoriesValue.map(x => x.value)),
        value: JSON.stringify(this.state.categoriesValue)
      }
    };
    const viewModel = {
      Title: this.state.title,
      ShortDescription: this.state.shortDescription,
      Content: this.state.postContent,
      PostOptionsDefaultViewModel: postOptionsDefaultViewModel,
      PostStatus: postStatus
    };
    PostWithSpinner.call(this, SAVE_POST_API, viewModel).then(res => {
      if (res.status === StatusCode.Success)
        return toastr.success("Create new post success");
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
	
  render() {
    const {
      shortDescription,
      title,
      disabled,
      loading,
      tagValue,
      tagOptions,
      categoriesOptions,
      categoriesValue
    } = this.state;
    return (
      <Container>
        <div id="postContainer">
          <form>
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
                    <ACCEditor onChange={this.handleEditorChange} />
                  </Col>
                </Row>
                <Row className="postFooter" />
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
                  <Button onClick={() => window.history.go(-1)}>Back</Button>
                  <br />{" "}
                  {!loading ? (
                    <div>
                      <ACCButton
                        disabled={disabled}
                        label="Save as Drafted"
                        btnBlocked="btn-block"
                        onClick={e => this.newPost(e, PostStatus.Draft)}
                      />
                      <br />
                      <ACCButton
                        disabled={disabled}
                        label="Published Post"
                        btnBlocked="btn-block"
                        onClick={e => this.newPost(e, PostStatus.Published)}
                      />
                    </div>
                  ) : (
                    <Spinner />
                  )}
                </Card>
              </Col>
            </Row>
          </form>
        </div>
      </Container>
    );
  }
}

if (isDomExist("newPostContent")) {
  render(<NewPost />, document.getElementById("newPostContent"));
}
