import React from "react";

function formatNumber(num) {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + " B";
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + " M";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + " K";
  }
  return num;
}

function StockBD({ data, oldData }) {
  console.log(data);
  console.log("stock");
  console.log(data);
  const getColorClass = (value) => {
    if (value >= 6.7) {
      return "bg-customeStock17";
    } else if (value >= 6 && value < 6.7) {
      return "bg-customeStock16";
    } else if (value >= 5 && value < 6) {
      return "bg-customeStock15";
    } else if (value >= 4 && value < 5) {
      return "bg-customeStock14";
    } else if (value >= 3 && value < 4) {
      return "bg-customeStock13";
    } else if (value >= 2 && value < 3) {
      return "bg-customeStock12";
    } else if (value >= 1 && value < 2) {
      return "bg-customeStock11";
    } else if (value > 0 && value < 1) {
      return "bg-customeStock10";
    } else if (value == 0) {
      return "bg-customeStock9";
    } else if (value > -1 && value < 0) {
      return "bg-customeStock8";
    } else if (value > -2 && value <= -1) {
      return "bg-customeStock7";
    } else if (value > -3 && value <= -2) {
      return "bg-customeStock6";
    } else if (value > -4 && value <= -3) {
      return "bg-customeStock5";
    } else if (value > -5 && value <= -4) {
      return "bg-customeStock4";
    } else if (value > -6 && value <= -5) {
      return "bg-customeStock3";
    } else if (value > -6.7 && value <= -6) {
      return "bg-customeStock2";
    } else if (value <= -6.7) {
      return "bg-customeStock1";
    }
  };
  return (
    <div className=" container mx-auto h-full ">
      {data.length > 0 ? (
        <div className="  grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-[60rem] md:h-[39rem] overflow-y-scroll ">
          {data?.map((stock, index) => (
            <div
              key={index}
              className={` flex-col m-2 justify-between text-black  rounded-lg px-2 ${getColorClass(
                stock?.["Tang/Giam (%)"]
              )}`}
            >
              <div className=" flex justify-between">
                <p>{stock?.Ticker}</p>
                <p>{stock?.Giahientai}</p>
                <p>{formatNumber(stock?.Volume)}</p>
                <p
                // className={`${
                //   stock?.["Tang/Giam (%)"] > 0
                //     ? "text-green-900"
                //     : "text-red-500"
                // }`}
                >
                  {stock?.["Tang/Giam (%)"]}%
                </p>
              </div>
              <div className=" flex justify-between">
                {/* <p>{stock?.["Tang/Giam"]}</p> */}
                <div className=" flex justify-between w-full">
                  <p>Gia tri GD: </p>
                  <p>{formatNumber(stock?.GiatriGD)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className=" text-center">Không tìm thấy dữ liệu</div>
      )}
    </div>
  );
}

export default StockBD;
