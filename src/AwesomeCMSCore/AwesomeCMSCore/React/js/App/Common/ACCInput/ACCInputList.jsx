import React from "react";
import PropTypes from "prop-types";

import { shouldMarkError } from "../../Helper/Validation";
import { onChange, onBlur } from "../../Helper/stateHelper";

import { APP_ENUM } from "../../Helper/appEnum";
import ACCInput from "./ACCInput.jsx";
import ACCSelect from "./ACCSelect.jsx";

const ACCInputList = props => {
  const inputField = [];

  props.options.forEach(input => {
    let inputName = input.name;
    const errors = [props.errors];
    console.log(inputName);
    switch (input.type) {
      case APP_ENUM.INPUT_TEXT:
        inputField.push(
          <div className="row" key={input.name}>
            <div className="col-md-12">
              <div className="form-group">
                <ACCInput
                  className={shouldMarkError.call(this, input.name, errors)}
                  type={input.type}
                  name={input.name}
                  required={input.required}
                  placeholder={input.name}
                  onChange={name => onChange.call(this, name)}
                  onBlur={name => onBlur.call(this, name)}
                />
              </div>
            </div>
          </div>
        );
        break;
      case APP_ENUM.SELECT:
        inputField.push(
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <ACCSelect
                  type={input.type}
                  name={input.name}
                  value={input.value}
                />
              </div>
            </div>
          </div>
        );
        break;
    }
  });

  return <div className="col-md-12">{inputField}</div>;
};

ACCInputList.propTypes = {
  options: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired
};

export default ACCInputList;
