import React from "react";

interface IProps {
	type: string;
	name: string;
	options: [];
	selectedOptions: [];
	onChange(): void;
}

const ACCCheckboxOrRadioGroup: React.SFC<IProps> = props => {
	return (
		<div>
			<div className="checkbox-group">
				{props.options.map((option, index) => {
					const styleClass: string =
						index % 2 === 0
							? `form-group custom-${props.type} card-split alignleft`
							: `form-group custom--${props.type} card-split alignright`;

					return (
						<div key={option} className={styleClass}>
							<div className={`custom-control custom-${props.type}`}>
								<input
									className="custom-control-input"
									name={props.name}
									onChange={props.onChange}
									value={option}
									checked={props.selectedOptions.indexOf(option) > -1}
									type={props.type}
									id={option}
								/>
								<label className="custom-control-label" htmlFor={option}>
									{option}
								</label>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ACCCheckboxOrRadioGroup;
