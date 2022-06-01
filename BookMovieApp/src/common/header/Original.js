import Enhanced from "./Enhanced";
import React from "react";
const Original = (props) => {
  console.log(props);
  return (
    <div>
      <div>{props.status}</div>
    </div>
  );
};

const WrappedComponent = Enhanced(Original);

export default WrappedComponent;
