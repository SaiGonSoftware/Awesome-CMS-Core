import React from "react";

type ACCCheckboxProps = {
  id: string,
  name: string,
  onChange: (...args: any[]) => any,
  label: string
};

const ACCCheckbox: React.SFC<ACCCheckboxProps> = props => {
  return (
    <div className="form-group custom-checkbox">
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          id={props.id}
          name={props.name}
          onChange={props.onChange}
        />
        <label className="custom-control-label" htmlFor={props.id}>
          {props.label}
        </label>
      </div>
    </div>
  );
};

export default ACCCheckbox;
