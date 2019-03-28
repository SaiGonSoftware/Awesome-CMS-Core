import React, {Component} from 'react';
import {Get} from "Helper/Http";
import {SETTING_SOCIALS_API} from "Helper/API_Endpoint/SettingsEndpoint";

class SocialLinks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profileFacebook: "",
			twitter: "",
			googlePlus: "",
			instagram: "",
			linkedin: "",
			youtube: ""
		}
	}

	componentDidMount() {
		Get(SETTING_SOCIALS_API).then(res => {
			this.setState({
				profileFacebook: res.data.profileFacebook,
				twitter: res.data.twitter,
				googlePlus: res.data.googlePlus,
				instagram: res.data.instagram,
				linkedin: res.data.linkedin,
				youtube: res.data.youtube
			});
		});
	}

	render() {
		const {
			profileFacebook,
			googlePlus,
			twitter,
			instagram,
			linkedin,
			youtube
		} = this.state;
		return (
			<div className="social-networks">
				<ul className="social-links">
					{profileFacebook
						? (
							<li>
								<a href={profileFacebook} target="_blank" rel="noopener noreferrer"></a>
							</li>
						)
						: null}

					{googlePlus
						? (
							<li>
								<a href={googlePlus} target="_blank" rel="noopener noreferrer"></a>
							</li>
						)
						: null}

					{twitter
						? (
							<li>
								<a href={twitter} target="_blank" rel="noopener noreferrer"></a>
							</li>
						)
						: null}

					{instagram
						? (
							<li>
								<a href={instagram} target="_blank" rel="noopener noreferrer"></a>
							</li>
						)
						: null}

					{linkedin
						? (
							<li>
								<a href={linkedin} target="_blank" rel="noopener noreferrer"></a>
							</li>
						)
						: null}

					{youtube
						? (
							<li>
								<a href={youtube} target="_blank" rel="noopener noreferrer"></a>
							</li>
						)
						: null}
				</ul>
			</div>
		)
	}
}

export default SocialLinks;