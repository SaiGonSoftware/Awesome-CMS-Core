import React, {Component} from 'react'
import toastr from "toastr";

import {onChange, onBlur} from "Helper/StateHelper";
import {STATUS_CODE} from "Helper/AppEnum";
import {Post, Get} from "Helper/Http";
import {SETTING_CRON_API} from "Helper/API_Endpoint/SettingsEndpoint";

import ACCInput from "Common/ACCInput/ACCInput.jsx";

class CronSetting extends Component {
		constructor(props) {
				super(props);
				this.state = {
						cronValue: "",
						disabled: false
				}
		}

		componentDidMount() {
				Get(SETTING_CRON_API).then(res => {
						this.setState({cronValue: res.data.value});
				});
		}

		saveCronSetting() {
				this.setState({disabled: true});

				const cronValue = this.state.cronValue;
				Post(SETTING_CRON_API, {cronValue}).then(res => {
						if (res.status === STATUS_CODE.Success) {
								toastr.success("Save Settings complete");
						}
				}).catch(() => {
						return toastr.error("Something went wrong. Plase try again later");
				});

				this.setState({disabled: false});
		}

		render() {
				const {cronValue, disabled} = this.state;

				return (
						<div className="card">
								<div className="card-body">
										<h5 className="card-title">Email subscription setting</h5>
										<p className="card-text">Use cron expression to set scheduled job to send email</p>
										<p>Example can be found &nbsp;
												<a href="https://crontab.guru/" rel="noopener noreferrer" target="_blank">
														here</a>
										</p>
										<p>
												<ACCInput
														type="text"
														name="cronValue"
														id="cronValue"
														placeholder="* * * * *"
														required="required"
														value={cronValue}
														onChange={cronValue => onChange.call(this, cronValue)}
														onBlur={cronValue => onBlur.call(this, cronValue)}/>
										</p>
										<button
												className="btn btn-outline-primary pull-right"
												onClick={() => this.saveCronSetting()}
												disabled={disabled}>Save setting</button>
								</div>
						</div>
				)
		}
}

export default CronSetting