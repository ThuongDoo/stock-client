import React from "react";

function BangDienHeader({ data }) {
  return (
    <div className="  w-full items-center grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-5 ">
      {data?.map((item, index) => (
        <div
          key={index}
          className=" flex-1 px-3 mb-2 border-x border-slate-700 box-border"
        >
          <h1 className=" text-lg">{item.Ticker}</h1>
          <div className=" flex justify-between">
            <h1>{Number(item.Giahientai).toFixed(2)}</h1>
            <h1>
              <span
                className={`${
                  item?.["Tang/Giam"] > 0
                    ? "text-green-500"
                    : item?.["Tang/Giam"] < 0
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {Number(item?.["Tang/Giam"]).toFixed(2)}
              </span>
              <span> / </span>
              <span
                className={`${
                  item?.["Tang/Giam (%)"] > 0
                    ? "text-green-500"
                    : item?.["Tang/Giam"] < 0
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {Number(item?.["Tang/Giam (%)"]).toFixed(2)}%
              </span>
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BangDienHeader;
