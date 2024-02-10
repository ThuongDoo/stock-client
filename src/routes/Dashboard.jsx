import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <div className=" my-6 flex h-full dark:bg-black border border-slate-700 rounded-3xl drop-shadow-glow  ">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Dashboard;
