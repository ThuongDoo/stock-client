import React, { useEffect, useState } from "react";
import api from "../utils/api";
import StockBD from "../components/StockBD";
import SearchBar from "../components/SearchBar";
import io from "socket.io-client";
import { SOCKET_SERVER_URL } from "../constants/socket";
import BangDienHeader from "../components/BangDienHeader";
import TabBar from "../components/TabBar";
import { CATEGORIES } from "../constants/categories";
import { parse, formatISO } from "date-fns";

function BangDien() {
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [tickerName, setTickerName] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState(CATEGORIES[0].stocks);
  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);
    const fetchTickerName = async () => {
      console.log("reload");
      await api
        .get("/stock/getAll")
        .then((res) => {
          setTickerName(res.data);
        })
        .catch((err) => console.log(err));
    };

    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("stockUpdated", (newData) => {
      socket.emit("updateStockRequest", selectedStocks);
    });

    socket.on("updateStock", (newData) => {
      console.log("relod", newData);
      setOldData(data);
      setData(newData);
    });

    fetchTickerName();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(`/stock/getStockByName/${selectedStocks}`)
        .then((res) => {
          setOldData(data);
          console.log("daa", res.data);

          setData(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
    console.log("hah");
  }, [selectedStocks]);
  const handleDataFromSideBar = (category) => {
    setSelectedStocks(category.stocks);
  };

  const handleSearch = (value) => {
    const fetchData = async () => {
      await api
        .get(`/stock/getStockByName/${value}`)
        .then((res) => {
          setOldData(data);
          setData(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  };
  //test
  return (
    <div className=" flex w-full h-full">
      <div className=" w-2/12">
        <TabBar
          tabs={CATEGORIES}
          style={1}
          onTabClick={handleDataFromSideBar}
        />
      </div>
      <div className=" flex flex-col flex-1 items-start">
        <div className=" w-full">
          <BangDienHeader />
        </div>
        <div className=" p-4">
          <SearchBar onSelect={handleSearch} suggestionData={tickerName} />
        </div>
        <StockBD data={data} oldData={oldData} />
      </div>
    </div>
  );
}

export default BangDien;
