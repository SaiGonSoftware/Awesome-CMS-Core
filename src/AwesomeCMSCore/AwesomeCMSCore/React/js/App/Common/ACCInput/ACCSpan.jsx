import React from "react";
import PropTypes from "prop-types";

const ACCSpan = props => {
  return (
    <span className={`badge ${props.className}`} id={props.id}>{props.label}</span>
  );
};

ACCSpan.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string
};

export default ACCSpan;
