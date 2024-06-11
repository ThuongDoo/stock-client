// MucGiaChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MucGiaChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Mua",
        data: data.map((item) => item.BidVol),
        backgroundColor: "#22c55e", // Màu xanh
        barThickness: 20,
      },
      {
        label: "Bán",
        data: data.map((item) => item.AskVol),
        backgroundColor: "#ef4444", // Màu đỏ
        borderRadius: 200,
        barThickness: 20,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      // title: {
      //   display: true,
      //   text: "Buy and Sell Chart",
      // },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "black", // Màu chữ của nhãn trục x
        },
        display: false,
      },
      y: {
        stacked: true,
        ticks: {
          color: "white", // Màu chữ của nhãn trục x
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default MucGiaChart;
