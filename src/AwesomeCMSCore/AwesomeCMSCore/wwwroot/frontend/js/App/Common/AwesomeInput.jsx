import React, { Component } from "react";
import { Input } from "reactstrap";
import PropTypes from "prop-types";

class AwesomeInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classNameError = "form-control is-invalid";

    return (
      <div>
        <Input
          className={this.props.className ? classNameError : ""}
          type={this.props.type || "text"}
          name={this.props.name}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          value={this.props.value}
          required={this.props.required}
        />
      </div>
    );
  }
}

AwesomeInput.propTypes = {
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  required: PropTypes.string
};

export default AwesomeInput;
