import React from "react";

const Enhanced = (OriginalComponent) => {
  return (props) => {
    return (
      <div>
        <OriginalComponent {...props} />
      </div>
    );
  };
};

export default Enhanced;
