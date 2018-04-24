import React from "react";
import PropTypes from "prop-types";

import { validateInput } from "../Helper/Validation";

import Spinner from "./Spinner.jsx";

const ACCButton = props => {
  const errors = validateInput(props.validationArr);
  const isDisabled = props.disable
    ? true
    : Object.keys(errors).some(x => errors[x]);
  const className = props.btnBlocked
    ? "btn btn-primary btn-block"
    : "btn btn-primary";

  if (props.loading) {
    return <Spinner />;
  } else {
    return (
      <button
        className={className}
        type="submit"
        disabled={isDisabled}
        onClick={props.onClick}
      >
        {props.label}
      </button>
    );
  }
};

ACCButton.propTypes = {
  loading: PropTypes.bool,
  label: PropTypes.string,
  validationArr: PropTypes.array.isRequired,
  disable: PropTypes.bool,
  onClick: PropTypes.func,
  btnBlocked: PropTypes.string
};

export default ACCButton;
