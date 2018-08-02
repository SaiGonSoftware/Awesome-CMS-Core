import React from "react";
import PropTypes from "prop-types";

import {validateInput} from "../../Helper/Validation";

import Spinner from "../ACCAnimation/Spinner.jsx";

const ACCButton = props => {
  let isDisabled;
  if (props.validationArr) {
    const errors = validateInput(props.validationArr);
    isDisabled = props.disable
      ? true
      : Object
        .keys(errors)
        .some(x => errors[x]);
  }

  const className = props.btnBlocked
    ? "btn btn-primary btn-block"
    : "btn btn-primary";

  if (props.loading) {
    return <Spinner/>;
  } else {
    return (
      <button
        className={className}
        type="submit"
        disabled={isDisabled || props.disabled}
        onClick={props.onClick}>
        {props.label}
      </button>
    );
  }
};

ACCButton.propTypes = {
  loading: PropTypes.bool,
  label: PropTypes.string,
  validationArr: PropTypes.array,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  btnBlocked: PropTypes.string
};

export default ACCButton;
