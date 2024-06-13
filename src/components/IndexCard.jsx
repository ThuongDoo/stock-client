import React from "react";
import formatNumber from "../utils/formatNumber";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SquareIcon from "@mui/icons-material/Square";

function IndexCard({ data }) {
  return (
    <div className=" flex flex-col  px-3 py-2 text-sm min-w-60 text-nowrap ">
      <div className=" flex items-start justify-between text-base">
        <h1 className=" font-semibold">{data.IndexName}</h1>
        <h1 className=" font-semibold">
          {formatNumber(data.IndexValue, 2, 10000000)}
        </h1>
      </div>
      <div className=" flex items-end justify-between gap-2">
        <h1>{formatNumber(data.AllValue)}</h1>
        <div
          className={`${
            data.IndexValue < data.PriorIndexValue
              ? "text-red-600"
              : data.IndexValue > data.PriorIndexValue
              ? "text-green-500"
              : "text-yellow-500"
          }`}
        >
          <span>{data.Change} </span>
          <span>{data.RatioChange}%</span>
        </div>
      </div>
      <div className=" flex  justify-between">
        <div className=" flex items-center">
          <ArrowDropUpIcon sx={{ color: "#86efac", fontSize: 20 }} />
          <span className=" text-green-300">{data.Advances}</span>
          <span className=" text-pink-500">({data.Ceilings})</span>
        </div>
        <div className=" flex items-center">
          <SquareIcon sx={{ color: "#fde047", fontSize: 10, margin: "5px" }} />
          <span className=" text-yellow-300">{data.NoChanges}</span>
        </div>
        <div className=" flex items-center">
          <ArrowDropDownIcon sx={{ color: "#dc2626", fontSize: 20 }} />
          <span className=" text-red-600">{data.Declines}</span>
          <span className=" text-cyan-300">({data.Floors})</span>
        </div>
      </div>
    </div>
  );
}

export default IndexCard;
