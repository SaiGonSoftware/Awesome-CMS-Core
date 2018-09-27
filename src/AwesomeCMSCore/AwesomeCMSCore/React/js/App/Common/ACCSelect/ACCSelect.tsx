import React from "react";

interface Props {
	value: [];
}

const ACCSelect: React.SFC<Props> = props => {
	return (
		<select className="custom-select">
			{props.value.map(option => {
				<option value={option} key={option}>
					{option}
				</option>;
			})}
		</select>
	);
};

export default ACCSelect;
