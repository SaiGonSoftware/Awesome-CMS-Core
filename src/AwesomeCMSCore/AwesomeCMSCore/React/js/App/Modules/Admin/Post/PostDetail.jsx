import React, {Component} from "react";
import {
	Container,
	Row,
	Col,
	Button,
	Card,
	CardTitle
} from "reactstrap";
import toastr from "toastr";
import PropTypes from "prop-types";
import {STATUS_CODE} from "Helper/AppEnum";
import {SAVE_POST_API} from "Helper/API_Endpoint/PostEndpoint";
import {PostWithSpinner} from "Helper/Http";
import {onChange, onBlur} from "Helper/StateHelper";
import {POST_API} from "Helper/API_Endpoint/PostEndpoint";
import {POST_OPTIONS_API} from "Helper/API_Endpoint/PostOptionEndpoint";
import {Get} from "Helper/Http";

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
			post: null,
			thumbnail: null,
			imagePath: null,
			resetting: false
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
				categoriesValue: res.data.postOptionsDefaultViewModel.categoriesViewModel
					? JSON.parse(res.data.postOptionsDefaultViewModel.categoriesViewModel.value)
					: [],
				categoryId: res.data.postOptionsDefaultViewModel.categoriesViewModel
					? res.data.postOptionsDefaultViewModel.categoriesViewModel.id
					: null,
				title: res.data.title,
				shortDescription: res.data.shortDescription,
				postContent: res.data.content,
				imagePath: res.data.mediaViewModel && res.data.mediaViewModel.path
					? res.data.mediaViewModel.path
					: null
			});
		});
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.postId !== nextProps.postId) {
			const url = `${POST_API}/${nextProps.postId}`;
			Get(url).then(res => {
				this.setState({
					post: res.data,
					tagValue: res.data.postOptionsDefaultViewModel.tagViewModel
						? JSON.parse(res.data.postOptionsDefaultViewModel.tagViewModel.value)
						: null,
					tagId: res.data.postOptionsDefaultViewModel.tagViewModel
						? res.data.postOptionsDefaultViewModel.tagViewModel.id
						: null,
					categoriesValue: res.data.postOptionsDefaultViewModel.categoriesViewModel
						? JSON.parse(res.data.postOptionsDefaultViewModel.categoriesViewModel.value)
						: null,
					categoryId: res.data.postOptionsDefaultViewModel.categoriesViewModel
						? res.data.postOptionsDefaultViewModel.categoriesViewModel.id
						: null,
					title: res.data.title,
					shortDescription: res.data.shortDescription,
					postContent: res.data.content,
					imagePath: res.data.mediaViewModel.path
						? res.data.mediaViewModel.path
						: null
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

		// eslint-disable-next-line no-undef
		const formdata = new FormData();
		formdata.append("Id", this.state.post.id);
		formdata.append("Title", this.state.title);
		formdata.append("ShortDescription", this.state.shortDescription);
		formdata.append("Content", this.state.postContent);
		formdata.append("PostOptionsViewModel", JSON.stringify(postOptionsDefaultViewModel));
		formdata.append("PostStatus", this.state.post.postStatus);
		formdata.append("Thumbnail", this.state.thumbnail);

		PostWithSpinner
			.call(this, SAVE_POST_API, formdata, 'multipart/form-data')
			.then(res => {
				if (res.status === STATUS_CODE.Success) 
					return toastr.success("Edit post success");
				}
			);
	};

	handleEditorChange = e => {
		this.setState({
			postContent: e
				.target
				.getContent()
		});
	};

	handleOnTagChange = tagValue => {
		this.setState({tagValue});
	};

	handleOnCatChange = categoriesValue => {
		this.setState({categoriesValue});
	};

	onNavigateBack = () => {
		this
			.props
			.onNavigateBack();
	};

	handleImagePreview = thumbnail => {
		this.clearImageState();

		// eslint-disable-next-line no-undef
		let reader = new FileReader();
		reader.onload = function (e) {
			// eslint-disable-next-line no-undef
			$("#thumbnail-preview").attr("src", e.target.result);
		};

		this.setState({thumbnail});
		reader.readAsDataURL(thumbnail);
	};

	removeImage = () => {
		this.clearImageState();
	};

	/**
 *
 * Work around when upload same image
 * @memberof NewPost
 */
	clearImageState = () => {
		this.setState({thumbnail: null, imagePath: null});
		this.setState({
			resetting: true
		}, () => {
			this.setState({resetting: false});
		});
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
			post,
			thumbnail,
			resetting,
			imagePath
		} = this.state;

		return post && postContent
			? (
				<Container className={this.props.visible
					? "visiblity"
					: "hidden"}>
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
									{!resetting && (
										<div>
											<Row>
												<Col md="12">
													<div className="input-group mb-3">
														<div className="input-group-prepend">
															<span className="input-group-text" id="thumbnailFileAddon">
																Upload
															</span>
														</div>
														<div className="custom-file">
															<input
																type="file"
																className="custom-file-input"
																name="thumbnail"
																id="thumbnailFileAddon"
																aria-describedby="thumbnailFileAddon"
																onChange={thumbnail => this.handleImagePreview(thumbnail.target.files[0])}/>
															<label className="custom-file-label" htmlFor="thumbnailFileAddon">
																{thumbnail && thumbnail.name
																	? thumbnail.name
																	: "Choose file"}
															</label>
														</div>
													</div>
												</Col>
											</Row>
											<Row>
												<Col
													md="12"
													className={imagePath || thumbnail
													? "visiblity"
													: "hidden"}>
													<div className="card">
														<div className="card-header">Preview</div>
														<div className="card-body">
															<div className="card">
																<div className="card-header img-card-header-preview"></div>
																<i
																	className="fa fa-times"
																	id="remove-icon"
																	onClick={this.removeImage}
																	aria-hidden="true"></i>
																<div className="card-body">
																	<img id="thumbnail-preview" src={imagePath || thumbnail}/>
																	<div className="card-body">
																		<p className="card-text">
																			Please note that image will be resize when upload
																		</p>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</Col>
											</Row>
										</div>
									)}
									<Row>
										<Col md="12">
											<ACCEditor onChange={this.handleEditorChange} value={postContent}/>
										</Col>
									</Row>
									<Row className="postFooter">
										<Col md="12">
											<ACCButton loading={loading} class="btn btn-primary btn-block" label="Save Post"/>
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
											handleOnChange={value => this.handleOnTagChange(value)}/>
										<br/>
										<ACCReactSelect
											options={categoriesOptions}
											value={categoriesValue}
											placeholder="Categories"
											handleOnChange={value => this.handleOnCatChange(value)}/>
										<br/>
										<Button onClick={this.onNavigateBack}>Back</Button>
									</Card>
								</Col>
							</Row>
						</form>
					</div>
				</Container>
			)
			: null;
	}
}

PostDetail.propTypes = {
	visible: PropTypes.bool.isRequired,
	onNavigateBack: PropTypes.func.isRequired,
	postId: PropTypes.number.isRequired
};

export default PostDetail;
