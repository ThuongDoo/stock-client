import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTheme, toggleTheme } from "../slices/themeSlice";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DropdownButton from "./DropdownButton";
import { getUser, login, logout } from "../slices/userSlice";
import { Link, NavLink, redirect } from "react-router-dom";

function Header() {
  const darkMode = useSelector(getTheme);
  const { isLoggedIn, username } = useSelector(getUser);
  const dispatch = useDispatch();
  const handleMenuClick = (value) => {
    if (value === "logout") {
      dispatch(logout());
    } else if (value === "settings") {
      console.log("settings");
      return redirect("settings");
    }
  };
  console.log(darkMode);
  return (
    <header className=" bg-white dark:bg-slate-900 border dark:border-slate-700 drop-shadow-glow flex px-10 justify-between py-2 items-center rounded-full">
      <nav className=" flex gap-x-3 items-center">
        <div className=" dark:text-white text-gray-800 px-2 py-1">My Logo</div>
        <NavLink
          to={"/home"}
          className={({ isActive, isPending }) => ` dark:hover:text-slate-500 
              ${
                isPending
                  ? "pending"
                  : isActive
                  ? " dark:text-blue-500"
                  : " dark:text-white"
              }`}
        >
          Trang chủ
        </NavLink>
        <NavLink
          to={"/tin-tuc"}
          className={({ isActive, isPending }) => ` dark:hover:text-slate-500 
              ${
                isPending
                  ? "pending"
                  : isActive
                  ? " dark:text-blue-500"
                  : " dark:text-white"
              }`}
        >
          Tin tức
        </NavLink>
        <NavLink
          to={"/dashboard"}
          className={({ isActive, isPending }) => ` dark:hover:text-slate-500 
              ${
                isPending
                  ? "pending"
                  : isActive
                  ? " dark:text-blue-500"
                  : " dark:text-white"
              }`}
        >
          Khuyến nghị
        </NavLink>
      </nav>
      <div className=" flex gap-x-3">
        <button onClick={() => dispatch(toggleTheme())}>
          {darkMode ? (
            <DarkModeIcon sx={{ color: "white", fontSize: 25 }} />
          ) : (
            <LightModeIcon sx={{ color: "black", fontSize: 25 }} />
          )}
        </button>
        <div className=" flex gap-x-3 justify-between items-center ">
          {isLoggedIn ? (
            <DropdownButton onMenuClick={handleMenuClick} username={username} />
          ) : (
            <>
              <button
                className=" dark:text-white dark:hover:text-slate-500"
                onClick={() => dispatch(login())}
              >
                Đăng nhập
              </button>
              <button className=" rounded-full border border-blue-500 px-3 py-1 text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white">
                Đăng ký
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
