import React from "react";

import zaloIcon from "../images/icons8-zalo-48.png";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const zaloLink = "https://zalo.me/0333817395";
  return (
    <footer className=" px-6 bg-slate-900 flex flex-col md:px-12 lg:px-24  justify-between text-white">
      <div className=" py-4 flex justify-evenly ">
        <div className=" flex flex-col items-center justify-center">
          <img src={logo} alt="" className=" size-20" />
          <h1 className="  text-3xl font-bold">XYZ TEAM</h1>
        </div>
        <div className="   flex  items-start flex-col gap-y-2 px-1">
          <h1 className=" text-xs sm:text-sm lg:text-lg font-bold">
            Bạn cần hỗ trợ
          </h1>
          <div className=" flex flex-col items-start gap-y-1">
            <div className=" text-left">
              <h1 className=" text-xs sm:text-md lg:text-lg font-bold">
                0939.600.338 (Mr. Luân)
              </h1>
              <h1 className=" text-xs sm:text-md lg:text-lg font-bold">
                0936.842.309 (Mr. Phú)
              </h1>
            </div>
            <h1 className=" text-xs sm:text-sm lg:text-md text-start">
              <span className=" font-bold">Email: </span>
              support@chungkhoanxyz.com
            </h1>
            <h1 className=" text-xs sm:text-sm lg:text-md text-start">
              <span className=" font-bold">Địa chỉ: </span>
              P2 Vinhomes Central Park, Phường 22, Quận Bình Thạnh, Thành phố Hồ
              Chí Minh
            </h1>
            <div className=" flex gap-x-4 py-2">
              <div className=" rounded-full size-8 bg-blue-500 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faTiktok}
                  style={{ fontSize: 20, color: "black" }}
                />
              </div>
              <div className=" rounded-full size-8 bg-blue-500 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faFacebookF}
                  style={{ fontSize: 20, color: "black" }}
                />
              </div>
              <div className=" rounded-full size-8 bg-blue-500 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faYoutube}
                  style={{ fontSize: 20, color: "black" }}
                />
              </div>
              <div className=" rounded-full size-8 bg-blue-500 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{ fontSize: 20, color: "black" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="    flex flex-col  items-start gap-y-2  min-w-fit">
          <h1 className=" text-xs sm:text-sm lg:text-lg font-bold">
            Giói thiệu
          </h1>
          <div className=" flex flex-col items-start gap-y-1">
            <a href="#feature" className=" text-xs sm:text-sm md:text-md">
              Tính năng
            </a>
            <a href="#about-us" className=" text-xs sm:text-sm md:text-md">
              Về chúng tôi
            </a>
            <Link to={"/dashboard"} className=" text-xs sm:text-sm md:text-md">
              X Products
            </Link>
            <a href="#contact" className=" text-xs sm:text-sm md:text-md">
              Liên hệ
            </a>
            <a href="#pricing" className=" text-xs sm:text-sm md:text-md">
              Bảng giá
            </a>
          </div>
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
