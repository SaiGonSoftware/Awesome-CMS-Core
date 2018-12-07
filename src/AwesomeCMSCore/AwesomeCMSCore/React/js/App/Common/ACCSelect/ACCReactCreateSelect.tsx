import React from "react";
import { Creatable } from "react-select";

type ACCReactCreateSelectProps = {
  handleOnChange: (...args: any[]) => any,
  selectedOptions?: object[],
  value?: object[],
  placeholder?: string
};

const ACCReactCreateSelect: React.SFC<ACCReactCreateSelectProps> = props => {
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
