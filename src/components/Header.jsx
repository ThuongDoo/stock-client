import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTheme, toggleTheme } from "../slices/themeSlice";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import DropdownButton from "./DropdownButton";
import { getUser, login, logout } from "../slices/userSlice";
import api from "../utils/api";
import ListIcon from "@mui/icons-material/List";
import logo from "../images/logo.png";

import {
  Link,
  NavLink,
  Navigate,
  redirect,
  useNavigate,
} from "react-router-dom";
import MyDropdownButton from "./MyDropdownButton";

function Header({ style = 1 }) {
  const darkMode = useSelector(getTheme);
  const navigate = useNavigate();
  const { isLoggedIn, username } = useSelector(getUser);
  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get("/user/showMe")
        .then((res) => {
          console.log(res.data);
          dispatch(
            login({
              username: res.data.name,
              role: res.data.role,
              expirationDate: res.data.expirationDate,
              email: res.data.email,
              phone: res.data.phone,
            })
          );
        })
        .catch((err) => console.log(err));
    };
    fetchData();
    console.log("haha");
  }, []);

  // delete
  const handleProtected = async () => {
    await api
      .get("/user/protected")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
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
  console.log(darkMode);
  return (
    <header className="   text-white  bg-slate-900 dark:bg-slate-900 border border-slate-700 drop-shadow-glow flex px-10 justify-between py-2 items-center rounded-full">
      <nav className=" flex gap-x-3 items-center  ">
        <div className="   px-2 py-1">
          <Link to={"/"} className=" flex items-center space-x-2 pr-5">
            <img src={logo} alt="" className=" size-8" />
            <h1 className=" text-2xl font-bold">XYZTeam</h1>
          </Link>
        </div>
      </nav>
      <div className=" block lg:hidden" onClick={() => setIsHidden(!isHidden)}>
        <div>
          <ListIcon sx={{ color: "white", fontSize: 30 }} />
        </div>
        {isHidden && (
          <div className=" absolute bg-slate-900 right-0 top-16 flex flex-col gap-y-3 p-3 w-52  rounded-lg justify-between items-start">
            {style === 1 ? (
              <>
                <a href="#feature">Tính năng</a>
                <a href="#about-us">Về chúng tôi</a>
                <a href="#contact">Liên hệ</a>

                <a href="#pricing">Bảng giá</a>
                <Link to={"/dashboard"}>X Products</Link>
                {/* <button onClick={() => handleProtected()}>Protec</button> */}
                {/* <button onClick={() => handleProtected()}>Protec</button> */}
              </>
            ) : (
              <div></div>
            )}
            {isLoggedIn ? (
              <MyDropdownButton onMenuClick={handleMenuClick} />
            ) : (
              <>
                <button
                  className="  dark:hover:text-slate-500"
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập
                </button>
                <a href="#contact" className=" ">
                  Đăng ký
                </a>
              </>
            )}
          </div>
        )}
      </div>

      <div className="hidden lg:flex gap-x-3  flex-1 justify-between">
        <div className=" flex items-center gap-x-3">
          {style === 1 ? (
            <>
              <a href="#feature">Tính năng</a>
              <a href="#about-us">Về chúng tôi</a>
              <a href="#contact">Liên hệ</a>

              <a href="#pricing">Bảng giá</a>
              <Link to={"/dashboard"} className=" font-bold">
                X Products
              </Link>
              {/* <button onClick={() => handleProtected()}>Protec</button> */}
            </>
          ) : (
            <div></div>
          )}
        </div>
        <div className=" flex gap-x-3 justify-between items-center ">
          {isLoggedIn ? (
            <DropdownButton onMenuClick={handleMenuClick} username={username} />
          ) : (
            <>
              <button
                className=" dark:text-white dark:hover:text-slate-500"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </button>
              <a
                href="#contact"
                // className=" rounded-full border font-bold border-blue-500 px-3 py-1 text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white"
                className=" rounded-full font-bold  px-3 py-1 bg-blue-500 text-white"
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
