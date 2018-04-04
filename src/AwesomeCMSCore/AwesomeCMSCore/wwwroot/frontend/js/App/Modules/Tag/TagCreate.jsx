import React from "react";
import { Creatable } from "react-select";
import PropTypes from "prop-types";

const TagCreate = props => {
  const { selectedOptions, value, handleOnChange } = props;

  return (
    <Creatable
      {...selectedOptions}
      value={value}
      multi={true}
      onChange={handleOnChange}
    />
  );
};

TagCreate.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.arrayOf(PropTypes.object)
};

export default TagCreate;
