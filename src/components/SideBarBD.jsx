import React from "react";
import { CATEGORIES } from "../constants/categories";
import { CATEGORIES_DISPLAY } from "../constants/categoriesDisplay";

function SideBarBD({ onClick }) {
  const categoriesArray = Object.values(CATEGORIES);
  const handleClick = (value) => {
    onClick(value);
  };
  return (
    <nav>
      <ul>
        {categoriesArray.map((category, index) => (
          <li key={index}>
            <button onClick={() => handleClick(category)}>
              {CATEGORIES_DISPLAY[category]}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SideBarBD;
