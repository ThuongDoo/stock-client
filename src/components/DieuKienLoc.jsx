import React from "react";

function DieuKienLoc({ filters }) {
  return (
    <div>
      {filters?.map((filter, index) => (
        <div key={index}>{filter.displayName}</div>
      ))}
    </div>
  );
}

export default DieuKienLoc;
