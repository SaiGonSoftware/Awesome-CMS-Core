import React from "react";
import PropTypes from "prop-types";

const ACCInput = props => {
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
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          required={props.required}
        />
      </div>
    </div>
  );
};

ACCInput.propTypes = {
  className: PropTypes.bool,
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  required: PropTypes.string
};

export default ACCInput;
