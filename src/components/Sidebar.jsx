import React from "react";

import TabBar from "./TabBar";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDispatch, useSelector } from "react-redux";
import { getTheme, toggleTheme } from "../slices/themeSlice";
import DropdownButton from "./DropdownButton";
import { logout } from "../slices/userSlice";
import api, { endpoints } from "../utils/api";
import logo from "../images/logo.png";

function Sidebar({
  sideList,
  iconVisible = true,
  menuVisible = true,
  hideDisplayName = false,
}) {
  const darkMode = useSelector(getTheme);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSideBar = (tab) => {
    navigate(tab.name);
  };
  return (
    <div className=" flex flex-col justify-between h-full border-r border-slate-700">
      <div className=" border-b border-slate-700">
        {iconVisible && (
          <div
            onClick={() => navigate("/")}
            className=" cursor-pointer py-10 flex justify-center items-center px-2"
          >
            {/* <h1 className=" text-3xl font-extrabold">XYZ TEAM</h1> */}
            <img src={logo} alt="" className=" size-10 md:size-14" />
          </div>
        )}

        <div className=" py-3">
          <TabBar
            tabs={sideList}
            onTabClick={handleSideBar}
            hideDisplayName={hideDisplayName}
          />
        </div>
      </div>
      {menuVisible && (
        <div className=" items-center  p-3 border-t border-slate-700 dark:bg-slate-900 bg-neutral-100">
          <button onClick={() => dispatch(toggleTheme())}>
            {darkMode ? (
              <DarkModeIcon sx={{ color: "white", fontSize: 30 }} />
            ) : (
              <LightModeIcon sx={{ color: "black", fontSize: 30 }} />
            )}
          </button>
          {/* <h1>Do Manh Thuong</h1> */}
          {/* <DropdownButton
            onMenuClick={handleMenuClick}
            username={"Do Manh Thuong"}
          /> */}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
