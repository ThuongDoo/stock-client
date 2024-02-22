import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTheme, toggleTheme } from "../slices/themeSlice";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DropdownButton from "./DropdownButton";
import { getUser, login, logout } from "../slices/userSlice";
import {
  Link,
  NavLink,
  Navigate,
  redirect,
  useNavigate,
} from "react-router-dom";

function Header({ style = 1 }) {
  const darkMode = useSelector(getTheme);
  const navigate = useNavigate();
  const { isLoggedIn, username } = useSelector(getUser);
  const dispatch = useDispatch();
  const handleMenuClick = (value) => {
    if (value === "logout") {
      dispatch(logout());
      navigate("/home");
    } else if (value === "settings") {
      navigate("/settings");
    } else if (value === "admin") {
      navigate("/admin");
      console.log("admin");
    }
  };
  console.log(darkMode);
  return (
    <header className="  bg-white dark:bg-slate-900 border dark:border-slate-700 drop-shadow-glow flex px-10 justify-between py-2 items-center rounded-full">
      <nav className=" flex gap-x-3 items-center dark:text-white">
        <div className=" dark:text-white text-gray-800 px-2 py-1">
          <Link to={"/home"}>My Logo</Link>
        </div>
        {style === 1 ? (
          <>
            <a href="#feature">Tinh nang</a>
            <a href="#review">Danh gia</a>
            <a href="#about-us">Ve chung toi</a>
            <a href="#contact">Lien he</a>

            <a href="#pricing">Bang gia</a>
            <a href="#payment">Thanh toan</a>
            <Link to={"/dashboard"}>Khuyen nghi</Link>
          </>
        ) : (
          <div></div>
        )}
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
              <a
                href="#contact"
                className=" rounded-full border border-blue-500 px-3 py-1 text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white"
              >
                Đăng ký
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
