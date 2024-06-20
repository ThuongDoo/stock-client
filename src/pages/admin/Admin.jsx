import React from "react";
import Header from "../../components/Header";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ContrastIcon from "@mui/icons-material/Contrast";

function Admin() {
  const sideList = [
    { name: "user-manager", displayName: "Users", icon: DashboardIcon },
    { name: "request-manager", displayName: "Requests", icon: FilterAltIcon },
    { name: "import", displayName: "Import", icon: ContrastIcon },
    { name: "category", displayName: "Category", icon: ContrastIcon },
    { name: "article", displayName: "Article", icon: ContrastIcon },
  ];
  return (
    <div className=" bg-black flex flex-col min-h-screen w-screen gap-y-2">
      <div className=" px-8 w-full">
        <Header style={2} />
      </div>
      <div className=" flex-1 flex">
        <Navigate to="user-manager" replace={true} />
        <div className=" w-2/12 ">
          <Sidebar
            sideList={sideList}
            menuVisible={false}
            iconVisible={false}
          />
        </div>
        <div className=" w-10/12 bg-slate-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Admin;
