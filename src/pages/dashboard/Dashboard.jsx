import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ContrastIcon from "@mui/icons-material/Contrast";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import ListIcon from "@mui/icons-material/List";

function Dashboard() {
  const [isHidden, setIsHidden] = useState(true);
  const sideList = [
    { name: "bang-dien", displayName: "Bảng điện", icon: DashboardIcon },
    { name: "buy-sell", displayName: "Tín hiệu", icon: ContrastIcon },
    { name: "loc-co-phieu", displayName: "Lọc cổ phiếu", icon: FilterAltIcon },
    { name: "roc", displayName: "ROC", icon: SsidChartIcon },
    // { name: "academic", displayName: "Academic", icon: ContrastIcon },
  ];
  return (
    <div className=" dark:bg-black bg-white ">
      <div
        className={` ${!isHidden && "hidden"} absolute md:hidden rounded-full `}
        onClick={() => {
          setIsHidden(false);
        }}
      >
        <ListIcon sx={{ color: "white", fontSize: 30 }} />
      </div>
      {!isHidden && (
        <div className=" bg-gray-800 bg-opacity-30 flex fixed h-full w-full ">
          <div
            className=" w-full h-full absolute"
            onClick={() => setIsHidden(true)}
          ></div>
        </div>
      )}
      <div className=" flex h-full  min-h-screen w-screen  ">
        <Navigate to="bang-dien" replace={true} />
        <div className={` md:block z-50 ${isHidden ? "hidden" : ""}`}>
          <Sidebar
            sideList={sideList}
            hideDisplayName={true}
            menuVisible={false}
          />
        </div>
        <div className=" flex-grow overflow-x-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
