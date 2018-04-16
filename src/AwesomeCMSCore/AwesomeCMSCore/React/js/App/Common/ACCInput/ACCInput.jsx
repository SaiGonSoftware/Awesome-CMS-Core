import React, { Component } from "react";
import PropTypes from "prop-types";

class ACCInput extends Component {
  constructor(props) {
    super(props);
    this.className = "form-control";
    this.classNameError = "form-control is-invalid";
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.name} hidden>
          {this.props.name}
        </label>
        <div>
          <input
            className={
              this.props.className ? this.classNameError : this.className
            }
            id={this.props.id}
            type={this.props.type}
            name={this.props.name}
            placeholder={this.props.placeholder}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}
            value={this.props.value}
            required={this.props.required}
          />
        </div>
      </div>
    );
  }
}

ACCInput.propTypes = {
  className: PropTypes.bool,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  required: PropTypes.string
};

export default ACCInput;
