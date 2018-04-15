import React from "react";
import PropTypes from "prop-types";

const ACCSelect = props => {
  return (
    <select className="custom-select">
      {props.value.map(option => {
        console.log(option);
        <option value={option} key={option}>
          {option}
        </option>;
      })}
    </select>
  );
};

ACCSelect.propTypes = {
  value: PropTypes.array
};

export default ACCSelect;
