import React from "react";
import { ChartComponent } from "./ChartComponent";

function StockChart({ ticker }) {
  return <ChartComponent ticker={ticker} />;
}

export default StockChart;
