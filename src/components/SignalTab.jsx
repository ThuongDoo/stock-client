import React, { useEffect, useState } from "react";
import api, { endpoints } from "../utils/api";
import { SignalChart } from "./chart/SignalChart";
import { EVENTS, socket } from "../utils/socket";

function SignalTab({ symbol }) {
  const formatData = (data) => {
    let macd;
    if (data?.MACDcatlen === "1") {
      macd = "cắt lên";
    } else if (data?.MACDcatxuong === "1") {
      macd = "cắt xuống";
    } else if (data?.MACDnamduoi === "1") {
      macd = "nằm trên";
    } else {
      macd = "nằm dưới";
    }
    return [
      { name: "RS Rating", data: Number(data?.RSRating) },
      {
        name: "RSI",
        data: Number(data?.RSI),
      },
      { name: "ADX", data: Number(data?.ADX) },
      { name: "MACD", data: macd },
    ];
  };
  const [signalInfo, setSignalInfo] = useState([]);
  useEffect(() => {
    socket.on(EVENTS.NEW_STOCK_DATA_AVAILABLE, (newData) => {
      socket.emit(EVENTS.STOCK_REQUEST, symbol);
    });

    socket.on(EVENTS.STOCK_UPDATE, (newData) => {
      const formattedData = formatData(newData.data[0]);
      setSignalInfo(formattedData);
    });

    socket.emit(EVENTS.STOCK_REQUEST, symbol);

    return () => {
      socket.off(EVENTS.NEW_STOCK_DATA_AVAILABLE);
      socket.off(EVENTS.STOCK_UPDATE);
    };
  }, [symbol]);
  console.log(signalInfo);
  return (
    <div className=" h-full flex gap-x-1 ">
      <div className=" w-9/12">
        <SignalChart ticker={symbol} />
      </div>
      <div className=" w-3/12 bg-slate-900">
        <div className=" flex flex-col ">
          {signalInfo?.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between px-1 py-2 ${
                index % 2 === 0 ? " bg-slate-800" : " bg-slate-900"
              }`}
            >
              <h1>{item.name}</h1>
              <h1>{item.data}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SignalTab;
