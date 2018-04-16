import React from "react";
import PropTypes from "prop-types";

import Spinner from './Spinner';

const ACCButton = props => {
  /* const errors = this.validateErrors();
  const isDisabled = Object.keys(errors).some(x => errors[x]);
 */
  if (props.loading) {
    return <Spinner />;
  } else {
    return (
      <button
        className="btn btn-primary btn-block"
        type="submit"
        /* disabled={isDisabled} */
      >
        Login
      </button>
    );
  }
};

ACCButton.propTypes = {
};

export default ACCButton;
