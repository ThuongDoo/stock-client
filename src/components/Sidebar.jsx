import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function Sidebar() {
  return (
    <div className="  bg-white dark:bg-slate-900 p-4 rounded-l-3xl">
      <ul className=" flex-col">
        <li>
          <Link to={""} className="">
            Bảng điện
          </Link>
        </li>
        <li>
          <Link
            to={"buy-sell"}
            className="
            "
          >
            Buy Sell
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
