import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTheme } from "../slices/themeSlice";
import { getUser, login, logout } from "../slices/userSlice";
import api, { endpoints } from "../utils/api";
import ListIcon from "@mui/icons-material/List";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../images/logo.png";

import { Link, useNavigate } from "react-router-dom";
import MyDropdownButton from "./MyDropdownButton";
import MyHeaderDropdownHidden from "./MyHeaderDropdownHidden";

function Header({ hidden = false }) {
  const darkMode = useSelector(getTheme);
  const navigate = useNavigate();
  const { isLoggedIn, username } = useSelector(getUser);
  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(endpoints.USER_SHOW_ME)
        .then((res) => {
          dispatch(
            login({
              username: res.data.name,
              roles: res.data.roles,
              expirationDate: res.data.expirationDate,
              email: res.data.email,
              phone: res.data.phone,
            })
          );
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  const handleMenuClick = async (value) => {
    if (value === "logout") {
      dispatch(logout());
      await api
        .get(endpoints.LOGOUT)
        .then((res) => {})
        .catch((err) => console.log(err));
      navigate("/");
    } else if (value === "settings") {
      navigate("/settings");
    } else if (value === "admin") {
      navigate("/admin");
    }
  };

  const handleLogout = async () => {
    dispatch(logout());
    await api
      .get(endpoints.LOGOUT)
      .then((res) => {})
      .catch((err) => console.log(err));
    navigate("/");
  };
  return (
    <header className=" text-white  bg-slate-900 dark:bg-slate-900 border border-slate-700 drop-shadow-glow flex px-10 justify-between py-2 items-center rounded-full">
      <nav className=" flex gap-x-3 items-center  ">
        <div className="   px-2 py-1">
          <Link to={"/"} className=" flex items-center space-x-2 pr-5">
            <img src={logo} alt="" className=" size-8" />
            <h1 className=" text-2xl font-bold">XYZTeam</h1>
          </Link>
        </div>
      </nav>
      {!hidden && (
        <>
          <div className=" hidden lg:flex gap-x-4 w-full pl-5">
            <div className=" flex gap-x-3 items-center w-full">
              <a className=" cursor-pointer" href="/#feature">
                Tính năng
              </a>
              {/* <a className=" cursor-pointer" href="/#about-us">
                Về chúng tôi
              </a> */}
              <a className=" cursor-pointer" href="#contact">
                Liên hệ
              </a>

              {/* <a className=" cursor-pointer" href="/#pricing">
                Bảng giá
              </a> */}
              <Link to={"/dashboard"} className=" font-bold">
                X Products
              </Link>
            </div>
            {isLoggedIn ? (
              <div className=" flex gap-x-3 items-center ">
                <button
                  className=" cursor-pointer text-nowrap"
                  onClick={() => navigate("/settings")}
                >
                  {username}
                </button>
                <button
                  className=" cursor-pointer"
                  onClick={() => handleLogout()}
                >
                  <LogoutIcon sx={{ color: "white", fontSize: 25 }} />
                </button>
              </div>
            ) : (
              <div className=" flex gap-x-3 items-center ">
                <button
                  className="  dark:hover:text-slate-500 text-nowrap cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập
                </button>
                <button
                  className=" text-nowrap cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  Đăng ký
                </button>
              </div>
            )}
          </div>
          <div
            className=" block lg:hidden"
            onClick={() => setIsHidden(!isHidden)}
          >
            <div>
              <ListIcon sx={{ color: "white", fontSize: 30 }} />
            </div>
          </div>
          {isHidden && (
            <div className=" lg:hidden absolute top-20 w-full bg-slate-900 rounded-lg flex flex-col right-0 z-50 ">
              <button className=" hover:bg-white hover:text-black flex">
                <a href="/#feature" className=" w-full p-2">
                  Tính năng
                </a>
              </button>
              <button className=" hover:bg-white hover:text-black flex">
                {/* <a className=" w-full  p-2" href="/#about-us">
                  Về chúng tôi
                </a> */}
              </button>
              <button className=" hover:bg-white hover:text-black flex">
                <a className=" w-full  p-2" href="#contact">
                  Liên hệ
                </a>
              </button>

              <button className=" hover:bg-white hover:text-black flex">
                {/* <a className=" w-full  p-2" href="/#pricing">
                  Bảng giá
                </a> */}
              </button>
              <button className=" hover:bg-white hover:text-black flex">
                <Link className=" w-full p-2" to={"/dashboard"}>
                  X Products
                </Link>
              </button>
              {isLoggedIn ? (
                <>
                  <button
                    className=" hover:bg-white hover:text-black p-2"
                    onClick={() => navigate("/settings")}
                  >
                    Cài đặt
                  </button>
                  <button
                    className=" hover:bg-white hover:text-black p-2"
                    onClick={() => handleLogout()}
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <button
                    className=" hover:bg-white hover:text-black p-2"
                    onClick={() => navigate("/login")}
                  >
                    Đăng nhập
                  </button>
                  <button className=" hover:bg-white hover:text-black p-2">
                    Đăng ký
                  </button>
                </>
              )}
            </div>
          )}
        </>
      )}
    </header>
  );
}

export default Header;

const HeaderTabs = () => {};
