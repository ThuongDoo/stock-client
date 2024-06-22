import React from "react";
import ContrastIcon from "@mui/icons-material/Contrast";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

function ArticleManager() {
  const sideList = [
    { name: "category", displayName: "Category", icon: ContrastIcon },
    { name: "article", displayName: "Article", icon: ContrastIcon },
  ];
  return (
    <div className=" flex-1 flex h-full">
      <Navigate to={sideList[0].name} replace={true} />
      <div className=" w-2/12 ">
        <Sidebar sideList={sideList} menuVisible={false} iconVisible={false} />
      </div>
      <div className=" w-10/12 bg-slate-900">
        <Outlet />
      </div>
    </div>
  );
}

export default ArticleManager;
