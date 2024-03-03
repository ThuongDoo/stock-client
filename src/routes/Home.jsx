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

function Home() {
  return (
    <div className=" bg-black ">
      <a href="#home" className=" fixed right-0 bottom-0 bg-blue-500 ">
        <KeyboardArrowUpIcon sx={{ color: "blue", fontSize: 50 }} />
      </a>
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
