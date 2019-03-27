import React, {Component} from 'react'
import toastr from "toastr";

import {onChange, onBlur} from "Helper/StateHelper";
import {STATUS_CODE} from "Helper/AppEnum";
import {PostWithSpinner, Get} from "Helper/Http";
import {SETTING_SOCIALS_API} from "Helper/API_Endpoint/SettingsEndpoint";

import ACCInput from "Common/ACCInput/ACCInput.jsx";
import ACCButton from "Common/ACCButton/ACCButton.jsx";

class SocialProfileSetting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profileFacebook: "",
			twitter: "",
			googlePlus: "",
			instagram: "",
			linkedin: "",
			youtube: "",
			facebookPage: "",
			loading: false
		}
	}

	componentDidMount() {
		Get(SETTING_SOCIALS_API).then(res => {
			this.setState({
				facebookPage: res.data.facebookPage,
				profileFacebook: res.data.profileFacebook,
				twitter: res.data.twitter,
				googlePlus: res.data.googlePlus,
				instagram: res.data.instagram,
				linkedin: res.data.linkedin,
				youtube: res.data.youtube
			});
		});
	}

	saveSocialSettings = e => {
		e.preventDefault();
		let socialProfileSettings = {
			profileFacebook: this.state.profileFacebook,
			googlePlus: this.state.googlePlus,
			twitter: this.state.twitter,
			instagram: this.state.instagram,
			linkedin: this.state.linkedin,
			facebookPage: this.state.facebookPage,
			youtube: this.state.youtube
		};

		PostWithSpinner
			.call(this, SETTING_SOCIALS_API, socialProfileSettings)
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
			profileFacebook,
			googlePlus,
			twitter,
			instagram,
			linkedin,
			youtube,
			facebookPage,
			loading
		} = this.state;

		return (
			<form onSubmit={this.saveSocialSettings}>
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">Social pages</h5>
						<p>
							<label htmlFor={profileFacebook}>
								Facebook profile page
							</label>
							<ACCInput
								type="text"
								name="profileFacebook"
								id="profileFacebook"
								placeholder="Your facebook profile page"
								value={profileFacebook}
								onChange={profileFacebook => onChange.call(this, profileFacebook)}
								onBlur={profileFacebook => onBlur.call(this, profileFacebook)}/>
						</p>
						<p>
							<label htmlFor={twitter}>
								Twitter profile page
							</label>
							<ACCInput
								type="text"
								name="twitter"
								id="twitter"
								placeholder="Your twitter profile page"
								value={twitter}
								onChange={twitter => onChange.call(this, twitter)}
								onBlur={twitter => onBlur.call(this, twitter)}/>
						</p>
						<p>
							<label htmlFor={googlePlus}>
								Google plus profile page
							</label>
							<ACCInput
								type="text"
								name="googlePlus"
								id="googlePlus"
								placeholder="Your google profile page"
								value={googlePlus}
								onChange={googlePlus => onChange.call(this, googlePlus)}
								onBlur={googlePlus => onBlur.call(this, googlePlus)}/>
						</p>
						<p>
							<label htmlFor={instagram}>
								Instagram profile page
							</label>
							<ACCInput
								type="text"
								name="instagram"
								id="instagram"
								placeholder="Your instagram profile page"
								value={instagram}
								onChange={instagram => onChange.call(this, instagram)}
								onBlur={instagram => onBlur.call(this, instagram)}/>
						</p>
						<p>
							<label htmlFor={linkedin}>
								Linkedin profile page
							</label>
							<ACCInput
								type="text"
								name="linkedin"
								id="linkedin"
								placeholder="Your linkedin profile page"
								value={linkedin}
								onChange={linkedin => onChange.call(this, linkedin)}
								onBlur={linkedin => onBlur.call(this, linkedin)}/>
						</p>
						<p>
							<label htmlFor={youtube}>
								Youtube profile page
							</label>
							<ACCInput
								type="text"
								name="youtube"
								id="youtube"
								placeholder="Your youtube profile page"
								value={youtube}
								onChange={youtube => onChange.call(this, youtube)}
								onBlur={youtube => onBlur.call(this, youtube)}/>
						</p>
						<p>
							<label htmlFor={facebookPage}>
								Your facebook fanpage
							</label>
							<ACCInput
								type="text"
								name="facebookPage"
								id="facebookPage"
								placeholder="Your facebook fanpage"
								value={facebookPage}
								onChange={facebookPage => onChange.call(this, facebookPage)}
								onBlur={facebookPage => onBlur.call(this, facebookPage)}/>
						</p>
						<ACCButton
							loading={loading}
							class="btn btn-outline-primary pull-right"
							label="Save Settings"/>
					</div>
				</div>
			</form>
		)
	}
}

export default SocialProfileSetting