import React from "react";

function StockBD({ data }) {
  const getColorClass = (value) => {
    if (value >= 6.7) {
      return "bg-purple-600";
    } else if (value >= 6 && value < 6.7) {
      return "bg-purple-400";
    } else if (value >= 5 && value < 6) {
      return "bg-green-600";
    } else if (value >= 4 && value < 5) {
      return "bg-green-500";
    } else if (value >= 3 && value < 4) {
      return "bg-green-400";
    } else if (value >= 2 && value < 3) {
      return "bg-green-300";
    } else if (value >= 1 && value < 2) {
      return "bg-green-200";
    } else if (value > 0 && value < 1) {
      return "bg-green-100";
    } else if (value == 0) {
      return "bg-yellow-100";
    } else if (value > -1 && value < 0) {
      return "bg-red-100";
    } else if (value > -2 && value <= -1) {
      return "bg-red-200";
    } else if (value > -3 && value <= -2) {
      return "bg-red-300";
    } else if (value > -4 && value <= -3) {
      return "bg-red-400";
    } else if (value > -5 && value <= -4) {
      return "bg-red-500";
    } else if (value > -6 && value <= -5) {
      return "bg-red-600";
    } else if (value > -6.7 && value <= -6) {
      return "bg-sky-400";
    } else if (value <= -6.7) {
      return "bg-sky-600";
    }
  };
  return (
    <div className=" container mx-auto">
      <div className="  grid grid-cols-4 ">
        {data.map((stock, index) => (
          <div
            key={index}
            className={` flex-col border-black border justify-between  rounded-lg px-2 ${getColorClass(
              stock.profit
            )}`}
          >
            <div className=" flex justify-between">
              <p>{stock.Ticker}</p>
              <p>{stock.Close}</p>
              <p>{stock.profit}%</p>
            </div>
            {/* <p>Value: {stock.Value}</p> */}
            <p>Volume: {stock.Volume}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StockBD;
