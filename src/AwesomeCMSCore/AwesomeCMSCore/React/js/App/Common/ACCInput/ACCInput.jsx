import React, { Component } from "react";
import PropTypes from "prop-types";

class ACCInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const className = "form-control";
    const classNameError = "form-control is-invalid";

    return (
      <div>
        <input
          className={this.props.className ? classNameError : className}
          id={this.props.id}
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

ACCInput.propTypes = {
  className: PropTypes.bool,
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  required: PropTypes.string
};

export default ACCInput;
