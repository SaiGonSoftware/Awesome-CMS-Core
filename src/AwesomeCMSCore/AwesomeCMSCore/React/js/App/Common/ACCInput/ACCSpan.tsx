import React from "react";

type ACCSpanProps = {
  className?: string,
  id?: string,
  label?: string
};

const ACCSpan: React.SFC<ACCSpanProps> = props => {
  return (
    <span className={`badge ${props.className}`} id={props.id}>
      {props.label}
    </span>
  );
};

export default ACCSpan;
