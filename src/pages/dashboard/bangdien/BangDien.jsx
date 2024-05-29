import React, { useEffect, useState } from "react";
import api, { endpoints } from "../../../utils/api";
import StockBD from "./components/StockBD";
import SearchBar from "../../../components/SearchBar";
import { SOCKETS, SOCKET_SERVER_URL } from "../../../constants/socket";
import { CATEGORIES } from "../../../constants/categories";
import DropdownList from "../../../components/DropdownList";
import { io } from "socket.io-client";
import BangDienHeader from "./components/BangDienHeader";
import UnauthorizedException from "../../../components/UnauthorizedException";
import BangDienHeaderSkeleton from "../../../skeletons/BangDienHeaderSkeleton";
import StockBDSkeleton from "../../../skeletons/StockBDSkeleton";

function sortByTickerLengthAscending(data) {
  return data.sort((a, b) => a.length - b.length);
}

function BangDien() {
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [sanData, setSanData] = useState([]);
  const [tickerName, setTickerName] = useState([]);
  const [error, setError] = useState(null);
  const [isSanLoading, setIsSanLoading] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [selectedStocks, setSelectedStocks] = useState(CATEGORIES[0].stocks);
  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);
    const fetchTickerName = async () => {
      await api
        .get(endpoints.STOCK_GET_ALL)
        .then((res) => {
          const sortData = res.data;
          sortByTickerLengthAscending(sortData);
          setTickerName(res.data);
        })
        .catch((err) => {
          setError(err.response.status);
        });
    };
    const fetchSan = async () => {
      await api
        .get(endpoints.STOCK_GET_SAN)
        .then((res) => {
          setIsSanLoading(false);
          setSanData(res.data);
        })
        .catch((err) => {
          setError(err.response.status);
        });
    };

    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on(SOCKETS.NEW_STOCK_DATA_AVAILABLE, (newData) => {
      console.log("sendData", selectedStocks);
      socket.emit(SOCKETS.STOCK_REQUEST, selectedStocks);
    });

    socket.on(SOCKETS.UPDATE_STOCK_DATA, (newData) => {
      setOldData(data);
      console.log(newData.data);
      setData(newData.data);
      setSanData(newData.sanData);
    });

    fetchTickerName();
    fetchSan();

    return () => {
      socket.disconnect();
    };
  }, [selectedStocks]);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(endpoints.STOCK_GET_STOCK_BY_NAME + `/${selectedStocks}`)
        .then((res) => {
          setIsDataLoading(false);
          setData(res.data);
        })
        .catch((err) => {
          setError(err.response.status);
        });
    };
    fetchData();
  }, [selectedStocks]);
  const handleDataFromSideBar = (category) => {
    setSelectedStocks(category.stocks);
  };

  const handleSearch = (value) => {
    setSelectedStocks(value);
    setIsDataLoading(true);
    const fetchData = async () => {
      await api
        .get(endpoints.STOCK_GET_STOCK_BY_NAME + `/${value}`)
        .then((res) => {
          setIsDataLoading(false);
          setData(res.data);
        })
        .catch((err) => {
          setError(err.response.status);
        });
    };
    fetchData();
  };
  console.log(data);
  return (
    <div className=" flex w-full h-full ">
      <div className=" flex flex-col flex-1 items-start">
        <div className=" w-full">
          {isSanLoading === true ? (
            <BangDienHeaderSkeleton />
          ) : (
            <BangDienHeader data={sanData} />
          )}
        </div>
        <div className=" p-4 flex flex-col gap-y-4 md:flex-row md:gap-y-0 gap-x-4">
          <SearchBar onSelect={handleSearch} suggestionData={tickerName} />
          <DropdownList list={CATEGORIES} onClick={handleDataFromSideBar} />
        </div>
        <div className=" w-full flex-1">
          {isDataLoading === true ? (
            <StockBDSkeleton />
          ) : (
            <StockBD data={data} oldData={oldData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default BangDien;
