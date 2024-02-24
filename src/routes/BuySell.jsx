import React, { useEffect, useState } from "react";
import api from "../utils/api";
import SearchBar from "../components/SearchBar";
import DateFilter from "../components/DateFilter";
import { SOCKET_SERVER_URL } from "../constants/socket";
import { io } from "socket.io-client";

function BuySell() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("buysell", (data) => {
      console.log("Received data:", data);
      // Xử lý dữ liệu được nhận tại đây
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const testData = [
    {
      Ticker: "ABC",
      date: "20/12/2002",
      price: 25.6,
      volume: 180973,
      profit: 2.5,
      signal: 1,
    },
    {
      Ticker: "ABC",
      date: "20/12/2002",
      price: 25.6,
      volume: 180973,
      profit: 2.5,
      signal: 1,
    },
    {
      Ticker: "ABC",
      date: "20/12/2002",
      price: 25.6,
      volume: 180973,
      profit: 2.5,
      signal: 1,
    },
    {
      Ticker: "ABC",
      date: "20/12/2002",
      price: 25.6,
      volume: 180973,
      profit: 2.5,
      signal: 1,
    },
    {
      Ticker: "ABC",
      date: "20/12/2002",
      price: 25.6,
      volume: 180973,
      profit: 2.5,
      signal: 0,
    },
    {
      Ticker: "ABC",
      date: "20/12/2002",
      price: 25.6,
      volume: 180973,
      profit: 2.5,
      signal: 1,
    },
    {
      Ticker: "ABC",
      date: "20/12/2002",
      price: 25.6,
      volume: 180973,
      profit: 2.5,
      signal: 0,
    },
    {
      Ticker: "ABC",
      date: "20/12/2002",
      price: 25.6,
      volume: 180973,
      profit: 2.5,
      signal: 1,
    },
  ];

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
    <div className=" flex flex-col px-4 py-4 gap-y-4">
      <div className=" flex justify-between">
        <SearchBar />
        <DateFilter />
      </div>
      <table className=" dark:text-white w-full">
        <thead>
          <tr>
            <th>Mã CP</th>
            <th>Ngày</th>
            <th>Giá khuyến nghị</th>
            <th>Khối lượng</th>
            <th>% Tạm tính</th>
            <th>Tín hiệu</th>
          </tr>
        </thead>
        <tbody>
          {testData?.map((stock, index) => (
            <tr
              key={index}
              className={` ${
                stock?.signal == 1
                  ? "bg-green-500"
                  : stock?.signal == 0
                  ? "bg-yellow-500"
                  : ""
              }  border`}
            >
              <td>{stock?.Ticker}</td>
              <td>{stock?.date}</td>
              <td>{stock?.price}</td>
              <td>{stock?.volume}</td>
              <td>{stock?.profit}</td>
              <td>
                {stock?.signal == 1 ? "Buy" : stock?.signal == 0 ? "Sell" : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BuySell;
