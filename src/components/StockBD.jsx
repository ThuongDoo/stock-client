import React from "react";

function StockBD({ data }) {
  return (
    <div className=" w-80">
      {data.map((stock, index) => (
        <div
          key={index}
          className=" flex border-black border justify-between bg-green-500 rounded-lg px-2"
        >
          <p>{stock.Ticker}</p>
          <p>{stock["Gia hien tai"]}</p>
          <p>{stock["Gia tri GD "]}</p>
          <p>{stock.Volume}</p>
        </div>
      ))}
    </div>
  );
}

export default StockBD;
