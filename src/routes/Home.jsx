import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Introduction from "../layouts/Introduction";
import Feature from "../layouts/Feature";
import Review from "../layouts/Review";
import Pricing from "../layouts/Pricing";
import Payment from "../layouts/Payment";
import AboutUs from "../layouts/AboutUs";
import Contact from "../layouts/Contact";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { deletedBuysell } from "../constants/deletedBuysell";
import zalo_icon from "../images/zalo-icon.png";
import { zaloLink } from "../constants/url";

function Home() {
  return (
    <div className=" bg-black ">
      <div className=" fixed flex flex-col  right-4 bottom-4  gap-y-3 z-50 items-center">
        <a
          href={zaloLink}
          target="_blank"
          rel="noreferrer"
          className=" relative"
        >
          <span class=" absolute top-0 right-0 flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>

          <img src={zalo_icon} alt="Zalo" className=" size-12 rounded-full" />
        </a>
        <a
          href="#home"
          className="  bg-blue-500  size-12 flex justify-center items-center "
        >
          <KeyboardArrowUpIcon sx={{ color: "blue", fontSize: 50 }} />
        </a>
      </div>
      <div className=" pb-4 absolute w-full z-50 px-6 md:px-12 lg:px-24">
        <Header />
      </div>
      <div id="home">
        <Introduction />
      </div>
      <div id="feature">
        <Feature />
      </div>

      <div id="about-us" className=" w-full">
        <Review />
      </div>
      {/* <div id="about-us">
        <AboutUs />
      </div> */}
      <div id="pricing" className=" w-full">
        <Pricing />
      </div>
      <div id="contact">
        <Contact />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
