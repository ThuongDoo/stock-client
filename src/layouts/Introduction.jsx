import React from "react";
import { Link } from "react-router-dom";

function Introduction() {
  return (
    <div className=" h-screen text-white flex flex-col items-center justify-center gap-y-14">
      <img
        src="https://i.vnbusiness.vn/2023/08/04/-3386-1691138721_860x0.jpg"
        alt=""
        className=" absolute left-0  w-full h-full opacity-40 z-0"
      />
      <div className=" flex flex-col gap-y-2 z-10">
        <div className=" flex flex-col gap-y-4">
          <h1 className=" text-6xl font-bold">Mô phỏng & hiện thực hóa</h1>
          <h1 className=" text-6xl font-bold">Mọi chiến thuật đầu tư</h1>
        </div>
        <p className=" text-2xl text-blue-500">
          Nền tảng không thể thiếu của nhà đầu tư chứng khoán chuyên nghiệp
        </p>
      </div>
      <Link
        to={"/dashboard"}
        className=" bg-blue-500 rounded-full w-fit py-4 px-8 z-10"
      >
        <button>GET STARTED</button>
      </Link>
    </div>
  );
}

export default Introduction;
