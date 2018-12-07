import React from "react";

type ACCInputProps = {
  className?: boolean,
  id?: string,
  type?: string,
  name?: string,
  placeholder?: string,
  value?: string,
  onChange?: (...args: any[]) => any,
  onBlur?: (...args: any[]) => any,
  onFocus?: (...args: any[]) => any,
  required?: string,
  disabled?: string
};

const ACCInput: React.SFC<ACCInputProps> = props => {
  const className = "form-control";
  const classNameError = "form-control is-invalid";
  return (
    <div className="form-group">
      <label htmlFor={props.name} hidden>
        {props.name}
      </label>
      <div>
        <input
          className={props.className ? classNameError : className}
          id={props.id}
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          onFocus={props.onFocus}
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          required={props.required}
          disabled={props.disabled}
        />
      </div>
    </div>
  );
};

export default ACCInput;
