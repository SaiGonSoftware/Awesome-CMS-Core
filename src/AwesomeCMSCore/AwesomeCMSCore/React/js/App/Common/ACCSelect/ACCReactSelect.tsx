import React from "react";
import Select from "react-select";

type ACCReactSelectProps = {
  handleOnChange: (...args: any[]) => any,
  options?: object[],
  value?: object[],
  placeholder?: string
};

const ACCReactSelect: React.SFC<ACCReactSelectProps> = props => {
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
