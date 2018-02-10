import React, { Component } from "react";
import { Input } from "reactstrap";

class AwesomeInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const className = "is-invalid";

    return (
      <div className={className}>
        <Input
          type={this.props.type || "text"}
          name={this.props.name}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange}
          value={this.props.value}
          required={this.props.required}
        />
      </div>
    );
  }
}

export default AwesomeInput;
