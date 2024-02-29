import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTheme } from "../slices/themeSlice";

function TabBar({ tabs, onTabClick, style = 0, hideDisplayName = false }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.name);
  const handleTabChange = (tab) => {
    setActiveTab(tab.name);
    onTabClick(tab);
  };
  const darkMode = useSelector(getTheme);

  return (
    <div className={` flex  ${style === 1 && "flex-col"}`}>
      {tabs?.map((tab, index) => (
        <button
          onClick={() => handleTabChange(tab)}
          key={index}
          className={`${
            activeTab === tab.name ? "bg-blue-500" : ""
          } flex flex-1 items-center gap-x-3 p-3 justify-center md:justify-start `}
        >
          {tab.icon && (
            <tab.icon
              sx={{ color: darkMode ? "white" : "black", fontSize: 30 }}
            />
          )}

          <h1 className={`text-xl ${hideDisplayName && "hidden md:block"}`}>
            {tab?.displayName}
          </h1>
        </button>
      ))}
    </div>
  );
}

export default TabBar;
