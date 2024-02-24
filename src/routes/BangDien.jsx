import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { CATEGORIES } from "../constants/categories";
import SideBarBD from "../components/SideBarBD";
import StockBD from "../components/StockBD";
import SearchBar from "../components/SearchBar";
import io from "socket.io-client";
import { SOCKET_SERVER_URL } from "../constants/socket";

function BangDien() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("stock", (data) => {
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
      Close: 23.5,
      Volume: 182980,
      profit: 2.5,
    },
    {
      Ticker: "ABC",
      Close: 23.5,
      Volume: 182980,
      profit: 2.5,
    },
    {
      Ticker: "ABC",
      Close: 23.5,
      Volume: 182980,
      profit: 2.5,
    },
    {
      Ticker: "ABC",
      Close: 23.5,
      Volume: 182980,
      profit: 2.5,
    },
    {
      Ticker: "ABC",
      Close: 23.5,
      Volume: 182980,
      profit: 2.5,
    },
    {
      Ticker: "ABC",
      Close: 23.5,
      Volume: 182980,
      profit: 2.5,
    },
    {
      Ticker: "ABC",
      Close: 23.5,
      Volume: 182980,
      profit: 2.5,
    },
    {
      Ticker: "ABC",
      Close: 23.5,
      Volume: 182980,
      profit: 2.5,
    },
  ];
  const [category, setCategory] = useState(CATEGORIES.NGAN_HANG);
  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`/board/bangdien/${category}`)
        .then((res) => {
          const newData = res.data.map((item) => ({
            ...item,
            profit: (((item.Close - item.Open) / item.Open) * 100).toFixed(2),
          }));
          console.log(newData);
          setData(newData);
        })
        .catch((err) => console.log(err));
      console.log("reload");
      // test
      setData(testData);
    };
    fetchData();
    const intervalId = setInterval(fetchData, 10000);

    // Xử lý khi component unmount, clear interval để ngăn không gọi fetchData nữa
    return () => clearInterval(intervalId);
  }, [category]);

  const handleDataFromSideBar = (value) => {
    setCategory(value);
  };
  return (
    <div className=" flex w-full h-full">
      <SideBarBD onClick={handleDataFromSideBar} />
      <div className=" flex flex-col flex-1 items-start">
        <div className=" p-4">
          <SearchBar />
        </div>
        <StockBD data={data} />
      </div>
    </div>
  );
}

export default BangDien;
