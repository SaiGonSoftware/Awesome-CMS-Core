import React, {Component} from 'react'

class CronSetting extends Component {
		constructor(props) {
				super(props);
				this.state = {
						cronValue: ""
				}
		}

		render() {
				return (
						<div className="card">
								<div className="card-body">
										<h5 className="card-title">Email subscription setting</h5>
										<p className="card-text">Use cron expression to set scheduled job to send email</p>
										<p>Example can be found here: https://crontab.guru/</p>
										<p><input
												type="text"
												required
												placeholder="* * * * *"
												className="form-control"
												id="cron-value-input"/></p>
										<button className="btn btn-outline-primary pull-right">Save setting</button>
								</div>
						</div>
				)
		}
}

export default CronSetting