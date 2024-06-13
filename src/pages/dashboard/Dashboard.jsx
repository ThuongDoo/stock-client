import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ContrastIcon from "@mui/icons-material/Contrast";
import SsidChartIcon from "@mui/icons-material/SsidChart";

function Dashboard() {
  const sideList = [
    { name: "bang-dien", displayName: "Bảng điện", icon: DashboardIcon },
    { name: "buy-sell", displayName: "Tín hiệu", icon: ContrastIcon },
    { name: "loc-co-phieu", displayName: "Lọc cổ phiếu", icon: FilterAltIcon },
    { name: "roc", displayName: "ROC", icon: SsidChartIcon },
    // { name: "/academic", displayName: "Academic", icon: ContrastIcon },
  ];
  return (
    <div className=" dark:bg-black bg-white ">
      <div className=" flex h-full  min-h-screen w-screen  ">
        <Navigate to="bang-dien" replace={true} />
        <div className="">
          <Sidebar
            sideList={sideList}
            hideDisplayName={true}
            menuVisible={false}
          />
        </div>
        <div className=" flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
