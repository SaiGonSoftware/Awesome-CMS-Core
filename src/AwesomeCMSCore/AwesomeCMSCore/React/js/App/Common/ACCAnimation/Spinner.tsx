import React from "react";

const Spinner: React.SFC<{}> = () => {
  return (
    <div style={styles.div}>
      <img src="/img/loader.svg" style={styles.spinnerStyle} />
    </div>
  );
};

const styles = {
  div: {
    display: "flex",
    alignItems: "center"
  },
  spinnerStyle: {
    margin: "0 auto"
  }
};
export default Spinner;
