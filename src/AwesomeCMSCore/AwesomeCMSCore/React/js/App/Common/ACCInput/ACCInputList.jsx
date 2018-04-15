import React from "react";
import PropTypes from "prop-types";

import { APP_ENUM } from "../../Helper/appEnum";
import ACCInput from "./ACCInput.jsx";
import ACCSelect from "./ACCSelect.jsx";

const ACCInputList = props => {
  const inputField = [];

  props.options.forEach(input => {
    switch (input.type) {
      case APP_ENUM.INPUT_TEXT:
        inputField.push(
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <ACCInput
                  type={input.type}
                  name={input.name}
                  required={input.required}
                  placeholder={input.name}
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
  options: PropTypes.array.isRequired
};

export default ACCInputList;
