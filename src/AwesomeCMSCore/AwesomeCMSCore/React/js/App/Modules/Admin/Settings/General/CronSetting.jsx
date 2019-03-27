import React, {Component} from 'react'
import toastr from "toastr";

import {onChange, onBlur} from "Helper/StateHelper";
import {STATUS_CODE} from "Helper/AppEnum";
import {PostWithSpinner, Get} from "Helper/Http";
import {SETTING_CRON_API} from "Helper/API_Endpoint/SettingsEndpoint";

import ACCInput from "Common/ACCInput/ACCInput.jsx";
import ACCButton from "Common/ACCButton/ACCButton.jsx";

class CronSetting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cronValue: "",
			loading: false
		}
	}

	componentDidMount() {
		Get(SETTING_CRON_API).then(res => {
			this.setState({cronValue: res.data.value});
		});
	}

	saveCronSetting = e => {
		e.preventDefault();

		const cronValue = this.state.cronValue;

		if (cronValue) {
			PostWithSpinner.call(this, SETTING_CRON_API, {cronValue}).then(res => {
				if (res.status === STATUS_CODE.Success) {
					toastr.success("Save Settings complete");
				}
			}).catch(() => {
				return toastr.error("Something went wrong. Plase try again later");
			});
		}
	}

	render() {
		const {cronValue, loading} = this.state;

		return (
			<form onSubmit={this.saveCronSetting}>
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

export default CronSetting