import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ContrastIcon from "@mui/icons-material/Contrast";

function Dashboard() {
  const sideList = [
    { name: "bang-dien", displayName: "Bảng điện", icon: DashboardIcon },
    { name: "buy-sell", displayName: "Tín hiệu", icon: FilterAltIcon },
    { name: "loc-co-phieu", displayName: "Lọc cổ phiếu", icon: ContrastIcon },
    { name: "roc", displayName: "ROC", icon: ContrastIcon },
  ];
  return (
    <div className=" dark:bg-black bg-white ">
      <div className=" flex h-full  min-h-screen w-screen  ">
        <Navigate to="bang-dien" replace={true} />
        <div className=" w-2/12 ">
          <Sidebar sideList={sideList} />
        </div>
        <div className=" w-10/12  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
