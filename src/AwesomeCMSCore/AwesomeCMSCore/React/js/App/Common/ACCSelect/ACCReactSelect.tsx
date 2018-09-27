import React from "react";
import Select from "react-select";

interface IProps {
	handleOnChange(): void;
	options: [];
	value: [];
	placeholder: string;
}

const ACCReactSelect: React.SFC<IProps> = props => {
	const { options, value, handleOnChange } = props;

	return (
		<Select
			options={options}
			value={value}
			multi={true}
			placeholder={props.placeholder}
			onChange={handleOnChange}
		/>
	);
};

export default ACCReactSelect;
