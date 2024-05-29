import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";
import api, { endpoints } from "../../../../utils/api";
import { format, getTime, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { getTheme } from "../../../../slices/themeSlice";

export const OhlcChart = (props) => {
  const {
    ticker,
    colors: {
      backgroundColor = "white",
      lineColor = "#2962FF",
      textColor = "black",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    } = {},
  } = props;

  const darkMode = useSelector(getTheme);

  const chartContainerRef = useRef();

  const [data, setData] = useState([]);
  const [market, setMarket] = useState();
  const [smallestTimeFrame, setSetsmallestTimeFrame] = useState("1d");

  const formatData = async (data, type) => {
    const tempData = await data.map((item) => {
      const inputDate = item.time;
      let formattedDate;
      if (type === "1m") {
        formattedDate = getTime(parseISO(inputDate)) / 1000;
      } else {
        formattedDate = format(inputDate, "yyyy-MM-dd");
      }
      return {
        ...item,
        time: formattedDate,
      };
    });
    return tempData;
  };

  function getArraySizeInMB(arr) {
    // Chuyển mảng thành chuỗi JSON
    let jsonString = JSON.stringify(arr);
    // Tính kích thước của chuỗi JSON (đơn vị bytes)
    let bytes = new Blob([jsonString]).size;
    // Chuyển đổi kích thước thành MB và làm tròn đến 2 chữ số thập phân
    let megabytes = bytes / (1024 * 1024);
    return megabytes.toFixed(2) + " MB";
  }
  useEffect(() => {
    const fetchData = async () => {
      const endpoint =
        smallestTimeFrame === "1d"
          ? endpoints.OHLC_DAILY
          : smallestTimeFrame === "1m" && endpoints.OHLC_INTRADAY;
      await api
        .get(endpoint + `?ticker=${ticker}`)
        .then(async (res) => {
          console.log(res.data);
          const tempData = await formatData(res.data, smallestTimeFrame);
          console.log(tempData);
          setMarket(res.data[0].market);
          setData(tempData);
        })
        .catch((e) => console.log(e));
    };

    fetchData();
  }, [smallestTimeFrame]);

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,

        // localization: { locale: "VN" },
      });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: {
          type: ColorType.Solid,
          color: darkMode ? "#0F172A" : backgroundColor,
        },
        textColor: darkMode ? "white" : textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      grid: {
        vertLines: { color: darkMode ? "#444" : "#D6DCDE" },
        horzLines: { color: darkMode ? "#444" : "#D6DCDE" },
      },
      timeScale: {
        timeVisible: true,
      },
    });
    // chart.timeScale().fitContent();

    const newSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    // console.log(data);
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data]);

  const handleChangeTimeframe = (timeFrame) => {
    setSetsmallestTimeFrame(timeFrame);
  };

  console.log(getArraySizeInMB(data));

  return (
    <div>
      <div className=" flex justify-between items-center">
        <h1 className=" font-bold pb-3">
          {ticker} {market !== null && ":"} {market}
        </h1>
        <div className=" space-x-3">
          <button
            onClick={() => handleChangeTimeframe("1m")}
            disabled={smallestTimeFrame === "1m"}
            className={` p-1 w-12 rounded-md text-white ${
              smallestTimeFrame === "1m" ? "bg-blue-700 " : "bg-blue-500 "
            }`}
          >
            1m
          </button>
          <button
            onClick={() => handleChangeTimeframe("1d")}
            disabled={smallestTimeFrame === "1d"}
            className={` p-1 w-12 rounded-md text-white ${
              smallestTimeFrame === "1d" ? "bg-blue-700 " : "bg-blue-500 "
            }`}
          >
            1d
          </button>
        </div>
      </div>
      <div ref={chartContainerRef} />
    </div>
  );
};
