import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import DashboardIcon from "@mui/icons-material/Dashboard";

function Sidebar() {
  const sideList = [
    {
      name: "Bảng điện",
      url: "bang-dien",
      icon: DashboardIcon,
    },
    {
      name: "Tín hiệu",
      url: "buy-sell",
      icon: PodcastsIcon,
    },
    {
      name: "Lọc cổ phiếu",
      url: "loc-co-phieu",
      icon: FilterAltIcon,
    },
  ];
  return (
    <div className="  bg-white dark:bg-slate-900 p-2 rounded-l-3xl h-full w-full">
      <ul className=" flex flex-col  py-3  gap-y-10 ">
        <NavLink
          to="bang-dien"
          className={({
            isActive,
            isPending,
          }) => ` dark:hover:text-slate-500  w-full flex
              ${
                isPending
                  ? "pending"
                  : isActive
                  ? " dark:text-blue-500 "
                  : " dark:text-white"
              }`}
        >
          <DashboardIcon sx={{ color: "white", fontSize: 30 }} />
          <span>Bảng điện</span>
        </NavLink>
        <NavLink
          to="buy-sell"
          className={({
            isActive,
            isPending,
          }) => ` dark:hover:text-slate-500  w-full flex
              ${
                isPending
                  ? "pending"
                  : isActive
                  ? " dark:text-blue-500 "
                  : " dark:text-white"
              }`}
        >
          <PodcastsIcon sx={{ color: "white", fontSize: 30 }} />
          <span>Tín hiệu</span>
        </NavLink>
        <NavLink
          to="loc-co-phieu"
          className={({
            isActive,
            isPending,
          }) => ` dark:hover:text-slate-500  w-full flex
              ${
                isPending
                  ? "pending"
                  : isActive
                  ? " dark:text-blue-500 "
                  : " dark:text-white"
              }`}
        >
          <FilterAltIcon sx={{ color: "white", fontSize: 30 }} />
          <span className={`isActive && "bgbred500"`}>Lọc cổ phiếu</span>
        </NavLink>
      </ul>
    </div>
  );
}

export default Sidebar;
