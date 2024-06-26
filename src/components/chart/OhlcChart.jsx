import {
  createChart,
  ColorType,
  LineStyle,
  CrosshairMode,
} from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";
import api, { endpoints } from "../../utils/api";
import {
  addHours,
  format,
  formatISO,
  getTime,
  parse,
  parseISO,
} from "date-fns";
import { useSelector } from "react-redux";
import { getTheme } from "../../slices/themeSlice";
import { getLocalTimezoneOffset } from "../../utils/getLocalTimezoneOffset";
import { EVENTS, socket } from "../../utils/socket";

const formatData = async (data, type) => {
  const tempData = await data.map((item) => {
    const inputDate = item.time;
    let formattedDate;
    if (type === "1m") {
      const parsedDate = parseISO(inputDate);
      const timeZoneOffset = getLocalTimezoneOffset();
      const newDate = addHours(parsedDate, 0);
      formattedDate = getTime(newDate) / 1000;
    } else {
      formattedDate = format(inputDate, "yyyy-MM-dd");
    }
    return {
      ...item,
      open: item.open / 1000,
      high: item.high / 1000,
      low: item.low / 1000,
      close: item.close / 1000,
      time: formattedDate,
    };
  });
  return tempData;
};

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
  const [smallestTimeFrame, setSetsmallestTimeFrame] = useState("1d");

  useEffect(() => {
    const fetchData = async () => {
      if (smallestTimeFrame === "1d") {
        await api
          .get(endpoints.OHLC_DAILY + `?ticker=${ticker}`)
          .then(async (res) => {
            const tempData = await formatData(res.data.data, "1d");
            setData(tempData);
          })
          .catch((e) => console.log(e));
      } else {
        await api
          .get(endpoints.OHLC_INTRADAY + `?ticker=${ticker}`)
          .then(async (res) => {
            const tempData = await formatData(res.data.data, "1m");
            setData(tempData);
          })
          .catch((e) => console.log(e));
      }
    };

    fetchData();

    // Function to emit the socket event
  }, [smallestTimeFrame, ticker]);

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
          color: darkMode ? "black" : backgroundColor,
        },
        textColor: darkMode ? "white" : textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      grid: {
        vertLines: { color: darkMode ? "#444" : "#D6DCDE" },
        horzLines: { color: darkMode ? "#444" : "#D6DCDE" },
      },
      timeScale: {
        timeVisible: true,
      },
      crosshair: {
        // Change mode from default 'magnet' to 'normal'.
        // Allows the crosshair to move freely without snapping to datapoints
        // mode: CrosshairMode.Normal,

        // Vertical crosshair line (showing Date in Label)
        vertLine: {
          // width: 8,
          // color: "blue",
          // style: LineStyle.Solid,
          labelBackgroundColor: "white",
        },

        // Horizontal crosshair line (showing Price in Label)
        horzLine: {
          // color: "#9B7DFF",
          labelBackgroundColor: "white",
        },
      },
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    socket.on(EVENTS.SSI_B_UPDATE, async (bData) => {
      console.log("update");
      try {
        const tempData = JSON.parse(bData.data);
        const { dailyData, intradayData } = tempData;
        let newData;
        if (smallestTimeFrame === "1m") {
          newData = intradayData;
        } else {
          newData = dailyData;
        }
        const x = await formatData([newData], smallestTimeFrame);
        newSeries.update(x[0]);
      } catch (error) {}
    });
    socket.on(EVENTS.OHLC_UPDATE, () => {
      emitTradeRequest();
    });
    const emitTradeRequest = () => {
      socket.emit(EVENTS.SSI_B_REQUEST, ticker);
    };

    emitTradeRequest();
    return () => {
      window.removeEventListener("resize", handleResize);
      socket.off(EVENTS.SSI_B_UPDATE);
      socket.off(EVENTS.OHLC_UPDATE);

      chart.remove();
    };
  }, [data, backgroundColor, darkMode, textColor, smallestTimeFrame, ticker]);

  const handleChangeTimeframe = (timeFrame) => {
    setSetsmallestTimeFrame(timeFrame);
  };
  return (
    <div className=" h-full relative">
      <div className=" flex justify-between items-center absolute top-2 left-2 z-50 space-x-3">
        <button
          onClick={() => handleChangeTimeframe("1m")}
          disabled={smallestTimeFrame === "1m"}
          className={` p-1 w-12 rounded-md text-white border ${
            smallestTimeFrame === "1m" ? " bg-blue-500 " : " "
          }`}
        >
          1m
        </button>
        <button
          onClick={() => handleChangeTimeframe("1d")}
          disabled={smallestTimeFrame === "1d"}
          className={` p-1 w-12 rounded-md text-white border ${
            smallestTimeFrame === "1d" ? " bg-blue-500 " : " "
          }`}
        >
          1d
        </button>
      </div>
      <div ref={chartContainerRef} className=" h-full" />
    </div>
  );
};
