import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const ACCReactSelect = props => {
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

ACCReactSelect.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string
};

export default ACCReactSelect;
