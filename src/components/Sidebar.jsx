import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function Sidebar() {
  return (
    <div className="  bg-white dark:bg-slate-900 p-4 rounded-l-3xl h-full">
      <ul className=" flex-col">
        <li>
          <NavLink
            to={"bang-dien"}
            className={({ isActive, isPending }) => ` dark:hover:text-slate-500 
              ${
                isPending
                  ? "pending"
                  : isActive
                  ? " dark:text-blue-500"
                  : " dark:text-white"
              }`}
          >
            Bảng điện
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"buy-sell"}
            className={({ isActive, isPending }) => ` dark:hover:text-slate-500 
              ${
                isPending
                  ? "pending"
                  : isActive
                  ? " dark:text-blue-500"
                  : " dark:text-white"
              }`}
          >
            Buy Sell
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to={"loc-co-phieu"}
            className={({ isActive, isPending }) => ` dark:hover:text-slate-500 
              ${
                isPending
                  ? "pending"
                  : isActive
                  ? " dark:text-blue-500"
                  : " dark:text-white"
              }`}
          >
            Loc Co Phieu
          </NavLink>
        </li> */}
      </ul>
    </div>
  );
}

export default Sidebar;
