import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import zaloIcon from "../images/icons8-zalo-48.png";

function Root() {
  const zaloLink = "https://zalo.me/0333817395";

  return (
    <div className=" dark:text-white">
      <Outlet />
    </div>
  );
}

export default Root;
