import React from "react";
import { useSelector } from "react-redux";
import { getUser } from "../slices/userSlice";

function MyDropdownButton({ onMenuClick }) {
  const { isLoggedIn, username, role } = useSelector(getUser);
  const handleMenuClick = (value) => {
    onMenuClick(value);
  };
  return (
    <div className=" flex flex-col gap-y-3 text-start">
      <h1 onClick={() => handleMenuClick("settings")}>Cài đặt</h1>
      <div className={`${role === "admin" ? "block" : "hidden"}`}>
        <h1 onClick={() => handleMenuClick("admin")}>Admin</h1>
      </div>
      <h1 onClick={() => handleMenuClick("logout")}>Đăng xuất</h1>
    </div>
  );
}

export default MyDropdownButton;
