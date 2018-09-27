import React from "react";

interface IProps {
	className: string;
	id: string;
	label: string;
}

const ACCSpan: React.SFC<IProps> = props => {
	return (
		<span className={`badge ${props.className}`} id={props.id}>
			{props.label}
		</span>
	);
};

export default ACCSpan;
