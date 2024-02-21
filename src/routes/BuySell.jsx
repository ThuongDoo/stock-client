import React, { useEffect, useState } from "react";
import api from "../utils/api";

function BuySell() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await api
        .get("/board/buysell")
        .then((res) => {
          const filteredData = [];
          for (let i = 0; i < 100; i++) {
            filteredData.push(res.data[i]);
          }
          setData(filteredData);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  return (
    <div className="">
      {/* ticker, ngay, gia, volume, lai, vi the, buy/sell */}
      <div className=" text-white flex justify-between">
        <h1>Mã CP</h1>
        <h1>Ngày</h1>
        <h1>Giá khuyến nghị</h1>
        <h1>Khối lượng</h1>
        <h1>% Tạm tính</h1>
        <h1>Tín hiệu</h1>
      </div>
      {isLoading === false &&
        data.map((stock, index) => (
          <div
            key={index}
            className={` flex w-full ${
              stock?.["Mua-Ban"] == 1
                ? "bg-green-500"
                : stock?.["Mua-Ban"] == 0
                ? "bg-yellow-500"
                : ""
            } w-64 justify-between border`}
          >
            <p>{stock?.Ticker}</p>
            <p>{stock?.Close}</p>
            <p>{stock?.Volume}</p>
            <p>
              {stock?.["Mua-Ban"] == 1
                ? "Buy"
                : stock?.["Mua-Ban"] == 0
                ? "Sell"
                : ""}
            </p>
          </div>
        ))}
    </div>
  );
}

export default BuySell;
