import React from "react";

import zaloIcon from "../images/icons8-zalo-48.png";

const Footer = () => {
  const zaloLink = "https://zalo.me/0333817395";
  return (
    <footer className=" bg-slate-900 flex flex-col px-24  justify-between">

        <div className=" py-4">
          <h1 className="  text-3xl font-bold">XYZ TEAM</h1>
          <div className="  h-full flex  justify-center  items-center gap-x-3">
              <h1>Hotline: 0987654</h1>
              <h1>Email: dfghj@gmail.com</h1>
            </div>
            <div className="  h-full  flex  justify-center ">
              <h1 className=" px-3 text-slate-400 border-slate-400 border-r">Doi ngu</h1>
              <h1 className=" px-3 text-slate-400 border-slate-400 border-r">Ve chung toi</h1>
              <h1 className=" px-3 text-slate-400 border-slate-400 ">Gioi thieu</h1>
            </div >
        </div>
        
        <div className=" flex justify-center items-center gap-x-4 border-t border-slate-700 py-4">
            <span className=" text-gray-300">Hướng dẫn sử dụng sản phẩm XYZ team</span>
            <button className=" bg-blue-500 px-4 py-2 rounded-md font-bold">XYZ TEAM PAGE</button>
        </div>
      
    </footer>
  );
};

export default Footer;
