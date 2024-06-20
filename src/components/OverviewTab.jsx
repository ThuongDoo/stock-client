import React, { useEffect, useState } from "react";
import TabBar from "./TabBar";
import { EVENTS, socket } from "../utils/socket";
import formatNumber from "../utils/formatNumber";
import MucGiaChart from "./chart/MucGiaChart";
import { OhlcChart } from "./chart/OhlcChart";

function OverviewTab({ symbol }) {
  const [xData, setXData] = useState({});
  useEffect(() => {
    socket.on(EVENTS.SSI_X_UPDATE, (tradeData) => {
      try {
        setXData(JSON.parse(tradeData.data));
      } catch (error) {}
    });

    // Function to emit the socket event
    const emitTradeRequest = () => {
      socket.emit(EVENTS.SSI_X_REQUEST, symbol);
    };
    emitTradeRequest();

    // Start the interval for emitting the request
    return () => {
      socket.off(EVENTS.SSI_X_UPDATE);
    };
  }, [symbol]);

  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { name: 0, displayName: "Tổng quan" },
    { name: 1, displayName: "Mức giá" },
  ];
  const handleTabBar = (value) => {
    setActiveTab(value.name);
  };
  return (
    <div className=" h-full flex border border-gray-500">
      <div className=" w-9/12 h-full ">
        <OhlcChart ticker={symbol} />
      </div>
      <div className=" w-3/12 bg-slate-800">
        <div className=" flex flex-col p-2 gap-y-2 h-full">
          <div>
            <TabBar
              tabs={tabs}
              isHorizontal
              onTabClick={handleTabBar}
              style={{
                fontSize: "0.8rem",
                borderRadius: "10px",
                button: {
                  padding: "2px",
                  // onActive: { boxShadow: "inset 0 -4px 0 0 white" },
                },
              }}
            />
          </div>
          <div className=" h-full">
            {activeTab === 0 ? (
              <TongQuan xData={xData} />
            ) : (
              <MucGia symbol={symbol} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewTab;

function TongQuan({ xData }) {
  const symbol = xData.Symbol;
  const data = [
    { name: "Tham chiếu", data: xData?.RefPrice / 1000 },
    { name: "Mở cửa", data: xData?.Open / 1000 },
    {
      name: "Thấp - Cao",
      data: `${xData?.Low / 1000} - ${xData?.High / 1000}`,
    },
    { name: "Khối lượng", data: formatNumber(xData?.TotalVol) },
    { name: "Giá trị", data: formatNumber(xData?.TotalVal) },
  ];
  const [rData, setRData] = useState([]);
  useEffect(() => {
    socket.on(EVENTS.SSI_R_UPDATE, (data) => {
      try {
        setRData(JSON.parse(data.data));
      } catch (error) {}
    });

    // Function to emit the socket event
    const emitTradeRequest = () => {
      socket.emit(EVENTS.SSI_R_REQUEST, symbol);
    };
    emitTradeRequest();

    // Start the interval for emitting the request
    return () => {
      socket.off(EVENTS.SSI_R_UPDATE);
    };
  }, [symbol]);
  console.log(rData);
  return (
    <div className=" flex flex-col text-sm">
      {data?.map((item, index) => (
        <div
          key={index}
          className={` py-2 px-1 flex justify-between ${
            index % 2 === 0 ? " bg-slate-700" : "bg-slate-600"
          }`}
        >
          <h1>{item.name}</h1>
          <h1>{item.data}</h1>
        </div>
      ))}
      <div className="">
        <NuocNgoaiTable
          h1={"KL Mua"}
          h2={"KL Bán"}
          h3={"KL Mua-Bán"}
          d1={rData?.BuyVol}
          d2={rData?.SellVol}
          d3={rData?.BuyVol - rData?.SellVol}
        />
      </div>
      <div>
        <NuocNgoaiTable
          h1={"GT Mua"}
          h2={"GT Bán"}
          h3={"GT Mua-Bán"}
          d1={rData?.BuyVal}
          d2={rData?.SellVal}
          d3={rData?.BuyVal - rData?.SellVal}
        />
      </div>
    </div>
  );
}

function MucGia({ symbol }) {
  const [orderBook, setOrderBook] = useState([]);
  const formatOrderBook = (data) => {
    console.log(data);
    const priceMap = {};
    for (const item of data) {
      if (!priceMap[item.lastPrice]) {
        priceMap[item.lastPrice] = {
          price: formatNumber(item.lastPrice / 1000, 2),
          sd: 0,
          bu: 0,
          uk: 0,
        };
      }
      switch (item.side) {
        case "BU":
          priceMap[item.lastPrice].bu += item.lastVol;
          break;
        case "SD":
          priceMap[item.lastPrice].sd += item.lastVol;
          break;
        default:
          priceMap[item.lastPrice].uk += item.lastVol;
          break;
      }
    }
    return Object.values(priceMap);
  };
  useEffect(() => {
    socket.on(EVENTS.SSI_ORDER_BOOK_UPDATE, (tradeData) => {
      try {
        const formattedData = formatOrderBook(JSON.parse(tradeData.data));
        setOrderBook(formattedData);
      } catch (error) {}
    });

    // Function to emit the socket event
    const emitTradeRequest = () => {
      socket.emit(EVENTS.SSI_ORDER_BOOK_REQUEST, symbol);
    };
    emitTradeRequest();

    // Start the interval for emitting the request
    return () => {
      socket.off(EVENTS.SSI_ORDER_BOOK_UPDATE);
    };
  }, [symbol]);
  return (
    <div className=" h-full w-full">
      <MucGiaChart data={orderBook} />
    </div>
  );
}

function NuocNgoaiTable({ h1, h2, h3, d1, d2, d3 }) {
  console.log(d1, d2, d3);
  return (
    <table className="w-full">
      <thead>
        <tr className=" text-sm">
          <th className="w-1/3">{h1}</th>
          <th className="w-1/3">{h2}</th>
          <th className="w-1/3">{h3}</th>
        </tr>
      </thead>
      <tbody>
        <tr className=" text-sm">
          <td className="w-1/3">{d1 ? formatNumber(d1, 2) : 0}</td>
          <td className="w-1/3">{d2 ? formatNumber(d2, 2) : 0}</td>
          <td className="w-1/3">{d3 ? formatNumber(d3, 2) : 0}</td>
        </tr>
      </tbody>
    </table>
  );
}
