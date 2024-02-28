import React, { useEffect, useState } from "react";

function TabBar({ tabs, onTabClick, style = 0 }) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.name);
  const handleTabChange = (tab) => {
    setActiveTab(tab.name);
    onTabClick(tab);
  };

  return (
    <div className={` flex  ${style === 1 && "flex-col"}`}>
      {tabs?.map((tab, index) => (
        <button
          onClick={() => handleTabChange(tab)}
          key={index}
          className={`${activeTab === tab.name ? "bg-red-500" : ""} flex-1 `}
        >
          {tab.icon && <tab.icon sx={{ color: "white", fontSize: 20 }} />}
          {tab?.displayName}
        </button>
      ))}
    </div>
  );
}

export default TabBar;
