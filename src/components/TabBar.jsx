import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getTheme } from "../slices/themeSlice";
import Tooltip from "./Tooltip";

function TabBar({
  tabs,
  onTabClick,
  isHorizontal = false,
  hideDisplayName = false,
  style: userStyle,
}) {
  const defaultStyle = {
    fontSize: "1.25rem",
    button: {
      padding: "0.75rem",
      onActive: { backgroundColor: "#3b82f6" },
    },
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

  return (
    <div
      style={mergedStyle}
      className={` flex  ${isHorizontal === false && "flex-col"}`}
    >
      {tabs?.map((tab, index) => (
        <div
          className=" flex-1 cursor-pointer"
          onClick={() => handleTabChange(tab)}
          key={index}
        >
          <Tooltip
            children={
              <div
                className={`flex  gap-x-3 items-center justify-center  ${
                  tab.icon
                    ? hideDisplayName === false && "md:justify-start"
                    : ""
                }  `}
                style={{
                  ...mergedStyle.button,
                  ...(activeTab === tab.name
                    ? mergedStyle.button.onActive
                    : {}),
                  // boxShadow:
                  //   activeTab === tab.name ? "inset 0 -4px 0 0 white" : "none",
                }}
              >
                {tab.icon && (
                  <tab.icon
                    sx={{ color: darkMode ? "white" : "black", fontSize: 30 }}
                  />
                )}
                {hideDisplayName === false && <h1>{tab?.displayName}</h1>}
              </div>
            }
            description={tab.displayName}
          />
        </div>
      ))}
    </div>
  );
}

export default TabBar;
