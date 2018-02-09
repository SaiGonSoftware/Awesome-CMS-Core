import React, { Component } from "react";
import { Input } from "reactstrap";

class AwesomeInput extends Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(e) {
    console.log(e.target.value);
  }

  render() {
    const className = "is-invalid";

    return (
      <div className={className}>
        <Input
          type={this.props.type || "text"}
          name={this.props.name}
          placeholder={this.props.placeholder}
          onChange={() => this.changeValue(this.props.onChange)}
        />
      </div>
    );
  }
}

export default AwesomeInput;
