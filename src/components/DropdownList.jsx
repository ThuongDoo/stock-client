import React, { useState } from "react";

const DropdownList = ({ list, onClick }) => {
  const [selectedItem, setSelectedItem] = useState("");

  const handleSelectItem = (event) => {
    const selectedValue = event.target.value;
    const selectedItem = list.find((item) => item.name === selectedValue);
    setSelectedItem(selectedItem);
    onClick(selectedItem);
  };

  return (
    <div className="w-full max-w-xs">
      <select
        className="block w-full bg-white border hover:border-black border-black px-4 py-2 rounded shadow  dark:text-white dark:bg-slate-900 dark:border-slate-700 text-black"
        value={selectedItem ? selectedItem.name : ""}
        onChange={handleSelectItem}
      >
        {list.map((item, index) => (
          <option key={index} value={item.name} className="">
            {item.displayName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownList;
