import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { CATEGORIES } from "../constants/categories";
import SideBarBD from "../components/SideBarBD";
import StockBD from "../components/StockBD";
import SearchBar from "../components/SearchBar";
import io from "socket.io-client";
import { SOCKET_SERVER_URL } from "../constants/socket";
import BangDienHeader from "../components/BangDienHeader";
import TabBar from "../components/TabBar";

const formatSan = (data) => {};

const getNganh = (data) => {
  const uniqueNganh = new Set(data.map((item) => item.Nganh));
  // const uniqueNganhArray = [...uniqueNganh];
  return Array.from(uniqueNganh)
    .filter((item) => item !== "" && item !== undefined)
    .map((item) => ({
      name: item,
      displayName: item,
    }));
};

const formatData = (category, data) => {
  return data.filter((item) => item.Nganh === category);
};

function BangDien() {
  const [data, setData] = useState([]);
  const [nganh, setNganh] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("stock", (newData) => {
      // Xử lý dữ liệu được nhận tại đây
      setData(newData);
      const newNganh = getNganh(newData);
      setNganh(newNganh);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get("/stock")
        .then((res) => {
          setData(res.data);
          const newNganh = getNganh(res.data);
          setNganh(newNganh);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  const handleDataFromSideBar = (category) => {
    const newData = formatData(category, data);
    setSelectedData(newData);
  };
  return (
    <div className=" flex w-full h-full">
      <div className=" w-2/12">
        <TabBar tabs={nganh} style={1} onTabClick={handleDataFromSideBar} />
      </div>
      <div className=" flex flex-col flex-1 items-start">
        <div className=" w-full">
          <BangDienHeader />
        </div>
        <div className=" p-4">
          <SearchBar />
        </div>
        <StockBD data={selectedData} />
      </div>
    </div>
  );
}

export default BangDien;
