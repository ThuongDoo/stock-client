import React from "react";
import Header from "../../components/Header";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ContrastIcon from "@mui/icons-material/Contrast";
import { useSelector } from "react-redux";
import { getUser } from "../../slices/userSlice";

function Admin() {
  const sideList = [
    { name: "user-manager", displayName: "Users", icon: DashboardIcon },
    { name: "request-manager", displayName: "Requests", icon: FilterAltIcon },
    { name: "buysell", displayName: "Import Buysell", icon: ContrastIcon },
    { name: "category", displayName: "Category", icon: ContrastIcon },
    { name: "article-manager", displayName: "Article", icon: ContrastIcon },
  ];
  const { isLoggedIn, roles } = useSelector(getUser);
  const navigate = useNavigate();
  if (roles !== "admin") {
    navigate("/");
  }

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
