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
    <div>
      {isLoading === false &&
        data.map((stock, index) => (
          <div
            key={index}
            className=" flex bg-green-500 w-64 justify-between border"
          >
            <p>{stock.Ticker}</p>
            <p>{stock.Close}</p>
            <p>{stock.Volume}</p>
            <p>{stock["Buy Signal"]}</p>
            <p>{stock["Sell Signal"]}</p>
          </div>
        ))}
    </div>
  );
}

export default BuySell;
