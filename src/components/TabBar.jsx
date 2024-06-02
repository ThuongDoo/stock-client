import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getTheme } from "../slices/themeSlice";

function TabBar({ tabs, onTabClick, style = 0, hideDisplayName = false }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.name);
  const handleTabChange = (tab) => {
    setActiveTab(tab.name);
    onTabClick(tab);
  };
  const darkMode = useSelector(getTheme);

  console.log(hideDisplayName);
  return (
    <div className={` flex  ${style === 1 && "flex-col"}`}>
      {tabs?.map((tab, index) => (
        <button
          onClick={() => handleTabChange(tab)}
          key={index}
          className={`${
            activeTab === tab.name ? "bg-blue-500" : ""
          } flex flex-1 items-center gap-x-3 p-3 justify-center ${
            hideDisplayName === false && "md:justify-start"
          }  `}
        >
          {tab.icon && (
            <tab.icon
              sx={{ color: darkMode ? "white" : "black", fontSize: 30 }}
            />
          )}
          {hideDisplayName === false && (
            <h1 className={`text-xl`}>{tab?.displayName}</h1>
          )}
        </button>
      ))}
    </div>
  );
}

export default TabBar;
