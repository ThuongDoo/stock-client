import React from "react";
import ContrastIcon from "@mui/icons-material/Contrast";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";

function MarkerManager() {
  const sideList = [
    { name: "import", displayName: "Import", icon: ContrastIcon },
  ];
  return (
    <div className=" bg-black flex flex-col min-h-screen w-screen gap-y-2">
      <div className=" flex-1 flex">
        <Navigate to="import" replace={true} />
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

export default MarkerManager;
