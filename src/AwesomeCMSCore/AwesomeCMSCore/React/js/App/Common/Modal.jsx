import React from "react";
import PropTypes from "prop-types";
import ACCInputList from "./ACCInput/ACCInputList.jsx";

const ACCModal = props => {
  return (
    <div
      className="modal fade"
      id={props.id}
      role="dialog"
      aria-labelledby={props.id}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
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
            <ACCInputList options={props.options} errors={props.errors} />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={props.onClick}
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
};

ACCModal.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default ACCModal;
