import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ContrastIcon from "@mui/icons-material/Contrast";
import TabBar from "../../../components/TabBar";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDispatch, useSelector } from "react-redux";
import { getTheme, toggleTheme } from "../../../slices/themeSlice";
import DropdownButton from "../../../components/DropdownButton";
import { logout } from "../../../slices/userSlice";
import api from "../../../utils/api";
import logo from "../../../images/logo.png";

function Sidebar() {
  const darkMode = useSelector(getTheme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sideList = [
    { name: "bang-dien", displayName: "Bảng điện", icon: DashboardIcon },
    { name: "buy-sell", displayName: "Tín hiệu", icon: FilterAltIcon },
    { name: "loc-co-phieu", displayName: "Lọc cổ phiếu", icon: ContrastIcon },
  ];
  const userLogout = async () => {
    await api
      .get("/user/logout")
      .then((res) => {
        dispatch(logout());
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  const handleSideBar = (tab) => {
    // if (tab.name === "buy-sell") {
    //   const fetchDate = async () => {
    //     await api
    //       .get("/user/protected")
    //       .then((res) => {
    //         console.log("success");
    //         navigate(tab.name);
    //       })
    //       .catch((err) => {
    //         userLogout();
    //       });
    //   };
    //   fetchDate();
    // } else {
    //   navigate(tab.name);
    // }
    navigate(tab.name);
  };
  const handleMenuClick = async (value) => {
    if (value === "logout") {
      dispatch(logout());
      await api
        .get("/user/logout")
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      navigate("/");
    } else if (value === "settings") {
      navigate("/settings");
    } else if (value === "admin") {
      navigate("/admin");
      console.log("admin");
    }
  };
  return (
    <div className=" flex flex-col justify-between h-full border-r border-slate-700">
      <div className=" border-b border-slate-700">
        <div
          onClick={() => navigate("/")}
          className=" cursor-pointer py-10 flex justify-center items-center"
        >
          {/* <h1 className=" text-3xl font-extrabold">XYZ TEAM</h1> */}
          <img src={logo} alt="" className=" size-10 md:size-20" />
        </div>

        <div className=" py-3">
          <TabBar
            tabs={sideList}
            style={1}
            onTabClick={handleSideBar}
            hideDisplayName
          />
        </div>
      </div>
      <div className=" flex flex-col md:flex-row items-center gap-x-3 p-3 border-t border-slate-700 dark:bg-slate-900 bg-neutral-100">
        <button onClick={() => dispatch(toggleTheme())}>
          {darkMode ? (
            <DarkModeIcon sx={{ color: "white", fontSize: 30 }} />
          ) : (
            <LightModeIcon sx={{ color: "black", fontSize: 30 }} />
          )}
        </button>
        {/* <h1>Do Manh Thuong</h1> */}
        <DropdownButton
          onMenuClick={handleMenuClick}
          username={"Do Manh Thuong"}
        />
      </div>
    </div>
  );
}

export default Sidebar;
