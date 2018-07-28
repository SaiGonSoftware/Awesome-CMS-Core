import React from "react";
import { Creatable } from "react-select";
import PropTypes from "prop-types";

const ACCReactSelect = props => {
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

ACCReactSelect.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string
};

export default ACCReactSelect;
