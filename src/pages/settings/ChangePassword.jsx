import React, { useEffect } from "react";
import Header from "../../components/Header";
import ResetPasswordForm from "./components/ResetPasswordForm";
import { useSelector } from "react-redux";
import { getUser } from "../../slices/userSlice";

function ChangePassword() {
  const user = useSelector(getUser);

  return (
    <div className=" flex h-screen justify-center bg-black">
      <img
        src="https://i.vnbusiness.vn/2023/08/04/-3386-1691138721_860x0.jpg"
        alt=""
        className=" absolute left-0  w-full h-full opacity-40 z-0"
      />
      <div className="  pb-4 absolute w-full z-50 px-6 md:px-12 lg:px-24">
        <Header hidden={true} />
      </div>
      <div className="  flex items-center justify-center z-40">
        <div className="">
          <ResetPasswordForm phone={user.phone} />
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
