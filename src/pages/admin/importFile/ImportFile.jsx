import React from "react";
import ImportBuysell from "./ImportBuysell";
import Sidebar from "../../../components/Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ContrastIcon from "@mui/icons-material/Contrast";
import { Navigate, Outlet } from "react-router-dom";

function ImportFile() {
  const sideList = [
    { name: "buysell", displayName: "Buysell", icon: DashboardIcon },
  ];
  return (
    <div className=" flex h-full">
      <Navigate to="buysell" replace={true} />

      <div className=" w-2/12 ">
        <Sidebar sideList={sideList} menuVisible={false} iconVisible={false} />
      </div>
      <div className=" w-10/12 bg-slate-900">
        <Outlet />
      </div>
    </div>
  );
}

export default ImportFile;
