import React from "react";
import { validateInput } from "Helper/Validation";

import Spinner from "../ACCAnimation/Spinner";

type ACCButtonProps = {
  loading?: boolean,
  label?: string,
  validationArr?: any[],
  disabled?: boolean,
  onClick?: (...args: any[]) => any,
  btnBlocked?: string
};

const ACCButton: React.SFC<ACCButtonProps> = props => {
  let isDisabled;
  if (props.validationArr) {
    const errors = validateInput(props.validationArr);
    isDisabled = props.disabled
      ? true
      : Object.keys(errors).some(x => errors[x]);
  }
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
        disabled={isDisabled || props.disabled}
        onClick={props.onClick}
      >
        {props.label}
      </button>
    );
  }
};

export default ACCButton;
