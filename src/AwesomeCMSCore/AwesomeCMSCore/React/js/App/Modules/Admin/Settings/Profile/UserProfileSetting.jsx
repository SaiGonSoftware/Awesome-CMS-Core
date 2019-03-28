import React, {Component} from 'react'
import toastr from "toastr";
import {Row, Col} from "reactstrap";

import {onChange, onBlur} from "Helper/StateHelper";
import {STATUS_CODE} from "Helper/AppEnum";
import {PostWithSpinner, Get} from "Helper/Http";
import {SETTING_USERS_PROFILES_API} from "Helper/API_Endpoint/SettingsEndpoint";

import ACCInput from "Common/ACCInput/ACCInput.jsx";
import ACCButton from "Common/ACCButton/ACCButton.jsx";

class UserProfileSetting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: "",
			shortIntro: "",
			jobTitle: "",
			avatar: null,
			resetting: false
		}
	}

	componentDidMount() {
		Get(SETTING_USERS_PROFILES_API).then(res => {
			this.setState({
				userName: res.data.userName,
				shortIntro: res.data.shortIntro,
				jobTitle: res.data.jobTitle,
				avatar: res.data.storePath
					? res.data.storePath
					: null
			});
		});
	}

	handleImagePreview = avatar => {
		this.clearImageState();

		// eslint-disable-next-line no-undef
		let reader = new FileReader();
		reader.onload = function (e) {
			// eslint-disable-next-line no-undef
			$("#thumbnail-preview").attr("src", e.target.result);
		};

		this.setState({avatar});
		reader.readAsDataURL(avatar);
	};

	removeImage = () => {
		this.clearImageState();
	};

	clearImageState = () => {
		this.setState({avatar: null});
		this.setState({
			resetting: true
		}, () => {
			this.setState({resetting: false});
		});
	};

	saveProfileSettings = e => {
		e.preventDefault();
		// eslint-disable-next-line no-undef
		const formdata = new FormData();
		formdata.append("UserName", this.state.userName);
		formdata.append("ShortIntro", this.state.shortIntro);
		formdata.append("JobTitle", this.state.jobTitle);
		if (this.state.avatar) {
			formdata.append("Avatar", this.state.avatar);
		}

		PostWithSpinner
			.call(this, SETTING_USERS_PROFILES_API, formdata, 'multipart/form-data')
			.then(res => {
				if (res.status === STATUS_CODE.Success) {
					toastr.success("Save Settings complete");
				}
			})
			.catch(() => {
				return toastr.error("Something went wrong. Plase try again later");
			});
	}

	render() {
		const {
			userName,
			shortIntro,
			jobTitle,
			avatar,
			loading,
			resetting
		} = this.state;

		return (
			<form encType="multipart/form-data" method="post">
				<div className="card">
					<div className="card-body">
						<p>
							<label htmlFor={userName}>
								Your name
							</label>
							<ACCInput
								type="text"
								name="userName"
								id="userName"
								value={userName}
								onChange={userName => onChange.call(this, userName)}
								onBlur={userName => onBlur.call(this, userName)}/>
						</p>
						<p>
							<label htmlFor={shortIntro}>
								Short Introduction
							</label>
							<ACCInput
								type="text"
								name="shortIntro"
								id="shortIntro"
								value={shortIntro}
								onChange={shortIntro => onChange.call(this, shortIntro)}
								onBlur={shortIntro => onBlur.call(this, shortIntro)}/>
						</p>
						<p>
							<label htmlFor={jobTitle}>
								Job title
							</label>
							<ACCInput
								type="text"
								name="jobTitle"
								id="jobTitle"
								value={jobTitle}
								onChange={jobTitle => onChange.call(this, jobTitle)}
								onBlur={jobTitle => onBlur.call(this, jobTitle)}/>
						</p>
						<p>
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
														name="avatar"
														id="thumbnailFileAddon"
														aria-describedby="thumbnailFileAddon"
														onChange={avatar => this.handleImagePreview(avatar.target.files[0])}/>
													<label className="custom-file-label" htmlFor="thumbnailFileAddon">
														{avatar && avatar.name
															? avatar.name
															: "Choose file"}
													</label>
												</div>
											</div>
										</Col>
									</Row>
									<Row>
										<Col md="12" className={avatar
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
															<img id="thumbnail-preview" src={avatar}/>
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
						</p>
						<ACCButton
							loading={loading}
							class="btn btn-outline-primary pull-right"
							label="Save Settings"
							onClick={e => this.saveProfileSettings(e)}/>
					</div>
				</div>
			</form>
		)
	}
}

export default UserProfileSetting