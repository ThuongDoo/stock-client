import React from "react";
import { OhlcChart } from "./OhlcChart";

function StockChart({ ticker }) {
  return <OhlcChart ticker={ticker} />;
}

export default StockChart;
