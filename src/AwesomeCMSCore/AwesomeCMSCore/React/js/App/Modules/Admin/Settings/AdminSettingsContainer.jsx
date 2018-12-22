import React, {Component} from 'react';
import {render} from "react-dom";

import {isDomExist} from "Helper/Util";

import CronSetting from "./General/CronSetting.jsx";

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
														id="v-pills-general-tab"
														data-toggle="general"
														href="#v-pills-general"
														role="tab"
														aria-controls="v-pills-general"
														aria-selected="true">General</a>
												<a
														className="nav-link"
														id="v-pills-profile-tab"
														data-toggle="pill"
														href="#v-pills-profile"
														role="tab"
														aria-controls="v-pills-profile"
														aria-selected="false">Profile</a>
												<a
														className="nav-link"
														id="v-pills-messages-tab"
														data-toggle="pill"
														href="#v-pills-messages"
														role="tab"
														aria-controls="v-pills-messages"
														aria-selected="false">Security</a>
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
														id="v-pills-profile"
														role="tabpanel"
														aria-labelledby="v-pills-profile-tab">...</div>
												<div
														className="tab-pane fade"
														id="v-pills-messages"
														role="tabpanel"
														aria-labelledby="v-pills-messages-tab">...</div>
												<div
														className="tab-pane fade"
														id="v-pills-settings"
														role="tabpanel"
														aria-labelledby="v-pills-settings-tab">...</div>
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