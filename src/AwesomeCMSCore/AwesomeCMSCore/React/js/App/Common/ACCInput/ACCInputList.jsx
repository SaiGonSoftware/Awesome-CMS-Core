import React, { Component } from "react";
import PropTypes from "prop-types";

import { shouldMarkError } from "../../Helper/Validation";
import { onChange, onBlur } from "../../Helper/stateHelper";

import { APP_ENUM } from "../../Helper/appEnum";
import ACCInput from "./ACCInput.jsx";
import ACCSelect from "./ACCSelect.jsx";

class ACCInputList extends Component {
  constructor(props) {
    super(props);
    this.inputField = [];
    this.state = {
      errors: [this.props.errors]
    };
    this.options = this.props.options;
  }

  componentWillMount() {
    this.options.map(option => {
      switch (option.type) {
        case APP_ENUM.INPUT_TEXT:
          this.inputField.push(
            <div className="row" key={option.name}>
              <div className="col-md-12">
                <div className="form-group">
                  <ACCInput
                    className={shouldMarkError.call(
                      this,
                      option.name,
                      this.state.errors
                    )}
                    type={option.type}
                    name={option.name}
                    required={option.required}
                    placeholder={option.name.capitalize()}
                    onChange={name => onChange.call(this, name)}
                    onBlur={name => onBlur.call(this, name)}
                  />
                </div>
              </div>
            </div>
          );
          break;
      }
    });
  }

  /*   shouldComponentUpdate(nextProps, nextState) {
    console.log("nextProps", nextProps);
    console.log("nextState", nextState);
    let shouldUpdate = this.state.errors !== nextProps.errors;
    return shouldUpdate;
  } */

  render() {
    return <div className="col-md-12">{this.inputField}</div>;
  }
}

ACCInputList.propTypes = {
  options: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired
};

export default ACCInputList;
