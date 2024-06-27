import {
  createChart,
  ColorType,
  LineStyle,
  CrosshairMode,
} from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";
import api, { endpoints } from "../../utils/api";
import { format, getTime, parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { getTheme } from "../../slices/themeSlice";

const formatData = async (data) => {
  const tempData = await data.map((item) => {
    const inputDate = item.time;
    let formattedDate;
    formattedDate = format(inputDate, "yyyy-MM-dd");
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

const formatVolumn = async (data) => {
  const tempData = await data.map((item) => {
    const inputDate = item.time;
    let formattedDate;
    formattedDate = format(inputDate, "yyyy-MM-dd");
    return {
      value: item.volume,
      time: formattedDate,
    };
  });
  return tempData;
};

const formatSignal = async (data) => {
  const result = [];

  // Duyệt qua từng đối tượng trong mảng ban đầu
  data.forEach((obj) => {
    // Tạo đối tượng mới với knTime và ticker

    let knTimeTickerObject = {
      time: format(obj.knTime, "yyyy-MM-dd"),
      position: "belowBar",
      color: "#2196F3",
      shape: "arrowUp",
      text: `Buy ${obj.buyPrice}`,
    };

    // Tạo đối tượng mới với sellTime và ticker
    if (obj.sellTime !== null) {
      let sellTimeTickerObject = {
        time: format(obj.sellTime, "yyyy-MM-dd"),
        position: "aboveBar",
        color: "#e91e63",
        shape: "arrowDown",
        text: `Sell ${obj.sellPrice}`,
      };
      result.push(sellTimeTickerObject);
    }

    // Thêm vào mảng tương ứng
    result.push(knTimeTickerObject);
  });
  result.sort((a, b) => {
    return a.time.localeCompare(b.time);
  });
  return result;
};

export const SignalChart = (props) => {
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
  const [signalData, setSignalData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get(endpoints.OHLC_DAILY + `?ticker=${ticker}`)
        .then(async (res) => {
          const tempData = await formatData(res.data.data);
          setData(tempData);
          const volumeData = await formatVolumn(res.data.data);
          setVolumeData(volumeData);
        })
        .catch((e) => console.log(e));
    };

    const fetchSignal = async () => {
      await api
        .get(endpoints.BUYSELL + `?ticker=${ticker}`)
        .then(async (res) => {
          const newData = await formatSignal(res.data.data);
          setSignalData(newData);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchSignal();

    fetchData();
  }, [ticker]);

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
    // chart.timeScale().fitContent();
    const volumeSeries = chart.addHistogramSeries({
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "", // set as an overlay by setting a blank priceScaleId
      color: "#686D76",
    });
    volumeSeries.priceScale().applyOptions({
      // set the positioning of the volume series
      scaleMargins: {
        top: 0.7, // highest point of the series will be 70% away from the top
        bottom: 0,
      },
    });

    const barSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    barSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.1,
        bottom: 0.3,
      },
    });

    barSeries.setData(data);
    barSeries.setMarkers(signalData);
    volumeSeries.setData(volumeData);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data, signalData, volumeData]);

  return (
    <div className=" h-full">
      <div ref={chartContainerRef} className=" h-full" />
    </div>
  );
};
