import React, { Component } from "react";
import PropTypes from "prop-types";

class ACCCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="form-group">
        <label>
          <input
            id={this.props.id}
            type="checkbox"
            name={this.props.name}
            onChange={value => this.onChange(value)}
          />
          &nbsp; Remember me ?
        </label>
      </div>
    );
  }
}

ACCCheckbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string
};

export default ACCCheckbox;
