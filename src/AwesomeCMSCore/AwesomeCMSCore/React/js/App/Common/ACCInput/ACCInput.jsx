import React, { Component } from "react";
import PropTypes from "prop-types";

class ACCInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      touched: false
    };
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onBlur(e) {
    this.setState({
      touched: { ...this.state.touched, [e.target.name]: true }
    });
  }

  render() {
    const className = "form-control";
    const classNameError = "form-control is-invalid";

    return (
      <div className="form-group">
        <label htmlFor={this.props.name} hidden>
          {this.props.name}
        </label>
        <div>
          <input
            className={this.props.className ? classNameError : className}
            id={this.props.id}
            type={this.props.type}
            name={this.props.name}
            placeholder={this.props.placeholder}
            onChange={value => this.onChange(value)}
            onBlur={value => this.onBlur(value)}
            value={this.state.value}
            required={this.props.required}
          />
        </div>
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
