import React from "react";

type ACCSelectProps = {
  value: any[]
};

const ACCSelect: React.SFC<ACCSelectProps> = props => {
  return (
    <select className="custom-select">
      {props.value.map(option => {
        <option value={option} key={option}>
          {option}
        </option>;
      })}
    </select>
  );
};

export default ACCSelect;
