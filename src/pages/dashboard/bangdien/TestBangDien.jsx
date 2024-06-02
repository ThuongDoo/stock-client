import React from "react";
import BangDienHeader from "./components/BangDienHeader";
import TabBar from "../../../components/TabBar";

function TestBangDien() {
  const indexId = [
    "Toàn bộ",
    "VNINDEX",
    "VN30",
    "HNX",
    "UPCOM",
    "PHÁI SINH",
    "Nhom Nganh",
    "TIM KIEM",
  ];
  const indexList = [
    { name: "ALL", displayName: "Toàn bộ" },
    { name: "VN30", displayName: "VN30" },
    { name: "VN100", displayName: "VN100" },
    { name: "VNIndex", displayName: "VNIndex" },
    { name: "VNUTI", displayName: "VNUTI" },
    { name: "VNX50", displayName: "VNX50" },
  ];

  const handleTabBar = () => {};
  return (
    <div className=" flex flex-col h-full p-4 gap-y-4">
      <div className=" ">
        <BangDienHeader />
      </div>
      <div className=" flex w-full h-full">
        <div className=" w-3/4 flex flex-col">
          <div className=" ">
            <div className=" w-3/4">
              <TabBar
                tabs={indexList}
                isHorizontal
                onTabClick={handleTabBar}
                style={{ fontSize: "1rem", button: { padding: "2px" } }}
              />
            </div>
          </div>
          <div className=" bg-orange-500 h-full"></div>
        </div>
        <div className=" bg-yellow-500 w-1/4"></div>
      </div>
    </div>
  );
}

export default TestBangDien;
