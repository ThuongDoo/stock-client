import React from "react";

import zaloIcon from "../images/icons8-zalo-48.png";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const zaloLink = "https://zalo.me/0333817395";
  return (
    <footer className=" px-6 bg-slate-900 flex flex-col md:px-12 lg:px-24  justify-between text-white">
      <div className=" py-4 flex justify-between ">
        <div className="  flex flex-col justify-between  items-start">
          <div className="   flex  items-start flex-col   gap-x-3">
            <h1 className=" text-xs sm:text-sm lg:text-lg font-bold">
              Hotline:
            </h1>
            <h1 className=" text-xs sm:text-sm lg:text-lg pl-3">
              0939.600.338 (Luân)
            </h1>
            <h1 className=" text-xs sm:text-sm lg:text-lg pl-3">
              0936.842.309 (Phú)
            </h1>
            <h1 className=" text-xs sm:text-sm lg:text-lg">
              <span className=" font-bold">Email: </span>
              support@chungkhoanxyz.com
            </h1>
          </div>
          <div className="    flex  justify-center divide-x-2 ">
            <a
              href="#feature"
              className=" text-xs sm:text-sm md:text-lg pr-2 lg:pr-5"
            >
              Tính năng
            </a>
            <a
              href="#about-us"
              className=" text-xs sm:text-sm md:text-lg px-2 lg:px-5"
            >
              Về chúng tôi
            </a>
            <Link
              to={"/dashboard"}
              className=" text-xs sm:text-sm md:text-lg px-2 lg:px-5"
            >
              X Products
            </Link>
            <a
              href="#contact"
              className=" text-xs sm:text-sm md:text-lg px-2 lg:px-5"
            >
              Liên hệ
            </a>
            <a
              href="#pricing"
              className=" text-xs sm:text-sm md:text-lg pl-2 lg:pl-5"
            >
              Bảng giá
            </a>
          </div>
        </div>
        <div className=" flex flex-col items-center">
          <img src={logo} alt="" className=" size-20" />
          <h1 className="  text-3xl font-bold">XYZ TEAM</h1>
        </div>
      </div>

      <div className=" flex justify-center items-center gap-x-4 border-t border-slate-700 py-4">
        <span className=" text-gray-300">
          Hướng dẫn sử dụng sản phẩm XYZ Team
        </span>
        <button className=" bg-blue-500 px-4 py-2 rounded-md font-bold">
          XYZ TEAM PAGE
        </button>
      </div>
    </footer>
  );
};

export default Footer;
