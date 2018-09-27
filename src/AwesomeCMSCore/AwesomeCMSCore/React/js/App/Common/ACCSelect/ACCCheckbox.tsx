import React from "react";

interface Props {
	id: string;
	name: string;
	label: string;
	onChange(): void;
}
const ACCCheckbox: React.SFC<Props> = props => {
	return (
		<div className="form-group custom-checkbox">
			<div className="custom-control custom-checkbox">
				<input
					type="checkbox"
					className="custom-control-input"
					id={props.id}
					name={props.name}
					onChange={props.onChange}
				/>
				<label className="custom-control-label" htmlFor={props.id}>
					{props.label}
				</label>
			</div>
		</div>
	);
};

export default ACCCheckbox;
