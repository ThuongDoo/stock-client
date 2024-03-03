import React from "react";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import { useSelector } from "react-redux";
import { getUser } from "../slices/userSlice";
import { format } from "date-fns";
import ResetPasswordForm from "../components/forms/ResetPasswordForm";

function Settings() {
  const user = useSelector(getUser);

  return (
    <div className=" bg-slate-900 min-h-screen h-screen">
      <div className=" px-8 pb-4 absolute w-full z-50">
        <Header />
      </div>
      <div className="  flex flex-col w-full  h-full pt-28 px-8 gap-y-4 sm:flex-row">
        <div className="  w-full  flex flex-col space-y-3">
          <h1 className=" text-xl font-bold">Thông tin cá nhân</h1>
          <div className=" flex flex-col items-start">
            <h1>
              <span className=" font-bold">Họ và tên: </span>
              {user.username}
            </h1>
            <h1>
              <span className=" font-bold">Email: </span>
              {user.email}
            </h1>
            <h1>
              <span className=" font-bold">Sđt: </span>
              {user.phone}
            </h1>
            <h1>
              <span className=" font-bold">Ngày hết hạn: </span>
              {format(new Date(user.expirationDate), "dd-MM-yyyy")}
            </h1>
          </div>
        </div>
        <div className="  w-full space-y-3">
          <h1 className=" text-xl font-bold">Đổi mật khẩu</h1>
          <div>
            <ResetPasswordForm phone={user.phone} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
