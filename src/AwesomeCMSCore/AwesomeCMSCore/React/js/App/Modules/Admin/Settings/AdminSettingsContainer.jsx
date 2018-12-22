import React, {Component} from 'react';
import {render} from "react-dom";
import {isDomExist} from "Helper/Util";

class AdminSettingsContainer extends Component {
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
														id="v-pills-home-tab"
														data-toggle="pill"
														href="#v-pills-home"
														role="tab"
														aria-controls="v-pills-home"
														aria-selected="true">Home</a>
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
														aria-selected="false">Messages</a>
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
														id="v-pills-home"
														role="tabpanel"
														aria-labelledby="v-pills-home-tab">
														<div className="card">
																<div className="card-body">
																		<h5 className="card-title">Special title treatment</h5>
																		<p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
																		<a href="#" className="btn btn-primary">Go somewhere</a>
																</div>
														</div>
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