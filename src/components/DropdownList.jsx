import React from "react";

const DropdownList = ({ list }) => {
  return (
    <div className="w-full max-w-xs">
      <select className="block w-full bg-gray-200 border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        <option value="">Choose an option</option>
        {list?.map((item, index) => (
          <option key={index} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownList;
