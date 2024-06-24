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
    labels: data.map((item) => item.price),
    datasets: [
      {
        label: "Mua",
        data: data.map((item) => item.bu),
        backgroundColor: "#22c55e", // Màu xanh22c55e
        barThickness: 10,
      },
      {
        label: "Bán",
        data: data.map((item) => item.sd),
        backgroundColor: "#ef4444", // Màu đỏ22c55e
        // borderRadius: 200,
        barThickness: 10,
      },
      {
        label: "Không xác định",
        data: data.map((item) => item.uk),
        backgroundColor: "grey", // Màu đỏ
        // borderRadius: 200,
        barThickness: 10,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        display: false,
      },
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
          color: "white", // Màu chữ của nhãn trục y
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default MucGiaChart;
