import React, { Component } from "react";

interface Props {
	id: string;
	name: string;
	handleCheckboxChange(input: string): boolean;
	label: string;
	index: number;
	checked: boolean;
}

interface StateType {
	isChecked: boolean;
}

interface State {
	isChecked: false;
}

class ACCMultiCheckbox extends Component<Props, StateType, State> {
	toggleCheckboxChange = () => {
		const { handleCheckboxChange, label } = this.props;

		this.setState(({ isChecked }) => ({
			isChecked: !isChecked
		}));

		handleCheckboxChange(label);
	};

	render() {
		const { isChecked } = this.state;
		const { label, id, name, checked } = this.props;
		const checkedVal = checked ? checked : isChecked;
		const styleClass =
			this.props.index % 2 === 0
				? "form-group custom-checkbox card-split alignleft"
				: "form-group custom-checkbox card-split alignright";

		return (
			<div className={styleClass}>
				<div className="custom-control custom-checkbox">
					<input
						type="checkbox"
						className="custom-control-input"
						id={id}
						name={name}
						onChange={this.toggleCheckboxChange}
						value={label}
						checked={checkedVal}
					/>
					<label className="custom-control-label" htmlFor={id}>
						{label}
					</label>
				</div>
			</div>
		);
	}
}

export default ACCMultiCheckbox;
