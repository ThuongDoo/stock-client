import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getTheme } from "../slices/themeSlice";

function TabBar({
  tabs,
  onTabClick,
  isHorizontal = false,
  hideDisplayName = false,
  style: userStyle,
}) {
  const defaultStyle = {
    fontSize: "1.25rem",
    button: { padding: "0.75rem" },
  };

  const deepClone = (obj) => {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }

    const clone = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clone[key] = deepClone(obj[key]);
      }
    }

    return clone;
  };

  // Kết hợp style người dùng với style mặc định
  const mergedStyle = {
    ...defaultStyle,
    ...userStyle,
    button: { ...defaultStyle.button, ...deepClone(userStyle?.button) },
  };
  const [activeTab, setActiveTab] = useState(tabs[0]?.name);
  const handleTabChange = (tab) => {
    setActiveTab(tab.name);
    onTabClick(tab);
  };
  const darkMode = useSelector(getTheme);

  console.log(mergedStyle);
  console.log(hideDisplayName);
  return (
    <div
      style={mergedStyle}
      className={` flex  ${isHorizontal === false && "flex-col"}`}
    >
      {tabs?.map((tab, index) => (
        <button
          onClick={() => handleTabChange(tab)}
          key={index}
          style={mergedStyle.button}
          className={`${
            activeTab === tab.name ? "bg-blue-500" : ""
          } flex flex-1 items-center gap-x-3 justify-center ${
            tab.icon ? hideDisplayName === false && "md:justify-start" : ""
          }  `}
        >
          {tab.icon && (
            <tab.icon
              sx={{ color: darkMode ? "white" : "black", fontSize: 30 }}
            />
          )}
          {hideDisplayName === false && <h1>{tab?.displayName}</h1>}
        </button>
      ))}
    </div>
  );
}

export default TabBar;
