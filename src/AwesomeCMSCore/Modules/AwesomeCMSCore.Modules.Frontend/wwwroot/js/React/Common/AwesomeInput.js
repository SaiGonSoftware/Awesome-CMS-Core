import { propTypes, withFormsy } from 'formsy-react';
import React from "react";
import { Input } from "reactstrap";

class AwesomeInput extends Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    // Important: Don't skip this step. This pattern is required
    // for Formsy to work.
    this.props.setValue(event.currentTarget.value);
  }

  render() {
    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    const className = `form-group ${this.props.className} ${this.props.showRequired() ? 'required' : ''} ${this.props.showError() ? 'error' : ''}`;

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    const errorMessage = this.props.getErrorMessage();

    return (
      <div>
        <input
          onChange={this.changeValue}
          type={this.props.type || 'text'}
          name={this.props.name}
          placeholder={this.props.placeholder}
          value={this.props.getValue() || ""}
        />
        <span>{errorMessage}</span>
      </div>
    );
  }
}

AwesomeInput.propTypes = {
  ...propTypes,
};

export default withFormsy(AwesomeInput);
