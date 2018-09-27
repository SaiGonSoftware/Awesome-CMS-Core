import React from "react";
import { Creatable } from "react-select";

interface IProps {
	selectedOptions: [];
	value: [];
	placeholder: string;
	handleOnChange(): void;
}

const ACCReactCreateSelect: React.SFC<IProps> = props => {
	const { selectedOptions, value, handleOnChange } = props;

	return (
		<Creatable
			{...selectedOptions}
			value={value}
			multi={true}
			placeholder={props.placeholder}
			onChange={handleOnChange}
		/>
	);
};

export default ACCReactCreateSelect;
