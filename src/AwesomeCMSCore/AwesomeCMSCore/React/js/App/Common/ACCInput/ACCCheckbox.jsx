import React, { Component } from "react";
import PropTypes from "prop-types";

class ACCCheckbox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="form-group">
        <label>
          <input
            id={this.props.id}
            type="checkbox"
            name={this.props.name}        
            onChange={this.props.onChange}   
          />
          &nbsp; Remember me ?
        </label>
      </div>
    );
  }
}

ACCCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ACCCheckbox;
