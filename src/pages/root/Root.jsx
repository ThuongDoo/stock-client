import React from "react";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div className=" dark:text-white text-black w-screen">
      <Outlet />
    </div>
  );
}

export default Root;
