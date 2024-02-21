import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Introduction from "../layouts/Introduction";
import Feature from "../layouts/Feature";
import Review from "../layouts/Review";
import Pricing from "../layouts/Pricing";
import Payment from "../layouts/Payment";
import AboutUs from "../layouts/AboutUs";

function Home() {
  return (
    <div className=" ">
      <Introduction />
      <Feature />
      <Review />
      <AboutUs />
      <Pricing />
      <Payment />
    </div>
  );
}

export default Home;
