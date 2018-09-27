import React from "react";

interface Props {
	className: string;
	id: string;
	label: string;
}

const ACCSpan: React.SFC<Props> = props => {
	return (
		<span className={`badge ${props.className}`} id={props.id}>
			{props.label}
		</span>
	);
};

export default ACCSpan;
