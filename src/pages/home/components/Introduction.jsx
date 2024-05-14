import React from "react";
import { Link } from "react-router-dom";

function Introduction() {
  return (
    <div className=" min-h-screen text-white flex flex-col items-center justify-center gap-y-14">
      <img
        src="https://i.vnbusiness.vn/2023/08/04/-3386-1691138721_860x0.jpg"
        alt=""
        className=" absolute left-0  w-full h-full opacity-40 z-0"
      />
      <div className=" flex flex-col gap-y-2 z-10">
        <div className=" flex flex-col gap-y-2 lg:gap-y-4">
          <h1 className=" text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold">
            Chiến lược - Công cụ
          </h1>
          <h1 className=" text-2xl sm:text-2xl md:text-4xl lg:text-6xl font-bold">
            Tối ưu hoá hiệu quả đầu tư
          </h1>
        </div>
        <p className=" text-lg md:text-xl lg:text-2xl text-blue-200 italic">
          Nền tảng đầu tư theo các trường phái Mark Minervini, O'Neil,…
        </p>
      </div>
      <Link
        to={"/dashboard"}
        className=" bg-blue-500 rounded-full w-fit py-4 px-8 z-10"
      >
        <button className=" text-lg font-extrabold">XYZ PRODUCTS</button>
      </Link>
    </div>
  );
}

export default Introduction;
