import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <div className=" bg-black px-8">
      <Header style={2} />
      <div className=" my-6 flex h-full dark:bg-black border border-slate-700 rounded-3xl drop-shadow-glow min-h-screen">
        <Navigate to="bang-dien" />
        <div className=" w-2/12">
          <Sidebar />
        </div>
        <div className=" flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
