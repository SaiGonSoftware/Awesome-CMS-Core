import React, { Component } from "react";
import PropTypes from "prop-types";
import ACCInputList from "./ACCInput/ACCInputList.jsx";

class ACCModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="modal fade"
        id={this.props.id}
        role="dialog"
        aria-labelledby={this.props.id}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.props.title}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <ACCInputList
                options={this.props.options}
                errors={this.props.errors}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.props.onClick}
                onInputUpdate={this.props.onInputUpdate}
              >
                Save changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ACCModal.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  onInputUpdate: PropTypes.object
};

export default ACCModal;
