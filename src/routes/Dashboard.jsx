import React from "react";
import { Navigate, Outlet, redirect } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function Dashboard() {
  redirect("bang-dien");
  return (
    <div className=" my-6 flex h-full dark:bg-black border border-slate-700 rounded-3xl drop-shadow-glow min-h-screen">
      <Navigate to="bang-dien" />
      <div className=" w-2/12">
        <Sidebar />
      </div>
      <div className=" flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
