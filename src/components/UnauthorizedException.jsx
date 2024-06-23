import React from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { STRINGS } from "../constants/strings";
import api, { endpoints } from "../utils/api";
import { logout } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function UnauthorizedException() {
  const navigate = useNavigate();
  return (
    <span className=" p-4 ">
      <span>Bạn cần </span>
      <span
        className=" text-blue-500 cursor-pointer"
        onClick={() => navigate("/login")}
      >
        đăng nhập{" "}
      </span>
      <span>đề sử dụng chức năng này</span>
    </span>
  );
}

export default UnauthorizedException;
