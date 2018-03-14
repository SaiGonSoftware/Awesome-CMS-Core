import React, { Component } from "react";
import { render } from "react-dom";
import Select from "react-select";
import { isDomExist } from "../../Helper/util";
import PropTypes from "prop-types";
import { Creatable } from 'react-select';

class TagCreateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      multi: true,
      multiValue: [],
      options: [
        { value: "R", label: "Red" },
        { value: "G", label: "Green" },
        { value: "B", label: "Blue" }
      ],
      value: undefined
    };
  }

  handleOnChange(value) {
      this.setState({ value });
    
  }

  render() {
    const { options, value } = this.state;
    return (
      <Creatable {...options} value={value} multi="true" onChange={value => this.handleOnChange(value)}/>
   
    );
  }
}

if (isDomExist("tagCreationSelect")) {
  render(<TagCreateContainer />, document.getElementById("tagCreationSelect"));
}

TagCreateContainer.propTypes = {
  hint: PropTypes.string,
  label: PropTypes.string
};
