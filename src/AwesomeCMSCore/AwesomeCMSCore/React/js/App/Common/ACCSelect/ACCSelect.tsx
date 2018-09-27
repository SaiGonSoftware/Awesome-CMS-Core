import React from "react";

interface IProps {
	value: [];
}

const ACCSelect: React.SFC<IProps> = props => {
	return (
		<select className="custom-select">
			{props.value.map(option => {
				// tslint:disable-next-line:no-unused-expression
				<option value={option} key={option}>
					{option}
				</option>;
			})}
		</select>
	);
};

export default ACCSelect;
