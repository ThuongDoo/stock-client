import React, { useEffect, useState } from "react";
import SecurityDetail from "../../../../components/SecurityDetail";
import formatNumber from "../../../../utils/formatNumber";

function StockBD({ data, isAsc = 0, cols, onReload = () => {} }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedSecurity, setSelectedSecurity] = useState({});
  const [isReload, setIsReload] = useState(false);
  const getColorClass = (value) => {
    if (value >= 6.7) {
      return "bg-customeStock17";
    } else if (value >= 6 && value < 6.7) {
      return "bg-customeStock16";
    } else if (value >= 5 && value < 6) {
      return "bg-customeStock15";
    } else if (value >= 4 && value < 5) {
      return "bg-customeStock14";
    } else if (value >= 3 && value < 4) {
      return "bg-customeStock13";
    } else if (value >= 2 && value < 3) {
      return "bg-customeStock12";
    } else if (value >= 1 && value < 2) {
      return "bg-customeStock11";
    } else if (value > 0 && value < 1) {
      return "bg-customeStock10";
    } else if (value == 0) {
      return "bg-customeStock9";
    } else if (value > -1 && value < 0) {
      return "bg-customeStock8";
    } else if (value > -2 && value <= -1) {
      return "bg-customeStock7";
    } else if (value > -3 && value <= -2) {
      return "bg-customeStock6";
    } else if (value > -4 && value <= -3) {
      return "bg-customeStock5";
    } else if (value > -5 && value <= -4) {
      return "bg-customeStock4";
    } else if (value > -6 && value <= -5) {
      return "bg-customeStock3";
    } else if (value > -6.7 && value <= -6) {
      return "bg-customeStock2";
    } else if (value <= -6.7) {
      return "bg-customeStock1";
    }
  };
  if (isAsc === false) {
    data.sort((a, b) => a.RatioChange - b.RatioChange);
  } else {
    data.sort((a, b) => b.RatioChange - a.RatioChange);
  }

  const handleReload = async (value) => {
    setIsReload(!isReload);
  };

  useEffect(() => {
    onReload(true);
  }, [isReload]);

  return (
    <div className="  w-full h-full  ">
      {data.length > 0 ? (
        <div
          className={`  grid ${
            cols > 0
              ? "grid-cols-[col]"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          }  h-full overflow-y-scroll gap-2 auto-rows-min`}
        >
          {data?.map((stock, index) => (
            <div
              key={index}
              className={` cursor-pointer flex-col justify-between text-black h-fit  rounded-lg px-2 ${getColorClass(
                stock?.RatioChange
              )}`}
              onClick={() => {
                setSelectedSecurity(stock);
                setIsOpenModal(true);
              }}
            >
              <div className=" flex justify-between">
                <p className=" text-base md:text-lg ">{stock?.Symbol}</p>
                <p className=" text-base md:text-lg ">
                  {formatNumber(stock?.LastPrice / 1000, 2)}
                </p>
                <p className=" text-base md:text-lg ">{stock?.RatioChange}%</p>
              </div>
              <div className=" flex justify-between">
                <div className=" flex w-full justify-between">
                  <p className=" text-sm ">
                    KL: {formatNumber(stock?.TotalVol, 1)}
                  </p>

                  <p className=" text-sm ">
                    GT: {formatNumber(stock?.TotalVal, 1)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className=" text-center">Không tìm thấy dữ liệu</div>
      )}
      {isOpenModal && (
        <SecurityDetail
          symbol={selectedSecurity.Symbol}
          onClose={() => setIsOpenModal(false)}
          onReload={handleReload}
        />
      )}
    </div>
  );
}

export default StockBD;
