import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import TabBar from "../components/TabBar";

function Dashboard() {
  return (
    <div className=" dark:bg-black bg-white ">
      <div className=" flex h-full  min-h-screen w-screen  ">
        <Navigate to="bang-dien" replace={true} />
        <div className=" w-2/12">
          <Sidebar />
        </div>
        <div className=" w-10/12 p-3 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
