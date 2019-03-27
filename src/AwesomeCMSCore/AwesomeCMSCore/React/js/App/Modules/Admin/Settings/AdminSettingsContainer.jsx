import React, {Component} from 'react';
import {render} from "react-dom";

import {isDomExist} from "Helper/Util";

import CronSetting from "./General/CronSetting.jsx";
import SocialProfileSetting from "./Profile/SocialProfileSetting.jsx";
import UserProfileSetting from "./Profile/UserProfileSetting.jsx";

class AdminSettingsContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="row" id="admin-setting-wrapper">
				<div className="col-3" id="side-panel-nav">
					<div
						className="nav flex-column nav-pills"
						id="v-pills-tab"
						role="tablist"
						aria-orientation="vertical">
						<a
							className="nav-link active"
							id="v-pills-homgenerale-tab"
							data-toggle="pill"
							href="#v-pills-general"
							role="tab"
							aria-controls="v-pills-general"
							aria-selected="true">General</a>
						<a
							className="nav-link"
							id="v-pills-social-tab"
							data-toggle="pill"
							href="#v-pills-social"
							role="tab"
							aria-controls="v-pills-social"
							aria-selected="false">Social link</a>
						<a
							className="nav-link"
							id="v-pills-profiles-tab"
							data-toggle="pill"
							href="#v-pills-profiles"
							role="tab"
							aria-controls="v-pills-profiles"
							aria-selected="false">Profile</a>
						<a
							className="nav-link"
							id="v-pills-settings-tab"
							data-toggle="pill"
							href="#v-pills-settings"
							role="tab"
							aria-controls="v-pills-settings"
							aria-selected="false">Settings</a>
					</div>
				</div>
				<div className="col-9">
					<div className="tab-content" id="v-pills-tabContent">
						<div
							className="tab-pane fade show active"
							id="v-pills-general"
							role="tabpanel"
							aria-labelledby="v-pills-general-tab">
							<CronSetting/>
						</div>
						<div
							className="tab-pane fade"
							id="v-pills-social"
							role="tabpanel"
							aria-labelledby="v-pills-social-tab"><SocialProfileSetting/></div>
						<div
							className="tab-pane fade"
							id="v-pills-profiles"
							role="tabpanel"
							aria-labelledby="v-pills-profiles-tab">
							<UserProfileSetting/>
						</div>
						<div
							className="tab-pane fade"
							id="v-pills-settings"
							role="tabpanel"
							aria-labelledby="v-pills-settings-tab">3</div>
					</div>
				</div>
			</div>
		)
	}
}

if (isDomExist("admin-setting-container")) {
	render(
		<AdminSettingsContainer/>, document.getElementById("admin-setting-container"));
}