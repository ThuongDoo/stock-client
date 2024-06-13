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
    <div className=" h-full flex border border-gray-500 divide-x divide-white">
      <div className=" w-9/12 h-full ">
        <OhlcChart ticker={symbol} />
      </div>
      <div className=" w-3/12 bg-slate-600">
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
              <MucGia xData={xData} />
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

function MucGia({ xData }) {
  const data = [];
  if (xData) {
    for (let i = 1; i <= 10; i++) {
      let object = {};
      // object.AskPrice = xData[`AskPrice${i}`];
      object.AskVol = xData[`AskVol${i}`];
      // object.BidPrice = xData[`BidPrice${i}`];
      object.BidVol = xData[`BidVol${i}`];
      object.label = xData[`AskPrice${i}`];
      if (object.label !== 0) {
        data.push(object);
      }
    }
  }
  console.log(xData);
  return (
    <div className=" h-full w-full">
      <MucGiaChart data={data} />
    </div>
  );
}

function NuocNgoaiTable({ h1, h2, h3, d1, d2, d3 }) {
  return (
    <table className="w-full">
      <thead>
        <tr className=" text-sm">
          <th className="w-1/4">{h1}</th>
          <th className="w-1/4">{h2}</th>
          <th className="w-2/4">{h3}</th>
        </tr>
      </thead>
      <tbody>
        <tr className=" text-sm">
          <td className="w-1/4">{formatNumber(d1, 2)}</td>
          <td className="w-1/4">{formatNumber(d2, 2)}</td>
          <td className="w-2/4">{formatNumber(d3, 2)}</td>
        </tr>
      </tbody>
    </table>
  );
}
