import React from "react";
import { OhlcChart } from "../../../../components/chart/OhlcChart";

function StockChart({ ticker }) {
  return <OhlcChart ticker={ticker} />;
}

export default StockChart;
