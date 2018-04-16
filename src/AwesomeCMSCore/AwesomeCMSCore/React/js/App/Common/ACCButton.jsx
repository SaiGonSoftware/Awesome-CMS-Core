import React from "react";
import PropTypes from "prop-types";

import { validateInput } from "../Helper/Validation";

import Spinner from "./Spinner.jsx";

const ACCButton = props => {
  const errors = validateInput(props.validateObject);
  const isDisabled = Object.keys(errors).some(x => errors[x]);

  if (props.loading) {
    return <Spinner />;
  } else {
    return (
      <button
        className="btn btn-primary btn-block"
        type="submit"
        disabled={isDisabled}
      >
        Login
      </button>
    );
  }
};

ACCButton.propTypes = {
  loading: PropTypes.bool,
  validateObject: PropTypes.object.isRequired
};

export default ACCButton;
