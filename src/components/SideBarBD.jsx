import React, { useState } from "react";
import { CATEGORIES } from "../constants/categories";
import { CATEGORIES_DISPLAY } from "../constants/categoriesDisplay";

function SideBarBD({ onClick }) {
  const categoriesArray = Object.values(CATEGORIES);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
    onClick(index);
  };
  return (
    <nav className="dark:bg-slate-900 border-x border-slate-700">
      <ul className=" flex-col">
        {categoriesArray.map((category, index) => (
          <li key={index} className="">
            <button
              className={`px-4 w-full border border-slate-700 ${
                activeTab === category
                  ? "bg-blue-500 text-white"
                  : " text-white"
              } `}
              onClick={() => handleTabClick(category)}
            >
              {CATEGORIES_DISPLAY[category]}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SideBarBD;
