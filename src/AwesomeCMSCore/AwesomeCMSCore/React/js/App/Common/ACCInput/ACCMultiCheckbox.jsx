<<<<<<< HEAD
import React, { Component } from "react";
import PropTypes from "prop-types";

class ACCMultiCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;

    this.setState(({ isChecked }) => ({
      isChecked: !isChecked
    }));

    handleCheckboxChange(label);
  };

  render() {
    const { isChecked } = this.state;
    const { label, id, name } = this.props;
    const styleClass =
      this.props.index % 2 === 0
        ? "form-group custom-checkbox card-split alignleft"
        : "form-group custom-checkbox card-split alignright";

    return (
      <div className={styleClass}>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id={id}
            name={name}
            onChange={this.toggleCheckboxChange}
            value={label}
            checked={isChecked}
          />
          <label className="custom-control-label" htmlFor={id}>
            {label}
          </label>
        </div>
      </div>
    );
  }
}

ACCMultiCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  index: PropTypes.number
};

export default ACCMultiCheckbox;
=======
﻿import React, { Component } from "react";
import PropTypes from "prop-types";

class ACCMultiCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false
        };
    }

    toggleCheckboxChange = () => {
        const { handleCheckboxChange, label } = this.props;

        this.setState(({ isChecked }) => ({
            isChecked: !isChecked
        }));

        handleCheckboxChange(label);
    };

    render() {
        const { isChecked } = this.state;
        const { label, id, name } = this.props;
        const styleClass =
            this.props.index % 2 === 0
                ? "form-group custom-checkbox card-split alignleft"
                : "form-group custom-checkbox card-split alignright";

        return (
            <div className={styleClass}>
                <div className="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id={id}
                        name={name}
                        onChange={this.toggleCheckboxChange}
                        value={label}
                        checked={isChecked}
                    />
                    <label className="custom-control-label" htmlFor={id}>
                        {label}
                    </label>
                </div>
            </div>
        );
    }
}

ACCMultiCheckbox.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    index: PropTypes.number
};

export default ACCMultiCheckbox;
>>>>>>> Create Group Completed
