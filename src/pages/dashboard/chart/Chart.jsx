import React from "react";
import { TVChartContainer } from "../../../components/chart/TVChartContainer";
import ChartInfo from "./ChartInfo";

function Chart() {
  return (
    <div className=" flex ">
      <div className=" w-9/12">
        <TVChartContainer />
      </div>
      <div className=" w-3/12">
        <ChartInfo />
      </div>
    </div>
  );
}

export default Chart;
