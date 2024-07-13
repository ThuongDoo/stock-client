import React from "react";
import { STRINGS } from "../../constants/strings";
import Header from "../../components/Header";

function Verify() {
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
      <div className=" z-40 text-black flex justify-center items-center ">
        <div className=" bg-white flex flex-col justify-center items-start rounded-lg p-10 gap-y-20">
          <div className=" flex flex-col items-start border-b w-full border-black">
            <h1 className=" text-3xl">{STRINGS.VERIFY_EMAIL}</h1>
            <h1 className=" text-gray-500">{STRINGS.MY_EMAIL}</h1>
          </div>
          <h1>{STRINGS.VERIFY_EMAIL_CONTENT}</h1>
        </div>
      </div>
    </div>
  );
}

export default Verify;
