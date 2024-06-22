import React, { useState } from "react";

const DropdownList = ({ list, onClick, isReset }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const handleSelectItem = (event) => {
    const selectedValue = event.target.value;
    const selectedItem = list.find((item) => item.id === selectedValue);
    setSelectedItem(selectedItem);
    onClick(selectedItem);
  };

  return (
    <div className=" relative w-full h-full">
      <select
        className=" block w-full bg-white border hover:border-black border-black px-1 h-full rounded-lg   dark:text-white dark:bg-slate-900 dark:border-slate-700 text-black"
        value={selectedItem ? selectedItem.id : ""}
        onChange={handleSelectItem}
      >
        {list.map((item, index) => (
          <option key={index} value={item.id} className="">
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownList;
