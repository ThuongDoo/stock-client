import React from "react";

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
  return (
    <div className=" flex flex-col h-full">
      <div className=" bg-green-500 h-1/6"></div>

      <div className=" flex w-full h-5/6">
        <div className=" bg-blue-500 w-3/4 flex flex-col">
          <div className=" bg-red-500 h-10 flex justify-around">
            {indexId.map((item, index) => (
              <div className=" bg-yellow-500 h-full">{item}</div>
            ))}
          </div>
          <div className=" bg-orange-500 h-full"></div>
        </div>
        <div className=" bg-yellow-500 w-1/4"></div>
      </div>
    </div>
  );
}

export default TestBangDien;
