import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import PropTypes from "prop-types";

const ACCBootstrapTable = ({
  data,
  columns,
  classes,
  options,
  keyField,
  filter,
  selectRow
}) => {
  return (
    <div>
      <BootstrapTable
        noDataIndication="Table is Empty"
        keyField={keyField}
        data={data}
        classes={classes}
        columns={columns}
        pagination={paginationFactory(options)}
        filter={filter}
        selectRow={selectRow}
      />
    </div>
  );
};

ACCBootstrapTable.propTypes = {
  keyField: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  options: PropTypes.object,
  classes: PropTypes.string,
  columns: PropTypes.array.isRequired,
  filter: PropTypes.object,
  selectRow: PropTypes.object
};

export default ACCBootstrapTable;
