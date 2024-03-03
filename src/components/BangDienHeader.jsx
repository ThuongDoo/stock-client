import React from "react";

function BangDienHeader() {
  const data = [
    {
      name: "VNINDEX",
      GiaHienTai: 12134,
      TangGiam: 2.4,
      TangGiamPercent: 2.4,
    },
    {
      name: "VN30",
      GiaHienTai: 12134,
      TangGiam: 2.4,
      TangGiamPercent: 2.4,
    },
    {
      name: "HNXINDEX",
      GiaHienTai: 12134,
      TangGiam: 2.4,
      TangGiamPercent: 2.4,
    },
    {
      name: "HNX30",
      GiaHienTai: 12134,
      TangGiam: 2.4,
      TangGiamPercent: 2.4,
    },
    {
      name: "UPCOM",
      GiaHienTai: 12134,
      TangGiam: 2.4,
      TangGiamPercent: 2.4,
    },
  ];
  return (
    <div className="  w-full items-center grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-5 divide-x-2 divide-slate-700">
      {data?.map((item, index) => (
        <div key={index} className=" flex-1 px-3 mb-2">
          <h1 className=" text-lg">{item.name}</h1>
          <div className=" flex justify-between">
            <h1>{item.GiaHienTai}</h1>
            <h1>
              {item.TangGiam.toFixed(2)} / {item.TangGiamPercent.toFixed(2)}%
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BangDienHeader;
