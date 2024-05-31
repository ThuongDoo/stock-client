import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getTheme } from "../../../slices/themeSlice";

export const RocChart = (props) => {
  const {
    data,
    colors: {
      backgroundColor = "white",
      lineColor = "#2962FF",
      textColor = "black",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    } = {},
  } = props;

  const chartContainerRef = useRef();
  const darkMode = useSelector(getTheme);

  // console.log(data[0].roc);
  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        crosshair: {
          // hide the horizontal crosshair line
          horzLine: {
            visible: false,
            labelVisible: false,
          },
          // hide the vertical crosshair label
          vertLine: {
            labelVisible: false,
          },
        },
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
      grid: {
        vertLines: { color: darkMode ? "#444" : "#D6DCDE" },
        horzLines: { color: darkMode ? "#444" : "#D6DCDE" },
      },
      timeScale: {
        timeVisible: true,
      },
      handleScroll: false,
      handleScale: false,
    });

    // chart.timeScale().fitContent();

    // const newSeries = chart.addAreaSeries({
    //   lineColor,
    //   topColor: areaTopColor,
    //   bottomColor: areaBottomColor,
    // });
    // newSeries.setData(data);

    const lineSeries = [];
    data.forEach((item, index) => {
      const color = item.color; // Lấy màu ngẫu nhiên cho mỗi dòng đồ thị
      const line = chart.addLineSeries({ color });
      line.setData(item.data);
      line.applyOptions({
        lineWidth: 2,
        priceLineVisible: false,
      });
      line.priceScale().applyOptions({
        scaleMargins: {
          top: 0.1, // leave some space for the legend
          bottom: 0.1,
        },
      });
      lineSeries.push(line); // Lưu trữ đối tượng dòng đồ thị vào mảng lineSeries
    });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <div className=" h-full" ref={chartContainerRef} />;
};
