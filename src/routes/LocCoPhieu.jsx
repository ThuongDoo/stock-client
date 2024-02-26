import React, { useState } from "react";
import ThemDieuKien from "../components/ThemDieuKien";
import DieuKienLoc from "../components/DieuKienLoc";

function LocCoPhieu() {
  const [filterArray, setFilterArray] = useState([]);
  const handleThemDieuKien = (values) => {
    console.log(values);
    setFilterArray(values);
  };
  const themDieuKienFilter = {
    tabs: [
      { name: "PTCB", displayName: "PTCB" },
      { name: "PTKT", displayName: "PTKT" },
    ],
    filters: {
      PTCB: [
        {
          name: "EPS",
          displayName: "EPS",
          option: 1,
        },
        {
          name: "P_E",
          displayName: "P/E",
          option: 1,
        },
        {
          name: "bookValuePerShare",
          displayName: "BookValuePerShare",
          option: 1,
        },
        {
          name: "doanhThuTrenMoiCP",
          displayName: "Doanh thu trên mỗi cổ phiếu",
          option: 1,
        },
        {
          name: "P_S",
          displayName: "P/S",
          option: 1,
        },
        {
          name: "OCF",
          displayName: "OCF",
          option: 1,
        },
        {
          name: "P_CF",
          displayName: "P/CF",
          option: 1,
        },
        {
          name: "thuNhapCoTuc",
          displayName: "Tỷ lệ thu nhập từ cổ tức mỗi năm trên cổ phiếu",
          option: 1,
        },
        {
          name: "tongCPLuuHanh",
          displayName: "Tổng số CP lưu hành",
          option: 1,
        },
        {
          name: "free_float",
          displayName: "Tỷ lệ Free - Float",
          option: 1,
        },
        {
          name: "beta",
          displayName: "Hệ số Beta",
          option: 1,
        },
        {
          name: "BLNGop",
          displayName: "Biên lợi nhuận gộp",
          option: 1,
        },
        {
          name: "BLNHoatDong",
          displayName: "Biên lợi nhuận hoạt động",
          option: 1,
        },
        {
          name: "LNGTrenCP",
          displayName: "Lợi nhuận gộp trên mỗi cổ phiếu",
          option: 1,
        },
        {
          name: "ROA",
          displayName: "ROA",
          option: 1,
        },
        {
          name: "ROE",
          displayName: "ROE",
          option: 1,
        },
        {
          name: "doanhThuTheoQuy",
          displayName: "Tăng trưởng doanh thu theo quý",
          option: 1,
        },
        {
          name: "loiNhuanTheoQuy",
          displayName: "Tăng trưởng lợi nhuận theo quý",
          option: 1,
        },
      ],
      PTKT: [
        {
          name: "SEPA Makniverni",
          displayName: "",
          option: 0,
        },
        {
          name: "EPS",
          displayName: "EPS",
          option: 0,
        },
      ],
    },
  };

  return (
    <div className=" flex flex-col h-full">
      <div className=" flex h-1/2">
        <div className=" flex-1 bg-blue-500">
          <ThemDieuKien
            onChange={handleThemDieuKien}
            data={themDieuKienFilter}
          />
        </div>
        <div className=" flex-1 bg-gray-500">
          <DieuKienLoc filters={filterArray} />
        </div>
      </div>
      <div className=" bg-yellow-500 h-1/2">hihi</div>
    </div>
  );
}

export default LocCoPhieu;
