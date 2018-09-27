import React from "react";

interface IProps {
	name: string;
	className: string;
	id: string;
	type: string;
	placeholder: string;
	value: string;
	required: boolean;
	disabled: boolean;
	onFocus(): void;
	onChange(): void;
	onBlur(): void;
}

const ACCInput: React.SFC<IProps> = props => {
	const className: string = "form-control";
	const classNameError: string = "form-control is-invalid";

	return (
		<div className="form-group">
			<label htmlFor={props.name} hidden>
				{props.name}
			</label>
			<div>
				<input
					className={props.className ? classNameError : className}
					id={props.id}
					type={props.type}
					name={props.name}
					placeholder={props.placeholder}
					onFocus={props.onFocus}
					onChange={props.onChange}
					onBlur={props.onBlur}
					value={props.value}
					required={props.required}
					disabled={props.disabled}
				/>
			</div>
		</div>
	);
};

export default ACCInput;
