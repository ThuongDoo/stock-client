import React, { useEffect, useState } from "react";
import BangDienHeader from "./components/BangDienHeader";
import TabBar from "../../../components/TabBar";
import BangDienStockBoard from "./components/BangDienStockBoard";
import Favorite from "./components/Favorite";
import api, { endpoints } from "../../../utils/api";

function BangDien() {
  const [isReload, setisReload] = useState(false);

  const indexList = [
    { name: "ALL", displayName: "TẤT CẢ" },
    { name: "VNINDEX", displayName: "VNINDEX" },
    { name: "VN30", displayName: "VN30" },
    { name: "HNXIndex", displayName: "HNX" },
    { name: "HNX30", displayName: "HNX30" },
    { name: "HNXUpcomIndex", displayName: "UPCOM" },
  ];

  const handleReload = () => {
    setisReload(!isReload);
  };

  return (
    <div className=" flex flex-col h-screen p-4 gap-y-4 w-full">
      <div className=" ">
        <BangDienHeader data={indexList} />
      </div>
      <div className=" flex w-full flex-grow h-0 gap-x-4">
        <div className=" w-1/2 md:w-1/3 lg:w-1/5 bg-slate-800 p-2 rounded-lg">
          <Favorite isParentReload={isReload} />
        </div>
        <div className=" w-1/2 md:w-2/3 lg:w-4/5 bg-slate-800 p-2 rounded-lg">
          <BangDienStockBoard tabs={indexList} onReload={handleReload} />
        </div>
      </div>
    </div>
  );
}

export default BangDien;
