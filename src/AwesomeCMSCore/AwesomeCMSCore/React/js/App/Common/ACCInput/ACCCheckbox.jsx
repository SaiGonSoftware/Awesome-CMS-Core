import React from "react";
import PropTypes from "prop-types";

const ACCCheckbox = props => {
  return (
    <div className="form-group">
      <label>
        <input
          id={props.id}
          type="checkbox"
          name={props.name}
          onChange={props.onChange}
        />
        &nbsp; Remember me ?
      </label>
    </div>
  );
};

ACCCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ACCCheckbox;
