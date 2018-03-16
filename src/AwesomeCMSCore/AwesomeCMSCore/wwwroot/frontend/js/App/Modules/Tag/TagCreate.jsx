import React from "react";
import { Creatable } from "react-select";
import PropTypes from "prop-types";

const TagCreate = props => {
  const { options, value, handleOnChange } = props;
  return (
    <Creatable
      {...options}
      value={value}
      multi={true}
      onChange={handleOnChange}
    />
  );
};

TagCreate.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.arrayOf(PropTypes.object)
};

export default TagCreate;
