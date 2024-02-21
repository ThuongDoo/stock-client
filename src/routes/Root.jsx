import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import zaloIcon from "../images/icons8-zalo-48.png";

function Root() {
  const zaloLink = "https://zalo.me/0333817395";

  return (
    <div className=" px-8 py-4 bg-black">
      <Header />
      <Outlet />
      <Footer />
      <div class="fixed bottom-0 right-0 mb-4 mr-4">
        <a href={zaloLink} target="_blank" rel="noreferrer">
          <img src={zaloIcon} alt="Zalo" className=" h-20 w-20" />
        </a>
      </div>
    </div>
  );
}

export default Root;
