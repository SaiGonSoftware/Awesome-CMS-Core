import React from "react";
import PropTypes from "prop-types";

const ACCCheckbox = props => {
  return (
    <div className="form-group">
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

ACCCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default ACCCheckbox;
